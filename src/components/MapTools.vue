<template>
    <div class="map-tools-view">
        <el-button-group>
            <el-button type="plain">行政区导航</el-button>
            <el-button type="plain">距离测量</el-button>
            <el-button type="plain">面积测量</el-button>
            <el-button type="plain">清空</el-button>
        </el-button-group>
    </div>
</template>

<script>
export default {
    name: 'MapTools',
    components: {},
    methods: {},
};
</script>

<style>
.map-tools-view {
    position: absolute;
    right: 10px;
    top: 10px;
}
</style>