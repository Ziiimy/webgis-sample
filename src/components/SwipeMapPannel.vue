<template>
    <div class="swipe-pannel" v-show="this.$store.getters._getSwipePannelVisible" align="center">
        <div class="swipe-pannel-header">
            卷帘分析地图选择器
            <i class="el-icon-close" @click="closeSwipePannel"></i>
        </div>
        <div>
            <el-transfer
                v-model="value"
                :data="data"
                align="left"
                @change="handleChange"
                @left-check-change="handleSelected"
            ></el-transfer>
        </div>
        <el-button
            :disabled="this.$store.getters._getSwipeButtonSwitch"
            slot="right-footer"
            size="small"
            @click="startSwipe"
            >开始</el-button
        >
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
    name: 'SwipeMapPannel',
    components: {},
    methods: {
        closeSwipePannel() {
            this.$store.commit('_setSwipePannelVisible', false);
        },
        handleChange(value, direction) {
            if (direction === 'right') {
                console.log(value);
                let layerurl = '';
                value.forEach((item, index) => {
                    switch (item) {
                        case 1: {
                            layerurl = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer';
                            this.addSwipeLayer(layerurl, index);
                            break;
                        }
                        case 2: {
                            layerurl = 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer';
                            this.addSwipeLayer(layerurl, index);
                            break;
                        }
                        case 3: {
                            layerurl =
                                'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer';
                            this.addSwipeLayer(layerurl, index);
                            break;
                        }
                    }
                });
            }
        },
        handleSelected(value, data) {
            if (value.length > 2) {
                this.$store.commit('_setSwipeButtonSwitch', true);
                this.$message({
                    showClose: true,
                    message: '抱歉，添加项目不能超过2个',
                    type: 'warning',
                });
            } else {
                this.$store.commit('_setSwipeButtonSwitch', false);
            }
            console.log(data);
        },
        async addSwipeLayer(layerurl, index) {
            const [TileLayer] = await loadModules(['esri/layers/TileLayer'], options);
            const mapview = this.$store.getters._getDefaultView;
            if (index == 0) {
                const tilelayer = new TileLayer({
                    url: layerurl,
                    id: 'swipelayer1',
                });
                mapview.map.add(tilelayer);
                console.log(tilelayer);
            }
            if (index == 1) {
                const tilelayer = new TileLayer({
                    url: layerurl,
                    id: 'swipelayer2',
                });
                mapview.map.add(tilelayer);
                console.log(tilelayer);
            }
        },
        startSwipe() {
            this.$emit('startSwipe');
        },
    },
    data() {
        const generateData = () => {
            const data = [
                {
                    key: 1,
                    label: '暖色版',
                },
                {
                    key: 2,
                    label: '灰色版',
                },
                {
                    key: 3,
                    label: '蓝黑版',
                },
            ];
            console.log(data);
            return data;
        };
        return {
            data: generateData(),
            value: [],
            buttonswitch: true,
        };
    },
};
</script>

<style>
.swipe-pannel {
    position: absolute;
    width: 600px;
    height: 399px;
    left: 600px;
    top: 300px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.swipe-pannel-header {
    line-height: 35px;
    height: 35px;
    color: #606266;
    border-bottom: 1px solid #fff;
    padding: 0 5px;
}
.el-transfer {
    width: 600px;
    padding: 10px 9px;
}
</style>