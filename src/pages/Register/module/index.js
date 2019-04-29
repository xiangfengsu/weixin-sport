
import { Dialog } from "vant";
import Cookies from 'js-cookie';
import omit from "omit.js";
import router from "@/core/common/router";
import { registerHandle, updatePasswordHandle } from "../service/api";

const standardtable = {
  namespaced: true,
  name: "register",
  state: {},
  mutations: {},
  actions: {
    async registerIn({}, { payload }) {
      const params = omit(payload, ["confimPass"]);
      const { code } = (await registerHandle(params)) || {};
      if (code === 100) {
        Dialog.alert({
          message: "注册成功"
        }).then(() => {
          Cookies.remove('authCode');
          router.push({
            path: "/user/login"
          });
        });
      }
    },
    async updatePassword({}, { payload }) {
      const params = omit(payload, ["confimPass"]);
      const { code } = (await updatePasswordHandle(params)) || {};
      if (code === 100) {
        Dialog.alert({
          message: "密码修改成功"
        }).then(() => {
          Cookies.remove('authCode');
          router.push({
            path: "/user/login"
          });
        });
      }
    }
  }
};

export default standardtable;
