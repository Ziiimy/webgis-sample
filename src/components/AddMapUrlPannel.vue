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
</style>