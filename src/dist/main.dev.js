"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("@/core/services/store"));

var _api = _interopRequireDefault(require("@/core/services/api.service"));

var _auth = require("@/core/services/store/auth.module");

var _config = require("@/core/services/store/config.module");

require("popper.js");

require("tooltip.js");

var _perfectScrollbar = _interopRequireDefault(require("perfect-scrollbar"));

var _clipboard = _interopRequireDefault(require("clipboard"));

var _vueI18n = _interopRequireDefault(require("@/core/plugins/vue-i18n"));

var _vuetify = _interopRequireDefault(require("@/core/plugins/vuetify"));

require("@/core/plugins/portal-vue");

require("@/core/plugins/bootstrap-vue");

require("@/core/plugins/perfect-scrollbar");

require("@/core/plugins/highlight-js");

require("@/core/plugins/inline-svg");

require("@/core/plugins/apexcharts");

require("@/core/plugins/metronic");

require("@mdi/font/css/materialdesignicons.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import MockService from "@/core/mock/mock.service";
_vue["default"].config.productionTip = false; // Global 3rd party plugins

window.PerfectScrollbar = _perfectScrollbar["default"];
window.ClipboardJS = _clipboard["default"]; // Vue 3rd party plugins

// API service init
_api["default"].init(); // Remove this to disable mock API
//MockService.init();


_router["default"].beforeEach(function (to, from, next) {
  // Ensure we checked auth before each page load.
  Promise.all([_store["default"].dispatch(_auth.VERIFY_AUTH)]).then(next); // reset config to initial state

  _store["default"].dispatch(_config.RESET_LAYOUT_CONFIG); // Scroll page to top on every route change


  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 100);
});

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  i18n: _vueI18n["default"],
  vuetify: _vuetify["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");