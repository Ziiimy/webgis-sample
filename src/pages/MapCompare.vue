<template>
    <div class="mapview">
        <div class="maps">
            <div id="map-viewer1" class="map"></div>
            <div id="map-viewer2" class="map"></div>
        </div>
        <div class="url-pannel">
            <el-collapse>
                <div>
                    <div class="pannel-header">
                        <span>地图对比</span>
                        <i id="icon-minus" class="el-icon-minus" @click="show = !show"></i>
                    </div>
                    <el-collapse-transition>
                        <div class="input-pannel" v-show="show">
                            <div class="el-input">
                                <el-input placeholder="请输入图一链接" v-model="input1">
                                    <el-button slot="append" @click="_handleClick" id="1">获取地图</el-button>
                                </el-input>
                            </div>
                            <div class="el-input">
                                <el-input placeholder="请输入图二链接" v-model="input2">
                                    <el-button slot="append" @click="_handleClick" id="2">获取地图 </el-button>
                                </el-input>
                            </div>
                        </div>
                    </el-collapse-transition>
                </div>
            </el-collapse>
        </div>
    </div>
</template>
<script>
import { loadModules } from 'esri-loader';

const options = {
    //定义一个包含有JS API中js开发包和css样式文件的对象
    url: 'https://js.arcgis.com/4.22/init.js',
    css: 'https://js.arcgis.com/4.22/esri/themes/light/main.css',
};

export default {
    name: 'MapCompare',
    components: {},
    mounted: function () {
        this._createMapView();
    },
    methods: {
        _handleClick(e) {
            switch (e.currentTarget.id) {
                case '1': {
                    const mapview1 = this.$store.getters._getCompareMapview1;
                    this._handleMapUrl(mapview1, this.input1);
                    break;
                }

                case '2': {
                    const mapview2 = this.$store.getters._getCompareMapview2;
                    this._handleMapUrl(mapview2, this.input1);
                    break;
                }
            }
        },
        async _handleMapUrl(mapview, input) {
            if (input) {
                const [TileLayer] = await loadModules(['esri/layers/TileLayer']);
                const tilelayer = new TileLayer({
                    url: input,
                });
                mapview.map.add(tilelayer);
            } else {
                this.$message({
                    message: '地图链接不能为空，请重新输入',
                    type: 'warning',
                });
                return;
            }
        },
        //创建地图显示控件
        async _createMapView() {
            const [Map, MapView, Basemap, TileLayer, watchUtils] = await loadModules(
                ['esri/Map', 'esri/views/MapView', 'esri/Basemap', 'esri/layers/TileLayer', 'esri/core/watchUtils'],
                options,
            );

            let basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer',
                    }),
                ],
                title: 'basemap',
                id: 'basemap',
            });
            const map1 = new Map({
                basemap,
            });
            const map2 = new Map({
                basemap,
            });
            const mapview1 = new MapView({
                container: 'map-viewer1',
                map: map1,
                zoom: 10,
                center: [121.475941, 31.224072],
            });
            const mapview2 = new MapView({
                container: 'map-viewer2',
                map: map2,
                zoom: 10,
                center: [121.475941, 31.224072],
            });
            this.$store.commit('_setCompareMapview1', mapview1);
            this.$store.commit('_setCompareMapview2', mapview2);
            mapview1.ui.components = [];
            mapview2.ui.components = [];
            console.log(mapview1);
            watchUtils.watch(mapview1, 'center', function () {
                // Get the new center of the view only when view is stationary.
                if (mapview1.center) {
                    mapview2.goTo({
                        center: [mapview1.center.longitude, mapview1.center.latitude],
                        zoom: mapview1.zoom,
                    });
                }
            });
        },
    },
    data() {
        return {
            input1: '',
            input2: '',
            show: true,
        };
    },
};
</script>

<style>
.mapview {
    width: 100%;
    height: 100%;
}
.maps {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5px;
}
.map {
    width: calc(50% - 2.5px);
    height: 100%;
    box-sizing: border-box;
}
.el-input {
    width: 280px;
    height: 15px;
    padding: 0 2px;
}
.input-pannel {
    height: 50px;
    width: 570px;
}
.pannel-header {
    line-height: 35px;
    width: 80px;
    height: 35px;
    font-size: 12px;
    font-weight: 500;
    color: #909399;
    border-bottom: 1px solid #fff;
    padding: 0 5px;
}
.url-pannel {
    position: absolute;
    left: 130px;
    bottom: 10px;
    background-color: #fff;
}
#icon-minus {
    position: absolute;
    right: 10px;
    line-height: 35px;
    cursor: pointer;
    color: #909399;
}
</style>
