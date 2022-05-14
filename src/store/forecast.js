import { ForecastService } from "@/services/ForecastService";
import UpdateLoopManager from "@/UpdateLoopManager";

export default {
  namespaced: true,
  state: {
    stationId: undefined,
    forecast: undefined
  },
  
  mutations: {
    UPDATE_STATION_ID (state, stationId) {
      state.stationId = stationId;
    },
    
    UPDATE_FORECAST (state, forecast) {
      state.forecast = forecast;
    }
  },
  
  actions: {
    UPDATE_FORECAST_LOOP ({ state, dispatch }) {
      const loop = new UpdateLoopManager();
    
      loop.create("forecast", () => {
        if (state.stationId) {
          dispatch("GET_FORECAST");
        }
      }, 10000);
    },
    
    SET_ACTIVE_STATION_ID ({ commit, dispatch }, id) {
      commit("UPDATE_STATION_ID", id);
      
      if (id) {
        dispatch("GET_FORECAST");
      }
    },
    
    async GET_FORECAST ({ state, commit }) {
      const forecast = await ForecastService.getStationForecast(state.stationId);
  
      forecast.forEach((route, index, forecast) => {
        forecast[index] = {
          get id () {
            return `${ route.type }-${ route.label }-${ route.route }`;
          },
          ...route
        };
      });
      
      commit("UPDATE_FORECAST", forecast);
    }
  },
  
  getters: {}
};
