<template>
    <div id="mapview">
        <div id="map-viewer"></div>
        <div id="basemap-toggle"></div>
        <div id="basemap-scalebar"></div>
        <div id="basemap-zoom"></div>
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
    mounted: function () {
        this._createMapView();
    },
    methods: {
        //创建地图显示控件
        async _createMapView() {
            const [Map, MapView, Basemap, TileLayer, BasemapToggle, ScaleBar, Zoom] = await loadModules(
                [
                    'esri/Map',
                    'esri/views/MapView',
                    'esri/Basemap',
                    'esri/layers/TileLayer',
                    'esri/widgets/BasemapToggle',
                    'esri/widgets/ScaleBar',
                    'esri/widgets/Zoom',
                ],
                options,
            );

            let basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer?f=jsapi',
                        title: 'Basemap',
                    }),
                ],
                title: 'basemap',
                id: 'basemap',
            });
            const map = new Map({
                basemap,
            });

            const mapview = new MapView({
                container: 'map-viewer',
                map: map,
                zoom: 10,
                center: [121.475941, 31.224072],
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
            mapview.ui.components = []; //清空自带地图控件

            this.$store.commit('_setDefaultView', mapview);
            console.log(mapview);
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
}
#basemap-zoom {
    position: absolute;
    bottom: 100px;
    right: 10px;
}
</style>
