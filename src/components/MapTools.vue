<template>
    <div class="map-tools-view">
        <el-button-group>
            <el-button type="plain" @click="handleToolsClick" id="direct">行政区导航</el-button>
            <el-button type="plain" @click="handleToolsClick" id="layers">图层管理</el-button>
            <el-button type="plain" @click="handleToolsClick" id="distance">距离测量</el-button>
            <el-button type="plain" @click="handleToolsClick" id="area">面积测量</el-button>
            <el-button type="plain" @click="handleToolsClick" id="clear">清空</el-button>
        </el-button-group>
    </div>
</template>

<script>
export default {
    name: 'MapTools',
    components: {},
    methods: {
        handleToolsClick(e) {
            switch (e.currentTarget.id) {
                case 'direct':
                    break;
                case 'layers':
                    this.treeSwitch();
                    break;
                case 'distance':
                    break;
                case 'area':
                    break;
                case 'clear':
                    console.log(e.currentTarget.id);
                    break;
                default:
                    break;
            }
        },
        treeSwitch() {
            let stat = this.$store.getters._getDefaultTreeStat;
            this.$store.commit('_setDefaultTreeStat', !stat);
            console.log(this.$store.getters._getDefaultTreeStat);
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