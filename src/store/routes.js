import Vue from "vue";

export default {
  namespaced: true,
  state: {},
  
  mutations: {
    UPDATE_ROUTES (state, data) {
      for (const [key, value] of Object.entries(data)) {
        Vue.set(state, key, value);
      }
    }
  },
  
  actions: {
    UPDATE_ROUTES ({ commit }, data) {
      commit("UPDATE_ROUTES", data);
    }
  },
  
  getters: {}
};
