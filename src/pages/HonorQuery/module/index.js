import { querySchools, queryGrades, queryClasses } from "../service/api";

const defaultList = [
  {
    ID: -1,
    name: "全部"
  }
];
const standardtable = {
  namespaced: true,
  name: "honorquery",
  state: {
    schoolsList: defaultList,
    gradesList: defaultList,
    classesList: defaultList,
    sLoading: false,
    gLoading: false,
    cLoading: false
  },
  mutations: {
    changeState(state, { payload }) {
      Object.assign(state, payload);
    }
  },
  actions: {
    async getSchoolsList({ commit }) {
      commit({
        type: "changeState",
        payload: {
          sLoading: true
        }
      });
      const response = (await querySchools()) || {};
      const { code, schools } = response;
      if (code === 100) {
        commit({
          type: "changeState",
          payload: {
            schoolsList: [...schools],
            gradesList:[...defaultList],
            classesList:[...defaultList],
            sLoading: false
          }
        });
      }
    },
    async getGradesList({ commit }, { payload }) {
      commit({
        type: "changeState",
        payload: {
          gLoading: true
        }
      });
      const response = (await queryGrades(payload)) || {};
      const { code, grades } = response;
      if (code === 100) {
        commit({
          type: "changeState",
          payload: {
            gradesList: [...grades],
            classesList:[...defaultList],
            gLoading: false
          }
        });
      }
    },
    async getClassesList({ commit }, { payload }) {
      commit({
        type: "changeState",
        payload: {
          cLoading: true
        }
      });
      const response = (await queryClasses(payload)) || {};
      const { code, classes } = response;
      if (code === 100) {
        commit({
          type: "changeState",
          payload: {
            classesList: [...classes],
            cLoading: false
          }
        });
      }
    }
  }
};

export default standardtable;
