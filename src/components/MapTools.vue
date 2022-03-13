<template>
    <div class="map-tools-view">
        <el-button-group>
            <el-button type="plain" @click="handleToolsClick" id="direct">行政区导航</el-button>
            <el-button type="plain" @click="handleToolsClick" id="layers">图层管理</el-button>
            <el-button type="plain" @click="handleToolsClick" id="distance">距离测量</el-button>
            <el-button type="plain" @click="handleToolsClick" id="space">空间查询</el-button>
            <el-button type="plain" @click="handleToolsClick" id="area">面积测量</el-button>
            <el-button type="plain" @click="handleToolsClick" id="clear">清空</el-button>
        </el-button-group>
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
    name: 'MapTools',
    components: {},

    methods: {
        handleToolsClick(e) {
            switch (e.currentTarget.id) {
                case 'direct':
                    this.navSwitch();
                    break;
                case 'layers':
                    this.treeSwitch();
                    break;
                case 'distance':
                    break;
                case 'area':
                    break;
                case 'space':
                    this.spaceQuery();
                    break;
                case 'clear':
                    console.log(e.currentTarget.id);
                    break;
                default:
                    break;
            }
        },
        async spaceQuery() {
            const _self = this;
            const view = _self.$store.getters._getDefaultView;
            //1、绘制面状区域
            const [GraphicsLayer, SketchViewModel, Graphic] = await loadModules(
                ['esri/layers/GraphicsLayer', 'esri/widgets/Sketch/SketchViewModel', 'esri/Graphic'],
                options,
            );
            const resLayer = view.map.findLayerById('polygonGraphicLayer');
            if (resLayer) {
                view.map.remove(resLayer);
            }
            const spaceLayer = new GraphicsLayer({
                id: 'polygonGraphicLayer',
                elevationInfo: {
                    mode: 'on-the-ground',
                },
            });
            view.map.add(spaceLayer);

            var svm = new SketchViewModel({
                updateOnGraphicClick: false,
                view: view,
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
            svm.create('polygon');
            svm.on('create-complete', function (event) {
                const graphic = new Graphic({
                    geometry: event.geometry,
                    symbol: svm.graphic.symbol,
                });
                spaceLayer.add(graphic);
            });
        },
        treeSwitch() {
            let stat = this.$store.getters._getDefaultTreeStat;
            this.$store.commit('_setDefaultTreeStat', !stat);
        },
        navSwitch() {
            let stat = this.$store.getters._getDefaultNavStat;
            this.$store.commit('_setDefaultNavStat', !stat);
        },
    },
};
</script>

<style>
.map-tools-view {
    position: absolute;
    right: 10px;
    top: 10px;
}
</style>