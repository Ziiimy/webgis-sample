<template>
    <div id="app">
        <el-container class="app-pannel">
            <el-header class="sys-header">webgis平台</el-header>
            <el-container class="app-contentpannel">
                <el-aside width="200px">功能菜单</el-aside>
                <el-main>地图</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
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
</style>
