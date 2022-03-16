<template>
    <div class="space-query" v-show="this.$store.getters._getSpaceQueryVisible">
        <el-collapse v-model="activeNames" @change="handleChange">
            <div>
                <div class="space-query-header">
                    <span>查询结果</span>
                    <i class="el-icon-minus" @click="show3 = !show3"></i>
                    <i class="el-icon-close" @click="closeQueryTable"></i>
                </div>
                <el-collapse-transition
                    ><div v-show="show3">
                        <el-table
                            :data="this.$store.getters._getSpaceQueryResult"
                            style="width: 550px"
                            max-height="300"
                            stripe
                        >
                            <el-table-column prop="key" label="序号" width="50" align="center"> </el-table-column>
                            <el-table-column prop="name" label="站名" width="90" align="center"> </el-table-column>
                            <el-table-column prop="address" label="地址" width="150" align="center"> </el-table-column>
                            <el-table-column prop="lon" label="经度" width="130" align="center"> </el-table-column>
                            <el-table-column prop="lat" label="纬度" width="130" align="center"> </el-table-column>
                        </el-table>
                    </div>
                </el-collapse-transition>
            </div>
        </el-collapse>
    </div>
</template>

<script>
export default {
    name: 'SpaceQuery',
    components: {},
    methods: {
        closeQueryTable() {
            const tableVisible = this.$store.getters._getSpaceQueryVisible;
            this.$store.commit('_setSpaceQueryVisible', !tableVisible);
        },
        handleChange(val) {
            console.log(val);
        },
    },
    data: () => ({
        show3: true,
    }),
};
</script>

<style>
.space-query {
    position: absolute;
    left: 10px;
    bottom: 10px;
}
.space-query-header {
    width: 550px;
    height: 35px;
    background-color: #fff;
    border-bottom: 1px solid #e4e7ed;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.space-query-header > span {
    line-height: 35px;
    font-size: 12px;
    font-weight: 600;
    color: #909399;
}
.el-icon-minus {
    position: absolute;
    right: 50px;
    line-height: 35px;
    cursor: pointer;
    color: #909399;
}
.el-icon-close {
    position: absolute;
    right: 10px;
    line-height: 35px;
    cursor: pointer;
    color: #909399;
}
</style>