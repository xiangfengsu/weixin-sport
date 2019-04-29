import omit from "omit.js";
import { queryApplyList, delHandle, checkHandle, queryApplyItemInfo } from "../service/api";
const standardtable = {
  namespaced: true,
  name: "applyquery",
  state: {
    loading: false,
    results: [],
    updateItem: {}
  },
  mutations: {
    changeState(state, { payload }) {
      Object.assign(state, payload);
    }
  },
  actions: {
    async getApplyList({ commit }, { payload }) {
      commit({
        type: "changeState",
        payload: {
          loading: true
        }
      });
      const response = (await queryApplyList(payload)) || {};
      const { code, results } = response;
      if (code === 100) {
        commit({
          type: "changeState",
          payload: {
            results: results,
            loading: false
          }
        });
      }
    },
    async delApplyItem(
      {
        commit,
        state: { results = [] }
      },
      { payload }
    ) {
      const { subID, status, done, context } = payload;
      const params = omit(payload, ["done", "context"]);
      const response = (await delHandle(params)) || {};
      const { code } = response;
      if (code === 100) {
        const lists = results.filter(item => item.subID !== subID);
        commit({
          type: "changeState",
          payload: {
            results: lists
          }
        });
        context.$toast("删除成功");
        if (done) done();
      }
    },
    async getApplyItem({}, { payload }) {
      const { context, done } = payload;
      const params = omit(payload, ["context", "done"]);
      const response = (await queryApplyItemInfo(params)) || {};
      const { code, items = [] } = response;
      if (code === 100) {
        const info = {
          ...omit(response, ["code", "msg", "items"]),
          item: items.map(i => i.id)
        };
        if (done) done(info);
      } else {
        context.$toast("获取信息失败");
      }
    },
    async checkApplyItem(
      {
        commit,
        state: { results = [] }
      },
      { payload }
    ) {
      const { subID, done, context } = payload;
      const params = omit(payload, ["done", "context"]);
      const response = (await checkHandle(params)) || {};
      const { code } = response;
      if (code === 100) {
        const lists = results.filter(item => item.subID !== subID);
        commit({
          type: "changeState",
          payload: {
            results: lists
          }
        });
        context.$toast("操作成功");
        if (done) done();
      }
    }
  }
};

export default standardtable;
