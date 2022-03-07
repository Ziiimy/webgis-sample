<template>
    <div class="map-navigator" v-show="this.$store.getters._getDefaultNavStat">
        <div class="map-navigator-header"><span>行政区导航</span></div>
        <div class="map-navigator-select">
            省份：
            <el-select v-model="provinceValue" placeholder="请选择" clearable v-on:change="handleSelectChange">
                <el-option v-for="item in provinceOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="map-navigator-pannel">
            <tbody>
                <tr v-for="item in cityOptions" :key="item.label">
                    <td style="min-width: 50px">
                        <span class="city-item" :value="item.value" @click="handleCityClick(item.value)">
                            {{ item.label }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
let graphic = '';
export default {
    name: 'MapNav',
    components: {},
    methods: {
        //获取行政区划 省份数据
        async getProvinceData() {
            const _self = this;
            const [WFSLayer] = await loadModules(['esri/layers/WFSLayer']);
            const wfsLayer = new WFSLayer({
                url: 'http://localhost:8088/geoserver/geodata/ows?service=WFS&version=2.0.0&request=GetFeature',
                name: 'sheng_Project',
            });
            this.$store.commit('_setProvincewfslayer', wfsLayer);
            console.log(wfsLayer);
            //const template = wfsLayer1.createPopupTemplate(); // 创建点击弹出控件框架
            //wfsLayer1.popupTemplate = template;
            const query = wfsLayer.createQuery();
            query.returnGeometry = false;
            query.outFields = ['*'];
            query.where = '1=1';
            //Promise then 链式调用
            wfsLayer.queryFeatures(query).then((results) => {
                console.log(results);
                // do something with the query results
                let currentData = [];
                if (results.features.length > 0) {
                    results.features.map((item) => {
                        currentData.push({
                            value: item.attributes.adcode,
                            label: item.attributes.sheng,
                        });
                    });
                    _self.provinceOptions = currentData;
                } else {
                    _self.$message({
                        message: '暂时没有省份数据',
                        type: 'warning',
                    });
                }
            });
        },
        handleSelectChange(value) {
            if (value) this.getCityData(value);
            else this.cityOptions = [];
        },
        async getCityData(value) {
            const _self = this;
            const provinceValue = value.toString().substring(0, 2);
            const [WFSLayer] = await loadModules(['esri/layers/WFSLayer']);
            const wfsLayer = new WFSLayer({
                url: 'http://localhost:8088/geoserver/geodata/ows?service=WFS&version=2.0.0&request=GetFeature',
                name: 'CNshiA_Dissolve1_Identity',
            });
            this.$store.commit('_setCity1wfslayer', wfsLayer);
            console.log(wfsLayer);

            const query = wfsLayer.createQuery();
            query.returnGeometry = false;
            query.outFields = ['*'];
            query.where = "SHI like '" + provinceValue + "%'";
            //Promise then 链式调用
            wfsLayer.queryFeatures(query).then((results) => {
                // do something with the query results
                let currentCityData = [];
                if (results.features.length > 0) {
                    results.features.map((item) => {
                        currentCityData.push({
                            value: item.attributes.SHI,
                            label: item.attributes.CityNameC,
                        });
                    });
                    _self.cityOptions = currentCityData;
                    console.log(this.cityOptions);
                } else {
                    _self.$message({
                        message: '暂时没有省份数据',
                        type: 'warning',
                    });
                }
            });
        },
        async handleCityClick(value) {
            const provinceValue = value;
            const mapView = this.$store.getters._getDefaultView;
            const [Graphic] = await loadModules(['esri/Graphic']);
            const query = this.$store.getters._getCity1wfslayer.createQuery();
            query.returnGeometry = true;
            query.outFields = ['*'];
            query.where = "SHI like '" + provinceValue + "%'";
            //Promise then 链式调用
            this.$store.getters._getCity1wfslayer.queryFeatures(query).then((results) => {
                console.log(results);
                // do something with the query results
                const currentCitySelect = results.features[0];

                if (graphic) {
                    console.log(graphic);
                    mapView.graphics.remove(graphic);
                }
                const fillSymbol = {
                    type: 'simple-fill',
                    color: [188, 240, 234, 0.1],
                    outline: {
                        color: '#00FFFF',
                        width: 2,
                    },
                };
                graphic = new Graphic({
                    geometry: currentCitySelect.geometry,
                    symbol: fillSymbol,
                });
                mapView.graphics.add(graphic);
                mapView.goTo({
                    center: [
                        currentCitySelect.geometry.extent.center.longitude,
                        currentCitySelect.geometry.extent.center.latitude,
                    ],
                    zoom: 8,
                });
            });
        },
    },
    mounted: function () {
        this.getProvinceData();
    },
    data() {
        return {
            provinceOptions: [],
            provinceValue: '',
            cityOptions: [],
        };
    },
};
</script>

<style>
.map-navigator {
    position: absolute;
    left: 10px;
    top: 100px;
    width: 500px;
    height: 500px;
    background-color: #fff;
    border-radius: 2px;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.map-navigator-select {
    padding: 10px 0;
    width: 100%;
    height: 50px;
}
.map-navigator-header {
    border-bottom: 1px solid #f2f6fc;
    width: 300 px;
    height: 30px;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.city-item {
    font-size: 12px;
    color: #5f6477;
    font-weight: 600;
    cursor: pointer;
}
.map-navigator-pannel tr {
    display: block; /*将tr设置为块体元素*/
    margin-bottom: 15px; /*设置tr间距为15px*/
}
.map-navigator-pannel {
    width: 100%;
    height: 400px;
    overflow: auto;
    padding: 0 5px;
    box-sizing: border-box;
}
</style>