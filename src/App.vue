<template>
    <div id="app">
        <el-container class="app-pannel">
            <el-header class="sys-header">webgis平台</el-header>
            <el-container class="app-contentpannel">
                <el-aside class="app-aside" width="200px">菜单</el-aside>
                <el-main> <MapView /> </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import MapView from './components/MapViewer.vue';

export default {
    name: 'App',
    components: {
        MapView,
    },
};
</script>

<style>
html,
body,
#app {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0%;
}
.app-pannel,
.app-contentPannel {
    height: 100%;
}
.sys-header {
    background: #e6a23c;
    line-height: 60px;
    color: aliceblue;
    font-size: 30px;
}
.app-aside {
    background: #dcdfe6;
}
</style>
