import { Dialog } from "vant";
import Cookies from "js-cookie";
import omit from 'omit.js';
import router from "@/core/common/router";
import { declareHandle, getPartnerHandle, queryPartnerHandle } from "../service/api";
const standardtable = {
  namespaced: true,
  name: "apply",
  state: {
    info: {

    },
    partnerName:''
  },
  mutations: {
    partnerInfoMu(state,{ payload}){
      Object.assign(state, payload);
    }
  },
  actions: {
    async applyIn({ commit }, { payload }) {
      const response = (await declareHandle(payload)) || {};
      const { code } = response;
      if (code === 100) {
        Dialog.alert({
          message: "申报成功"
        }).then(() => {
          router.push({
            path: "/"
          });
        });
      }
    },
    async getPartner({ commit }, { payload }) {
      const response = (await getPartnerHandle(payload)) || {};
      const { code } = response;
      if (code === 100) {
        const partnerInfo = omit(response,['code','msg','name']);
        commit({
          type: 'partnerInfoMu',
          payload:{
            info:partnerInfo,
            partnerName:response.name
          }
        })
      }
    },
    async queryPartner({ commit }, { payload }) {
      const response = (await queryPartnerHandle(payload)) || {};
      const { code } = response;
      if (code === 100) {
        const partnerInfo = omit(response,['code','msg','name']);
        commit({
          type: 'partnerInfoMu',
          payload:{
            info:partnerInfo,

          }
        })
      }
    }
  }
};

export default standardtable;
