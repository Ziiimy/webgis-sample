<template>
    <div id="app">
        <el-container class="app-pannel">
            <el-header class="sys-header">WebGIS平台</el-header>
            <el-container class="app-contentpannel">
                <el-aside class="app-aside" width="120px">
                    <el-menu class="app-menu-vertical" mode="vertical" @select="HandleMenuSelect">
                        <el-menu-item index="1">
                            <i class="el-icon-location"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">地图</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-copy-document"></i>
                            <span slot="title">地图对比</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main class="mapviewer">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
    methods: {
        HandleMenuSelect(index) {
            //if (index == 1) this.$router.push('/');
            //else if (index == 2) this.$router.push('/map');
            switch (index) {
                case '1':
                    this.$router.push('/');
                    break;
                case '2':
                    this.$router.push('/map');
                    break;
                case '3':
                    this.$router.push('/mapcompare');
                    break;
                default:
                    break;
            }
        },
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
    color: #fff;
}
.mapviewer {
    padding: 5px !important;
}
.app-menu-vertical {
    width: auto;
    height: 100%;
}
</style>
