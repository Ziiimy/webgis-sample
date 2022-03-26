<template>
    <div>
        <el-dialog title="登录/注册" :visible.sync="dialogVisible" width="400px">
            <el-form :model="form" class="login-form" v-show="!registerSwitch">
                <el-form-item label="用户名" label-width="60px">
                    <el-input placeholder="请输入用户名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="60px">
                    <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form" class="register-form" v-show="registerSwitch">
                <el-form-item label="用户名" label-width="60px">
                    <el-input placeholder="请输入用户名" v-model="form.registerName"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="60px">
                    <el-input placeholder="请输入密码" v-model="form.registerPassword" show-password></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="60px">
                    <el-input placeholder="请输入电话号码" v-model="form.registerTel"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-switch class="login-switch" v-model="registerSwitch" active-text="注册" inactive-text="登录">
                </el-switch>
                <el-button type="primary" @click="handleLoginOrRegister">{{
                    registerSwitch ? '注 册' : '登 录'
                }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'; //引入axios
import qs from 'qs';
export default {
    name: 'LoginPannel',
    components: {},
    methods: {
        handleLoginPannel() {
            const _self = this;
            _self.dialogVisible = true;
        },
        handleRegisterPannel() {
            const _self = this;
            _self.registerSwitch = !_self.registerSwitch;
        },
        handleLoginOrRegister() {
            const _self = this;
            if (!_self.registerSwitch) {
                const id = _self.form.name;
                axios
                    .get('http://localhost:3001/user/get', {
                        params: {
                            id,
                        },
                    })
                    .then(function (response) {
                        if (response.data.status === 'success') {
                            const password = response.data.data[0].password;
                            if (password === _self.form.password) {
                                _self.$message({
                                    message: '登陆成功',
                                    type: 'success',
                                });
                                _self.form.name = response.data.data[0].name;
                                _self.dialogVisible = false;
                                _self.$emit('updateUsername', _self.form.name);
                            } else {
                                _self.$message.error('登录失败，用户名或密码错误');
                            }
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            } else {
                const _self = this;
                const id = _self.form.registerName;
                const password = _self.form.registerPassword;
                const tel = _self.form.registerTel;
                axios
                    .post(
                        'http://localhost:3001/user/register',
                        qs.stringify({
                            id,
                            password,
                            tel,
                        }),
                    )
                    .then(function (response) {
                        if (response.data.status === 'success') {
                            _self.$message({
                                message: '注册成功！',
                                type: 'success',
                            });
                            _self.registerSwitch = false;
                        } else {
                            _self.$message.error('注册失败！');
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        },
    },
    data() {
        return {
            dialogVisible: false,
            registerSwitch: false,
            form: {
                name: '',
                password: '',
                registerName: '',
                registerPassword: '',
                registerTel: '',
            },
        };
    },
};
</script>

<style scoped>
.dialog-footer {
    display: flex;
    justify-content: space-between;
}
.login-form {
    padding: 0 30px;
}
.login-form /deep/ .el-form-item label:after {
    content: '';
    display: inline-block;
    width: 100%;
}
.login-form /deep/ .el-form-item__label {
    text-align: justify;
    height: 50px;
}
.register-form {
    padding: 0 30px;
}
.register-form /deep/ .el-form-item label:after {
    content: '';
    display: inline-block;
    width: 100%;
}
.register-form /deep/ .el-form-item__label {
    text-align: justify;
    height: 50px;
}
</style>