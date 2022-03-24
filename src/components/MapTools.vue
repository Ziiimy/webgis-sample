<template>
    <div class="map-tools-view">
        <el-button-group>
            <el-button type="plain" @click="handleToolsClick" id="direct">行政区导航</el-button>
            <el-button type="plain" @click="handleToolsClick" id="layers">图层管理</el-button
            ><el-button type="plain" @click="handleToolsClick" id="space">空间查询</el-button>
            <el-button type="plain" @click="handleToolsClick" id="distance">距离测量</el-button>
            <el-button type="plain" @click="handleToolsClick" id="area">面积测量</el-button>
            <el-button type="plain" @click="handleToolsClick" id="swipe">卷帘分析</el-button>
            <el-button type="plain" @click="handleToolsClick" id="print">地图打印</el-button>
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
                    this.startMeasure('distance');
                    break;
                case 'area':
                    this.startMeasure('area');
                    break;
                case 'space':
                    this.spaceQuery();
                    break;
                case 'swipe':
                    this.$store.commit('_setSwipePannelVisible', true);
                    break;
                case 'print':
                    this.handlePrint();
                    break;
                case 'clear':
                    this.handleClear();
                    break;
                default:
                    break;
            }
        },
        async startMeasure(measureType) {
            const _self = this;
            const view = _self.$store.getters._getDefaultView;
            const resultLayer = view.map.findLayerById('measureGraphicLayer');
            if (resultLayer) view.map.remove(resultLayer);
            const [GraphicsLayer, SketchViewModel, GeometryService, LengthsParameters, AreasAndLengthsParameters] =
                await loadModules(
                    [
                        'esri/layers/GraphicsLayer',
                        'esri/widgets/Sketch/SketchViewModel',
                        'esri/tasks/GeometryService',
                        'esri/tasks/support/LengthsParameters',
                        'esri/tasks/support/AreasAndLengthsParameters',
                    ],
                    options,
                );
            const measureLayer = new GraphicsLayer({
                id: 'measureGraphicLayer',
                elevationInfo: {
                    mode: 'on-the-ground',
                },
            });
            view.map.add(measureLayer);
            if (measureType === 'distance') {
                const polylineSymbol = {
                    type: 'simple-line',
                    color: '#FF4500',
                    width: '2',
                    style: 'solid',
                };
                const sketchViewModel = new SketchViewModel({
                    updateOnGraphicClick: false,
                    view,
                    layer: measureLayer,
                    polylineSymbol,
                });
                sketchViewModel.create('polyline');
                sketchViewModel.on('create', function (event) {
                    if (event.state === 'complete') {
                        //获取线段长度
                        const geometryService = new GeometryService({
                            url: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer',
                        });

                        const lengthsParameters = new LengthsParameters();
                        lengthsParameters.polylines = event.graphic.geometry;
                        lengthsParameters.lengthUnit = 9001;
                        lengthsParameters.geodesic = true;

                        geometryService.lengths(lengthsParameters).then(function (result) {
                            console.log('长度', result);
                            _self.$notify.info({
                                title: '测量结果',
                                message: `距离：${result.lengths[0].toFixed(2)}米`,
                                duration: 0,
                                type: 'success',
                                offset: 220,
                            });
                        });
                    }
                });
            } else if (measureType == 'area') {
                const polygonSymbol = {
                    type: 'simple-fill',
                    color: [245, 108, 108, 0.2],
                    style: 'solid',
                    outline: {
                        color: '#d81e06',
                        width: 1,
                    },
                };
                const sketchViewModel = new SketchViewModel({
                    updateOnGraphicClick: false,
                    view,
                    layer: measureLayer,
                    polygonSymbol,
                });
                console.log(measureLayer);
                sketchViewModel.create('polygon');
                sketchViewModel.on('create', function (event) {
                    if (event.state === 'complete') {
                        console.log(event);
                        const geometryService = new GeometryService({
                            url: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer',
                        });

                        const areasAndLengthsParameters = new AreasAndLengthsParameters();
                        areasAndLengthsParameters.polygons = event.graphic.geometry;
                        areasAndLengthsParameters.areaUnit = 'square-kilometers';
                        areasAndLengthsParameters.lengthUnit = 'kilometers';

                        geometryService.areasAndLengths(areasAndLengthsParameters).then(function (result) {
                            console.log('面积和周长', result);
                            _self.$notify.info({
                                title: '测量结果',
                                message:
                                    `周长：${result.areas[0].toFixed(2)}米` +
                                    `\n` +
                                    `面积：${result.lengths[0].toFixed(2)}平方千米`,
                                duration: 0,
                                offset: 220,
                            });
                        });
                    }
                });
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

            var sketchViewModel = new SketchViewModel({
                updateOnGraphicClick: false,
                view: view,
                layer: spaceLayer,
                polygonSymbol: {
                    type: 'simple-fill',
                    color: [245, 108, 108, 0.2],
                    style: 'solid',
                    outline: {
                        color: '#d81e06',
                        width: 1,
                    },
                },
            });
            sketchViewModel.create('polygon');
            console.log(sketchViewModel);
            sketchViewModel.on('create', function (event) {
                //console.log(event);
                if (event.state === 'complete') {
                    const graphic = new Graphic({
                        geometry: event.graphic.geometry,
                        symbol: sketchViewModel.polygonSymbol,
                    });
                    console.log(graphic);
                    spaceLayer.add(graphic);
                    //2、执行空间查询
                    _self.startSpaceQuery(event.graphic);
                }
            });
        },
        startSpaceQuery(graphic) {
            const _self = this;
            const view = this.$store.getters._getDefaultView;

            const resLayer = view.map.findLayerById('layerid');
            if (!resLayer) {
                _self.$message({
                    message: '未添加矢量图层，无法进行空间查询',
                    type: 'warning',
                });
                return;
            }
            const query = resLayer.createQuery();
            query.geometry = graphic.geometry;
            resLayer
                .queryFeatures(query)
                .then(function (results) {
                    let currentData = [];
                    if (results.features.length > 0) {
                        //符号化渲染图层
                        _self.renderResultLayer(results.features);
                        //实例化表格数据
                        results.features.map((item, index) => {
                            currentData.push({
                                name: item.attributes.车站,
                                address: item.attributes.地址,
                                lon: item.attributes.WGS84经,
                                lat: item.attributes.WGS84纬,
                                key: index,
                            });
                        });
                    } else {
                        currentData.length = 0;
                    }
                    _self.$message({
                        message: `查询成功，共查到 ${results.features.length} 条数据`,
                        type: 'success',
                    });
                    _self.$store.commit('_setSpaceQueryResult', currentData);
                    _self.$store.commit('_setSpaceQueryVisible', true);
                })
                .catch(function (error) {
                    console.log(error);
                    _self.$message.error('空间查询失败，请联系管理员');
                });
        },
        async renderResultLayer(resFeatures) {
            const view = this.$store.getters._getDefaultView;
            const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer'], options);
            const resultLayer = view.map.findLayerById('initResultLayer');
            console.log(resultLayer);
            if (resultLayer) {
                view.map.remove(resultLayer);
                console.log(resultLayer);
            }
            const resData = this._translateLonLat(resFeatures);
            //实例化弹窗
            let template = {
                title: '{name}',
                content: [
                    {
                        type: 'fields',
                        fieldInfos: [
                            {
                                fieldName: 'name',
                                label: '站名',
                            },
                            {
                                fieldName: 'address',
                                label: '地址',
                            },
                        ],
                    },
                ],
            };
            const queryResultLayer = new FeatureLayer({
                source: resData,
                id: 'initResultLayer',
                objectIdField: 'ObjectID',
                renderer: {
                    type: 'simple', // autocasts as new SimpleRenderer()
                    symbol: {
                        type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                        url: `/icon/火车站.png`,
                        width: '32px',
                        height: '32px',
                    },
                },
                fields: [
                    {
                        name: 'ObjectID',
                        type: 'oid',
                    },
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'address',
                        type: 'string',
                    },
                ],
                popupTemplate: template,
            });
            view.map.add(queryResultLayer);
        },
        _translateLonLat(data) {
            console.log(data);
            const _self = this;
            if (data.length > 0) {
                _self.geoData = [];
                data.map((value, key) => {
                    _self.geoData.push({
                        geometry: {
                            type: 'point',
                            x: Number(value.geometry.longitude),
                            y: Number(value.geometry.latitude),
                        },
                        attributes: {
                            ObjectID: key + 1,
                            name: value.attributes.车站,
                            address: value.attributes.地址,
                        },
                    });
                });
            }
            console.log(_self.geoData);
            return _self.geoData;
        },
        async startSwipe() {
            const _self = this;
            const view = this.$store.getters._getDefaultView;
            console.log(view);
            const [Swipe] = await loadModules(['esri/widgets/Swipe'], options);
            const layer1 = view.map.findLayerById('swipelayer1');
            const layer2 = view.map.findLayerById('swipelayer2');
            console.log(layer1);
            console.log(layer2);
            if (layer1 && layer2) {
                _self.swipe = new Swipe({
                    view: view,
                    leadingLayers: [layer1],
                    trailingLayers: [layer2],
                    position: 50, // position set to middle of the view (50%)
                });
                view.ui.add(_self.swipe);
            } else {
                _self.$message({
                    message: '请添加至少两张业务图层',
                    type: 'warning',
                });
                return;
            }
        },
        async handlePrint() {
            const _self = this;
            const view = _self.$store.getters._getDefaultView;
            const [PrintTask, PrintTemplate, PrintParameters] = await loadModules(
                ['esri/tasks/PrintTask', 'esri/tasks/support/PrintTemplate', 'esri/tasks/support/PrintParameters'],
                options,
            );
            let printTask = new PrintTask({
                url: 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
            });

            let template = new PrintTemplate({
                format: 'pdf',
                exportOptions: {
                    dpi: 300,
                },
                layout: 'a4-landscape',
                layoutOptions: {
                    titleText: 'XXX地图',
                    authorText: 'zhoujm',
                },
                forceFeatureAttributes: true,
            });

            let params = new PrintParameters({
                view: view,
                template: template,
            });

            printTask.execute(params).then((printResult, printError) => {
                console.log(printResult, printError);
                if (printResult.url) window.open(printResult.url);
                if (printError) this.$message.error('地图打印失败，请重试');
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
        handleClear() {
            const view = this.$store.getters._getDefaultView;
            const resLayer1 = view.map.findLayerById('polygonGraphicLayer');
            const resLayer2 = view.map.findLayerById('layerid');
            const layer1 = view.map.findLayerById('swipelayer1');
            const layer2 = view.map.findLayerById('swipelayer2');
            const spaceQueryLayer = view.map.findLayerById('initResultLayer');
            if (resLayer1) view.map.remove(resLayer1);
            if (resLayer2) view.map.remove(resLayer2);
            if (layer1) view.map.remove(layer1);
            if (layer2) view.map.remove(layer2);
            if (spaceQueryLayer) view.map.remove(spaceQueryLayer);
            if (this.swipe) this.swipe.destroy();
            this.$store.commit('_setSpaceQueryVisible', false);
        },
    },
};
</script>

<style>
.map-tools-view {
    position: absolute;
    right: 10px;
    top: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.measure-results-table {
    position: absolute;
    width: 180px;
    height: 80px;
    right: 100px;
    top: 60px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 10px 10px;
    white-space: pre-wrap;
}
</style>