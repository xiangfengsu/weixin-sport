import Cookies from "js-cookie";
import router from "@/core/common/router";
import { checkLoginIn } from "../service/api";

const standardtable = {
  namespaced: true,
  name: "login",
  state: {
    code: -1,
    loading: false
  },
  mutations: {
    changeState(state, { payload }) {
      Object.assign(state, payload);
    }
  },
  actions: {
    async loginIn({ commit }, { payload }) {
      commit({
        type: "changeState",
        payload: {
          loading: true
        }
      });
      const { code } = (await checkLoginIn(payload)) || {};
      commit({
        type: "changeState",
        payload: {
          loading: false
        }
      });
      if (code === 100) {
        Cookies.set("authCode", "100");
        router.push({
          path: "/"
        });
      }
    }
  }
};

export default standardtable;
