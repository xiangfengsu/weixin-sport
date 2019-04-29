
import { queryUserInfo } from '../service/api';
const standardtable = {
  namespaced: true,
  name: 'home',
  state: {
    info:{}
  },
  mutations: {
    userInfo(state,{ payload}){
      Object.assign(state, payload);
    }
  },
  actions: {
    async getUserInfo({ commit }, { payload }) {
      const response = (await queryUserInfo(payload)) || {};
      const { code } = response;
      if (code === 100) {
        commit({
          type: 'userInfo',
          payload: {
            info:response
          },
        });
      }
    }
  },
};

export default standardtable;
