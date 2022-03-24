<template>
    <div id="mapview">
        <div id="map-viewer"></div>
        <div id="basemap-toggle"></div>
        <div id="basemap-scalebar"></div>
        <div id="basemap-zoom"></div>
        <div id="search-widget"></div>
        <div id="basemap-compass"></div>
        <div class="view-change" @click="handleViewChange">
            <span>{{ viewModel }}</span>
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
    name: 'MapView',
    components: {},
    data() {
        return {
            viewModel: '切换3D',
        };
    },
    mounted: function () {
        this._createMapView();
    },
    methods: {
        //创建地图显示控件
        async _createMapView() {
            const [
                Map,
                MapView,
                Basemap,
                TileLayer,
                BasemapToggle,
                ScaleBar,
                Zoom,
                Search,
                Compass,
                SketchViewModel,
                Swipe,
            ] = await loadModules(
                [
                    'esri/Map',
                    'esri/views/MapView',
                    'esri/Basemap',
                    'esri/layers/TileLayer',
                    'esri/widgets/BasemapToggle',
                    'esri/widgets/ScaleBar',
                    'esri/widgets/Zoom',
                    'esri/widgets/Search',
                    'esri/widgets/Compass',
                    'esri/widgets/Sketch/SketchViewModel',
                    'esri/widgets/Swipe',
                ],
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
            console.log(basemap);
            const map = new Map({
                basemap,
            });

            const mapview = new MapView({
                container: 'map-viewer',
                map: map,
                zoom: 10,
                center: [121.475941, 31.224072],
                popup: {
                    defaultPopupTemplateEnabled: true, // popup will be enabled on the wfslayer
                },
            });
            let basemapToggle = new BasemapToggle({
                view: mapview,
                nextBasemap: 'hybrid',
                container: 'basemap-toggle',
            });
            mapview.ui.add(basemapToggle);
            let scalebar = new ScaleBar({
                view: mapview,
                container: 'basemap-scalebar',
                style: 'ruler',
                unit: 'metric',
            });

            mapview.ui.add(scalebar);
            let zoom = new Zoom({
                view: mapview,
                container: 'basemap-zoom',
            });
            mapview.ui.add(zoom);

            const searchWidget = new Search({
                view: mapview,
                container: 'search-widget',
            });
            mapview.ui.add(searchWidget);

            let compass = new Compass({
                view: mapview,
                container: 'basemap-compass',
            });
            mapview.ui.add(compass);
            var sketchViewModel = new SketchViewModel({});
            var swipe = new Swipe({});
            console.log(sketchViewModel);
            console.log(swipe);

            map.add(this.$store.getters._getProvincewfslayer);
            this.$store.getters._getProvincewfslayer.visible = false;
            mapview.ui.components = []; //清空自带地图控件
            this.$store.commit('_setDefaultView', mapview);
            this.$store.commit('_setDefaultMap', map);
        },
        async _createSceneView() {
            const [Map, SceneView, Basemap, TileLayer] = await loadModules(
                ['esri/Map', 'esri/views/SceneView', 'esri/Basemap', 'esri/layers/TileLayer'],
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

            const map = new Map({
                basemap,
            });

            const sceneView = new SceneView({
                container: 'mapview',
                map: map,
            });

            setTimeout(() => {
                sceneView.goTo({
                    zoom: 10,
                    center: [121.475941, 31.224072],
                });
            }, 3000);

            sceneView.ui.components = [];

            this.$store.commit('_setDefaultView', sceneView);
        },
        //二三维切换
        handleViewChange() {
            if (this.viewModel === '切换3D') {
                this._createSceneView();
                this.viewModel = '切换2D';
            } else {
                this._createMapView();
                this.viewModel = '切换3D';
            }
        },
    },
};
</script>

<style>
#mapview,
#map-viewer {
    position: relative;
    width: 100%;
    height: 100%;
}

#basemap-toggle {
    position: absolute;
    bottom: 10px;
    right: 10px;
}
#basemap-scalebar {
    position: absolute;
    bottom: 10px;
    left: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
#basemap-zoom {
    position: absolute;
    bottom: 100px;
    right: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
#search-widget {
    position: absolute;
    top: 10px;
    left: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
#basemap-compass {
    position: absolute;
    top: 70px;
    right: 10px;
}
.map-navigator {
    position: absolute;
    left: 10px;
    top: 100px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.view-change {
    position: absolute;
    width: 80px;
    height: 32px;
    right: 15px;
    top: 120px;
    background-color: #fff;
    cursor: pointer;
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.view-change span {
    line-height: 32px;
}
</style>
