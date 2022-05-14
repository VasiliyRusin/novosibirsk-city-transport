import Vue from "vue";

const MAP_CENTER = [54.99997630952814, 82.83210754394533];
const MIN_ZOOM = 10;
const MAX_ZOOM = 18;
const INITIAL_ZOOM = 11;
const MAX_BOUNDS = [
  [55.452556, 81.874842],
  [54.531149, 83.690061]
];

export default {
  namespaced: true,
  state: {
    zoom: INITIAL_ZOOM,
    center: MAP_CENTER,
    currentPosition: undefined
  },
  
  mutations: {
    UPDATE_UI (state, data) {
      for (const [key, value] of Object.entries(data)) {
        Vue.set(state, key, value);
      }
    }
  },
  
  actions: {
    UPDATE_UI ({ commit }, data) {
      commit("UPDATE_UI", data);
    }
  },
  
  getters: {
    // Используем геттеры как глобальные константы
    minZoom () {
      return MIN_ZOOM;
    },
    
    maxZoom () {
      return MAX_ZOOM;
    },
  
    maxBounds () {
      return MAX_BOUNDS;
    }
  }
};
