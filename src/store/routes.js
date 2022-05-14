import { RouteService } from "@/services/RouteService";
import UpdateLoopManager from "@/UpdateLoopManager";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    routes: undefined,
    // selectedRoutes - массив потому что порядок важен.
    selectedRoutes: [],
    selectedRoutesData: {}
  },
  
  mutations: {
    SET_ROUTES (state, data) {
      state.routes = data;
    },
  
    ADD_SELECTED_ROUTE (state, data) {
      state.selectedRoutes.push(data);
    },
  
    UPDATE_SELECTED_ROUTE (state, { index, route }) {
      for (const [key, value] of Object.entries(route)) {
        Vue.set(state.selectedRoutes[index], key, value);
      }
    },
  
    REMOVE_SELECTED_ROUTE (state, index) {
      state.selectedRoutes.splice(index, 1);
    },
  
    UPDATE_SELECTED_ROUTE_DATA (state, { index, route }) {
      if (state.selectedRoutesData[index] == null) {
        Vue.set(state.selectedRoutesData, index, {});
      }
      
      for (const [key, value] of Object.entries(route)) {
        Vue.set(state.selectedRoutesData[index], key, value);
      }
    },
    
    REMOVE_SELECTED_ROUTE_DATA (state, index) {
      Vue.delete(state.selectedRoutesData, index);
    }
  },
  
  actions: {
    UPDATE_VEHICLES_LOOP ({ state, dispatch }) {
      const loop = new UpdateLoopManager();
      
      loop.create("vehicles", () => {
        for (const selectedRoute of state.selectedRoutes) {
          dispatch("GET_ROUTE_VEHICLES", selectedRoute.routeId);
        }
      }, 10000);
    },
    
    async GET_ROUTES ({ commit }) {
      const routes = await RouteService.getRoutesList();
  
      routes.forEach((route, index, routes) => {
        routes[index] = {
          get id () {
            return `${ route.type }-${ route.label }-${ route.route }`;
          },
          ...route
        };
      });
      
      commit("SET_ROUTES", routes);
    },
    
    async ADD_SELECTED_ROUTE ({ commit, dispatch }, routeId) {
      commit("ADD_SELECTED_ROUTE", {
        get routeId () {
          return routeId;
        },
  
        direction: "two-way"
      });
      
      await dispatch("GET_ROUTE_POINTS", routeId);
    },
    
    async UPDATE_SELECTED_ROUTE ({ state, commit, dispatch }, { routeId, route }) {
      const index = state.selectedRoutes.findIndex(route => route.routeId === routeId);
  
      if (index + 1) {
        commit("UPDATE_SELECTED_ROUTE", { index, route });
      }
      
      await dispatch("GET_ROUTE_POINTS", routeId);
    },
    
    REMOVE_SELECTED_ROUTE ({ state, commit }, routeId) {
      const index = state.selectedRoutes.findIndex(route => route.routeId === routeId);
      
      if (index + 1) {
        commit("REMOVE_SELECTED_ROUTE", index);
      }
  
      commit("REMOVE_SELECTED_ROUTE_DATA", routeId);
    },
    
    async GET_ROUTE_POINTS ({ commit, dispatch, getters }, routeId) {
      const { direction } = getters.getSelectedRouteById(routeId);
      const { type, route, label } = getters.getRouteById(routeId);
      
      const points = await RouteService.getActiveRoute({
        type,
        route,
        label,
        direction
      });
  
      commit("UPDATE_SELECTED_ROUTE_DATA", {
        index: routeId,
        route: {
          points
        }
      });
  
      await dispatch("GET_ROUTE_VEHICLES", routeId);
    },
  
    async GET_ROUTE_VEHICLES ({ commit, getters }, routeId) {
      const { direction } = getters.getSelectedRouteById(routeId);
      const { type, route, label } = getters.getRouteById(routeId);
    
      const vehicles = await RouteService.getActiveRouteVehicles({
        type,
        route,
        label,
        direction
      });
    
      commit("UPDATE_SELECTED_ROUTE_DATA", {
        index: routeId,
        route: {
          vehicles
        }
      });
    }
  },
  
  getters: {
    isRouteSelected: state => id => state.selectedRoutes.find(el => el.routeId === id),
    getRouteById: state => id => state.routes.find(el => el.id === id),
    getSelectedRouteById: state => id => state.selectedRoutes.find(el => el.routeId === id)
  }
};
