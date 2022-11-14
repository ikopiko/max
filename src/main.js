/* eslint-disable */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/core/services/store";
import ApiService from "@/core/services/api.service";
import firebase from "@/core/plugins/firebase";
// import { rtdbPlugin } from 'vuefire'
//import MockService from "@/core/mock/mock.service";
import { VERIFY_AUTH } from "@/core/services/store/auth.module";
import { RESET_LAYOUT_CONFIG } from "@/core/services/store/config.module";

import {rtdbPlugin as Vuefire} from 'vuefire'

Vue.use(Vuefire);

Vue.config.productionTip = false;

// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;
import ClipboardJS from "clipboard";
window.ClipboardJS = ClipboardJS;

// Vue 3rd party plugins
import i18n from "@/core/plugins/vue-i18n";
import vuetify from "@/core/plugins/vuetify";
import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";

// API service init
ApiService.init();

// Remove this to disable mock API
//MockService.init();

// Global URL Variable

// Vue.prototype.$hostname = "http://192.168.1.124/ronny/rest/web/index.php?r=v1/";  // LOCAL

// Vue.prototype.$hostname = "http://109.172.176.98:8082/ronny/rest/web/index.php?r=v1/";  // DIGOMI OUT

// Vue.prototype.$hostname = "http://178.134.12.106:8082/ronny/rest/web/index.php?r=v1/";  // SABURTALO OUT

// Vue.prototype.$hostname = "http://94.43.92.102:8082/ronny/rest/web/index.php?r=v1/";  // VAKE OUT

// Vue.prototype.$hostname = "http://178.134.47.222:8082/ronny/rest/web/index.php?r=v1/";  // GLDANI OUT

// Vue.prototype.$hostname = "http://test.ronnys.info/rest/web/index.php?r=v1/";  // TEST

Vue.prototype.$hostname = "http://new.ronnys.info/rest/web/index.php?r=v1/";  // POS MERGE



// Vue.prototype.$authHostName = "http://192.168.1.124/ronny/rest/web/index.php?r=auth";  // LOCAL

// Vue.prototype.$authHostName = "http://109.172.176.98:8082/ronny/rest/web/index.php?r=auth";  // DIGOMI OUT

// Vue.prototype.$authHostName = "http://178.134.12.106:8082/ronny/rest/web/index.php?r=auth";  // SABURTALO OUT

// Vue.prototype.$authHostName = "http://94.43.92.102:8082/ronny/rest/web/index.php?r=auth";  // VAKE OUT

// Vue.prototype.$authHostName = "http://178.134.47.222:8082/ronny/rest/web/index.php?r=auth";  // GLDANI OUT

// Vue.prototype.$authHostName = "http://test.ronnys.info/rest/web/index.php?r=auth";  // TEST

Vue.prototype.$authHostName = "http://new.ronnys.info/rest/web/index.php?r=auth";  // POS MERGE

// Physical Servers

Vue.prototype.$localServer = "http://192.168.11.250/ronny/rest/web/index.php?r=v1/";  // DIGOMI 192.168.11.250

Vue.prototype.$localServerAuth = "http://192.168.11.250/ronny/rest/web/index.php?r=auth";  // DIGOMI 192.168.11.250

// Vue.prototype.$localServer = "http://192.168.12.250/ronny/rest/web/index.php?r=v1/";  // GLDANI 192.168.12.250  

// Vue.prototype.$localServerAuth = "http://192.168.12.250/ronny/rest/web/index.php?r=auth";  // GLDANI 192.168.12.250  

// Vue.prototype.$localServer = "http://192.168.13.250/ronny/rest/web/index.php?r=v1/";  // SABURTALO 192.168.13.250

// Vue.prototype.$localServerAuth = "http://192.168.13.250/ronny/rest/web/index.php?r=auth";  // SABURTALO 192.168.13.250

// Vue.prototype.$localServer = "http://192.168.14.250/ronny/rest/web/index.php?r=v1/";  // VAKE  192.168.14.250

// Vue.prototype.$localServerAuth = "http://192.168.14.250/ronny/rest/web/index.php?r=auth";  // VAKE  192.168.14.250

// Change It to API.SERVICE.JS ALSO

router.beforeEach((to, from, next) => {
  // Ensure we checked auth before each page load.
  Promise.all([store.dispatch(VERIFY_AUTH)]).then(next);

  // reset config to initial state
  store.dispatch(RESET_LAYOUT_CONFIG);

  // Scroll page to top on every route change
  setTimeout(() => { 
    window.scrollTo(0, 0);
  }, 100);
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  firebase,
  render: h => h(App)
}).$mount("#app");
