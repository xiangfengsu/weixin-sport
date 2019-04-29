<template>
  <div class="login">
    <img src="@/assets/logo.png"
         class="logo"
         alt="logo">
    <div class="formBox">
      <van-cell-group :border="false">
        <van-field v-model="loginName"
                   placeholder="用户名"
                   left-icon="contact" />

      </van-cell-group>
      <van-cell-group>
        <van-field v-model="password"
                   type="password"
                   placeholder="登录密码"
                   left-icon="bag-o" />

      </van-cell-group>
      <p class="tipTools t-r">
        <router-link :to="{path:'/user/register',query:{type:'update'}}">
          修改密码
        </router-link>

      </p>
      <van-button round
                  type="primary"
                  size="large"
                  :loading="loading"
                  @click="$_handleSubmit">登录</van-button>
      <p class="tipTools t-c">
        <router-link :to="{path:'/user/register',query:{type:'create'}}">
          注册账号
        </router-link>

      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      loginName: "",
      password: ""
    };
  },
  computed:{
    loading(){
      return this.$store.state.login.loading
    }
  },
  methods: {
    $_handleSubmit() {
      if (this.$_verifyHandle()) {
        console.log('#');
        this.$store.dispatch({
          type: "login/loginIn",
          payload:{
            loginName:this.loginName,
            password:this.password
          }
        });
      }
    },
    $_verifyHandle() {
      if (this.loginName === "") {
        this.$toast("用户名不能为空!");
        return false;
      }
      if (this.password === "") {
        this.$toast("密码不能为空!");
        return false;
      }else{
         return true;
      }
    }
  }
};
</script>
<style lang="scss">
.login {
  padding: 20px 20px;
  .logo {
    width: 134px;
    height: 103px;
    display: block;
    margin: 0 auto;
  }
}
.formBox {
  padding: 40px 0;
  .tipTools {
    font-size: 14px;
    color: #1abc9c;
    padding: 12px 0;
  }
}
</style>
