import omit from "omit.js";
import { queryScoreTop, queryScorepgrTop } from "../service/api";

const standardtable = {
  namespaced: true,
  name: "honorresult",
  state: {
    loading: false,
    info: {
      title: "",
      ranks: []
    }
  },
  mutations: {
    changeState(state, { payload }) {
      Object.assign(state, payload);
    }
  },
  actions: {
    async getScoreTop({ commit }, { payload }) {
      commit({
        type: "changeState",
        payload: {
          loading: true
        }
      });
      const response = (await queryScoreTop(payload)) || {};
      const { code } = response;
      if (code === 100) {
        commit({
          type: "changeState",
          payload: {
            loading: false,
            info: omit(response, ["code", "msg"])
          }
        });
      }
    },
    async getScorepgrTop({ commit }, { payload }) {
      commit({
        type: "changeState",
        payload: {
          loading: true
        }
      });
      const response = (await queryScorepgrTop(payload)) || {};
      const { code } = response;
      if (code === 100) {
        commit({
          type: "changeState",
          payload: {
            loading: false,
            info: omit(response, ["code", "msg"])
          }
        });
      }
    }
  }
};

export default standardtable;
