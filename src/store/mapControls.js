import Vue from "vue";

const MIN_ZOOM = 10;
const MAX_ZOOM = 16;

export default {
  namespaced: true,
  state: {
    jams: false,
    zoom: 13,
    rotation: 0,
    center: [0, 0],
    activeType: undefined,
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
    
    types () {
      return [
        "search",
        "bus",
        "trolleybus",
        "tram",
        "taxiBus"
      ];
    },
  
    // Создаем геттер что-бы обезопасить нас от случайного изменения activeType
    getActiveType (state) {
      return state.activeType;
    }
  }
};
