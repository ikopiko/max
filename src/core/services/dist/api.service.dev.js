"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _axios = _interopRequireDefault(require("axios"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

var _jwt = _interopRequireDefault(require("@/core/services/jwt.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Service to call HTTP request via Axios
 */
var ApiService = {
  init: function init() {
    _vue["default"].use(_vueAxios["default"], _axios["default"]);

    _vue["default"].axios.defaults.baseURL = "https://max.ronnyspizza.ge/rest/web/index.php?r=";
  },

  /**
   * Set the default HTTP request headers
   */
  setHeader: function setHeader() {
    _vue["default"].axios.defaults.headers.common["Authorization"] = "Bearer ".concat(_jwt["default"].getToken());
  },
  query: function query(resource, params) {
    return _vue["default"].axios.get(resource, params)["catch"](function (error) {
      // console.log(error);
      throw new Error("[KT] ApiService ".concat(error));
    });
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  get: function get(resource) {
    var slug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    return _vue["default"].axios.get("".concat(resource, "/").concat(slug))["catch"](function (error) {
      // console.log(error);
      throw new Error("[KT] ApiService ".concat(error));
    });
  },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post: function post(resource, params) {
    return _vue["default"].axios.post("".concat(resource), params);
  },

  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  update: function update(resource, slug, params) {
    return _vue["default"].axios.put("".concat(resource, "/").concat(slug), params);
  },

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put: function put(resource, params) {
    return _vue["default"].axios.put("".concat(resource), params);
  },

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  "delete": function _delete(resource) {
    return _vue["default"].axios["delete"](resource)["catch"](function (error) {
      // console.log(error);
      throw new Error("[RWV] ApiService ".concat(error));
    });
  }
};
var _default = ApiService;
exports["default"] = _default;