"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _auth = _interopRequireDefault(require("./auth.module"));

var _htmlclass = _interopRequireDefault(require("./htmlclass.module"));

var _config = _interopRequireDefault(require("./config.module"));

var _breadcrumbs = _interopRequireDefault(require("./breadcrumbs.module"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import createPersistedState from 'vuex-persistedstate'
_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  modules: {
    auth: _auth["default"],
    htmlClass: _htmlclass["default"],
    config: _config["default"],
    breadcrumbs: _breadcrumbs["default"]
  } //plugins: [createPersistedState()]

});

exports["default"] = _default;