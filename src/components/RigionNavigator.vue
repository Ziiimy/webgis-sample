<template>
    <div class="map-navigator" v-show="true">
        <el-select v-model="provinceValue" placeholder="请选择">
            <el-option v-for="item in provinceOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
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
            });
            this.$store.commit('_setDefaultwfslayer', wfsLayer);
            console.log(wfsLayer);
            const template = wfsLayer.createPopupTemplate(); // create the popupTemplate
            wfsLayer.popupTemplate = template; // set the popupTemplate on the layer
            /*const queryTask = new QueryTask({
                url: 'http://localhost:8088/geoserver/geodata/wfs?service=wfs&version=2.0.0&request=GetFeature&propertyName=sheng&typeName=geodata:sheng_Project&outputFormat=application%2Fjson',
            });*/
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
            /*queryTask.execute(query).then(function (results) {});*/
        },
    },
    mounted: function () {
        this.getProvinceData();
    },
    data() {
        return {
            provinceOptions: [],
            provinceValue: '',
        };
    },
};
</script>

<style>
.map-navigator {
    position: absolute;
    left: 10px;
    top: 100px;
}
</style>