<template>
    <div id="mapview">
        <div id="map-viewer"></div>
        <div id="basemap-toggle"></div>
        <div id="basemap-scalebar"></div>
        <div id="basemap-zoom"></div>
        <div id="search-widget"></div>
        <div id="basemap-compass"></div>
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
                GraphicsLayer,
                SketchViewModel,
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
                    'esri/layers/GraphicsLayer',
                    'esri/widgets/Sketch/SketchViewModel',
                ],
                options,
            );

            let basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer',
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
                popup: {
                    defaultPopupTemplateEnabled: true, // popup will be enabled on the wfslayer
                },
                spatialReference: {
                    wkid: 3857,
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
            const spaceLayer = new GraphicsLayer({
                id: 'polygonGraphicLayer',
                elevationInfo: {
                    mode: 'on-the-ground',
                },
            });
            mapview.map.add(spaceLayer);

            var svm = new SketchViewModel({
                updateOnGraphicClick: false,
                view: mapview,
                layer: spaceLayer,
                polygonSymbol: {
                    type: 'simple-fill',
                    color: 'rgba(216,30,6, 0.4)',
                    style: 'solid',
                    outline: {
                        color: '#d81e06',
                        width: 1,
                    },
                },
            });
            console.log(svm);
            mapview.ui.add(compass);
            map.add(this.$store.getters._getProvincewfslayer);
            this.$store.getters._getProvincewfslayer.visible = false;
            mapview.ui.components = []; //清空自带地图控件
            this.$store.commit('_setDefaultView', mapview);
            this.$store.commit('_setDefaultMap', map);
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
#search-widget {
    position: absolute;
    top: 10px;
    left: 10px;
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
}
</style>
