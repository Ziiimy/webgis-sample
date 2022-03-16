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

export default {
    name: 'MapTree',
    components: {},
    methods: {
        async handleNodeClick(data) {
            if (data.id > 4 && data.id < 11) {
                if (data.layerurl) {
                    const mapview = this.$store.getters._getDefaultView;
                    const layerid = mapview.map.findLayerById('layerid');
                    console.log(layerid);
                    if (layerid) {
                        mapview.map.remove(layerid);
                    }
                    const [TileLayer] = await loadModules(['esri/layers/TileLayer']);
                    const tilelayer = new TileLayer({
                        url: data.layerurl,
                        id: data.LayerId,
                    });
                    mapview.map.add(tilelayer);
                }
            }
            if (data.id > 10) {
                if (data.layerurl) {
                    const mapview = this.$store.getters._getDefaultView;
                    const layerid = mapview.map.findLayerById('layerid');
                    console.log(layerid);
                    if (layerid) {
                        mapview.map.remove(layerid);
                    }
                    const [WFSLayer] = await loadModules(['esri/layers/WFSLayer']);
                    const wfslayer = new WFSLayer({
                        url: data.layerurl,
                        id: data.LayerId,
                        name: data.name,
                    });
                    mapview.map.add(wfslayer);
                }
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
                                    id: 5,
                                    LayerId: 'layerid',
                                    label: '行政边界图',
                                    layerurl:
                                        'http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/administrative_division_boundaryandlabel/MapServer',
                                },
                                {
                                    id: 6,
                                    LayerId: 'layerid',
                                    label: '地铁线路图',
                                    layerurl:
                                        'http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/subway/MapServer',
                                },
                                {
                                    id: 7,
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
                                    id: 8,
                                    LayerId: 'layerid',
                                    label: '暖色版',
                                    layerurl: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer',
                                },
                                {
                                    id: 9,
                                    LayerId: 'layerid',
                                    label: '灰色版',
                                    layerurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
                                },
                                {
                                    id: 10,
                                    LayerId: 'layerid',
                                    label: '蓝黑版',
                                    layerurl:
                                        'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
                                },
                            ],
                        },
                        {
                            id: 4,
                            label: '矢量图层',
                            children: [
                                {
                                    id: 11,
                                    LayerId: 'layerid',
                                    label: '2016年高铁站分布',
                                    layerurl:
                                        'http://localhost:8088/geoserver/geodata/ows?service=WFS&version=2.0.0&request=GetFeature',
                                    name: 'station_Project2',
                                },
                                {
                                    id: 12,
                                    LayerId: 'layerid',
                                    label: '市级边界',
                                    layerurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
                                },
                                {
                                    id: 13,
                                    LayerId: 'layerid',
                                    label: '县区边界',
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