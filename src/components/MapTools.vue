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