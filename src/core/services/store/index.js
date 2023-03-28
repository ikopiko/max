/* eslint-disable */

import Vue from "vue";
import Vuex from "vuex";

import "firebase/auth";
import db from "../../plugins/firebase";



import auth from "./auth.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";
import createPersistedState from "vuex-persistedstate";
//import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ordersList: [],
    localAPIURL: null,
    localAuthURL: null,
  },
  mutations: {
    'SET_LOCAL'(state, payload){
      state.localAPIURL = "http://" + payload + "/ronny/rest/web/index.php?r=v1/";
      state.localAuthURL = "http://" + payload + "/ronny/rest/web/index.php?r=auth";

      // state.localAPIURL = payload2;
      // state.localAuthURL = payload1;
  },
  },
  getters: {
    ordersGetter(state) {
      return state.ordersList;
    },
    getLocalApiURL(state) {
      return state.localAPIURL;
    },
    getLocalAuthURL(state) {
      return state.localAuthURL;
    },
  },
  actions: {
    async getOrders({ state }) {
      const dataBase = await db.collection("bla");
      const dbResults = await dataBase.get();
      // state.ordersList.push(dbResults);
      // state.ordersList.push(123);
      dbResults.forEach((doc) => {
        state.ordersList.push(doc.data());
      });
      // state.postLoaded = true;
    },
    getLocalIP({ commit }, payload){
      commit('SET_LOCAL', payload)
  },
  },
  modules: {
    auth,
    htmlClass,
    config,
    breadcrumbs
  },
  plugins: [createPersistedState()]
});
