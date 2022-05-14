import Vue from "vue";
import Vuex from "vuex";

import routes from "@/store/routes";
import forecast from "@/store/forecast";
import mapControls from "@/store/mapControls";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    routes,
    forecast,
    mapControls
  }
});
