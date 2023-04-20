<template>
  <div>
    <el-form
      ref="form"
      label-width="70px"
      :model="loginform"
      :rules="rules"
      class="login-container"
      inline
    >
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginform.username"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginform.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="enter"> 登录 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
  name: "Login",
  data() {
    return {
      loginform: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  methods: {
    enter() {
      this.$refs.form.validate((valid) => {
              if (valid) {
                  getMenu(this.loginform).then(({ data }) => {
                      console.log(data)
                      if (data.code === 20000) {
                          // token信息存入cookie用于不同页面间的通信
                          Cookie.set('token', data.data.token)

                          // 获取菜单的数据，存入store中
                          this.$store.commit('setMenu', data.data.menu)
                          this.$store.commit('addMenu', this.$router)
                          // 跳转到首页
                          this.$router.push('/home')
                      } else {
                          this.$message.error(data.data.message);
                      }
                  })
              }
          })
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  background-color: #fff;
  box-sizing: border-box;
  .login-title {
    text-align: center;
    margin: 0px auto 40px auto;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
  .el-button {
    margin-left: 105px;
    margin-top: 10px;
  }
}
</style>