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
  },
  mutations: {
  },
  getters: {
    ordersGetter(state) {
      return state.ordersList;
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
  },
  modules: {
    auth,
    htmlClass,
    config,
    breadcrumbs
  },
  plugins: [createPersistedState()]
});
