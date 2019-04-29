<template>
  <div class="box">
    <div class="formBox">
      <van-cell-group :border="false">
        <van-field v-model="formValue.studentID"
                   placeholder="请输入正确的19位学籍号"
                   left-icon="coupon-o" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="formValue.loginName"
                   placeholder="新建用户名"
                   left-icon="contact" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="formValue.password"
                   type="password"
                   placeholder="设置登录密码"
                   left-icon="bag-o" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="formValue.confimPass"
                   type="password"
                   placeholder="确认登录密码"
                   left-icon="bag-o" />
      </van-cell-group>

      <van-button round
                  type="primary"
                  class="btn-handle"
                  size="large"
                  @click="$_handleSubmit">{{btnText}}</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      btnText: "递交注册",
      formValue: {
        studentID: "",
        loginName: "",
        password: "",
        confimPass: ""
      }
    };
  },
  created(){
    const { type = "create" } = this.$route.query;
    this.btnText = type === 'create' ? '递交注册' : '修改密码'
  },
  methods: {
    $_handleSubmit() {
      if (this.$_verifyHandle()) {
        const { type = "create" } = this.$route.query;
        if (type === "create") {
          this.$store.dispatch({
            type: "register/registerIn",
            payload: this.formValue
          });
        } else {
          this.$store.dispatch({
            type: "register/updatePassword",
            payload: this.formValue
          });
        }
      }
    },
    $_verifyHandle() {
      console.log(this.formValue.studentID.length);
      if (this.formValue.studentID.length < 12) {
        this.$toast("账号至少输入12位");
        return false;
      }
      if (this.formValue.loginName.length < 6) {
        this.$toast("用户名至少输入6位!");
        return false;
      }
      if (this.formValue.password.length < 6) {
        this.$toast("密码至少输入6位!");
        return false;
      }
      if (this.formValue.password !== this.formValue.confimPass) {
        this.$toast("2次密码输入不一致!");
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style lang="scss">
.box {
  padding: 20px 20px;
}
.formBox {
  padding: 40px 0;
  .tipTools {
    font-size: 14px;
    color: #1abc9c;
    padding: 12px 0;
  }
  .btn-handle {
    margin: 30px 0;
  }
}
</style>
