<template>
    <div class="map-tree" v-show="this.$store.getters._getDefaultTreeStat">
        <el-input placeholder="搜索" v-model="filterText"> </el-input>
        <el-tree
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            :filter-node-method="filterNode"
            ref="tree"
            @node-click="handleNodeClick"
            :default-expanded-keys="[1]"
            node-key="id"
        >
        </el-tree>
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
    name: 'MapTree',
    components: {},
    methods: {
        async handleNodeClick(data) {
            if (data.layerurl) {
                const mapview = this.$store.getters._getDefaultView;
                const layerid = mapview.map.findLayerById('layerid');
                if (layerid) {
                    mapview.map.remove(layerid);
                }
                const [TileLayer] = await loadModules(['esri/layers/TileLayer'], options);
                const tilelayer = new TileLayer({
                    url: data.layerurl,
                    id: data.LayerId,
                });
                mapview.map.add(tilelayer);
            }
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
    },
    data() {
        return {
            filterText: '',
            data: [
                {
                    id: 1,
                    label: '图层类型',
                    children: [
                        {
                            id: 2,
                            label: '业务图层',
                            children: [
                                {
                                    LayerId: 'layerid',
                                    label: '行政边界图',
                                    layerurl:
                                        'http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/administrative_division_boundaryandlabel/MapServer',
                                },
                                {
                                    LayerId: 'layerid',
                                    label: '地铁线路图',
                                    layerurl:
                                        'http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/subway/MapServer',
                                },
                                {
                                    LayerId: 'layerid',
                                    label: '水系分布图',
                                    layerurl:
                                        'http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer',
                                },
                            ],
                        },
                        {
                            id: 3,
                            label: '底图图层',
                            children: [
                                {
                                    LayerId: 'layerid',
                                    label: '彩色版',
                                    layerurl: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer',
                                },
                                {
                                    LayerId: 'layerid',
                                    label: '灰色版',
                                    layerurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
                                },
                                {
                                    LayerId: 'layerid',
                                    label: '蓝黑版',
                                    layerurl:
                                        'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
                                },
                            ],
                        },
                    ],
                },
            ],
            defaultProps: {
                children: 'children',
                label: 'label',
            },
        };
    },
};
</script>

<style>
.map-tree {
    position: absolute;
    right: 10px;
    top: 120px;
}
</style>