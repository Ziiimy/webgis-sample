<template>
    <div class="url-pannel">
        <el-input placeholder="请输入内容" v-model="input1">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </div>
</template>

<script>
export default {
    name: 'AddMapUrlPannel',
    components: {},
    methods: {},
    data() {
        return {
            input1: '',
        };
    },
};
</script>

<style>
.el-select .el-input {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
.url-pannel {
    position: relative;
    left: 130px;
    bottom: 10px;
}
</style>