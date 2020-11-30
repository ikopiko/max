"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SET_ERROR = exports.SET_AUTH = exports.PURGE_AUTH = exports.UPDATE_USER = exports.REGISTER = exports.LOGOUT = exports.LOGIN = exports.VERIFY_AUTH = void 0;

var _api = _interopRequireDefault(require("@/core/services/api.service"));

var _jwt = _interopRequireDefault(require("@/core/services/jwt.service"));

var _actions, _mutations;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// action types
var VERIFY_AUTH = "verifyAuth";
exports.VERIFY_AUTH = VERIFY_AUTH;
var LOGIN = "login";
exports.LOGIN = LOGIN;
var LOGOUT = "logout";
exports.LOGOUT = LOGOUT;
var REGISTER = "register";
exports.REGISTER = REGISTER;
var UPDATE_USER = "updateUser"; // mutation types

exports.UPDATE_USER = UPDATE_USER;
var PURGE_AUTH = "logOut";
exports.PURGE_AUTH = PURGE_AUTH;
var SET_AUTH = "setUser";
exports.SET_AUTH = SET_AUTH;
var SET_ERROR = "setError";
exports.SET_ERROR = SET_ERROR;
var state = {
  errors: null,
  user: {},
  isAuthenticated: !!_jwt["default"].getToken()
};
var getters = {
  currentUser: function currentUser(state) {
    return state.user.data;
  },
  isAuthenticated: function isAuthenticated(state) {
    return state.isAuthenticated;
  }
};
var actions = (_actions = {}, _defineProperty(_actions, LOGIN, function (context, credentials) {
  return new Promise(function (resolve) {
    _api["default"].post("auth", credentials).then(function (_ref) {
      var data = _ref.data;
      console.log('data: ', data);
      context.commit(SET_AUTH, data);
      resolve(data);
    })["catch"](function (_ref2) {
      var response = _ref2.response;
      context.commit(SET_ERROR, response.data.errors);
    });
  });
}), _defineProperty(_actions, LOGOUT, function (context) {
  localStorage.removeItem("loggedUser");
  context.commit(PURGE_AUTH);
}), _defineProperty(_actions, REGISTER, function (context, credentials) {
  return new Promise(function (resolve, reject) {
    _api["default"].post("users", {
      user: credentials
    }).then(function (_ref3) {
      var data = _ref3.data;
      context.commit(SET_AUTH, data);
      resolve(data);
    })["catch"](function (_ref4) {
      var response = _ref4.response;
      context.commit(SET_ERROR, response.data.errors);
      reject(response);
    });
  });
}), _defineProperty(_actions, UPDATE_USER, function (context, payload) {
  var email = payload.email,
      username = payload.username,
      password = payload.password,
      image = payload.image,
      bio = payload.bio;
  var user = {
    email: email,
    username: username,
    bio: bio,
    image: image
  };

  if (password) {
    user.password = password;
  }

  return _api["default"].put("user", user).then(function (_ref5) {
    var data = _ref5.data;
    context.commit(SET_AUTH, data);
    return data;
  });
}), _actions);
var mutations = (_mutations = {}, _defineProperty(_mutations, SET_ERROR, function (state, error) {
  state.errors = error;
}), _defineProperty(_mutations, SET_AUTH, function (state, user) {
  state.isAuthenticated = true;
  state.user = user;
  state.errors = {};

  _jwt["default"].saveToken(state.user.token);
}), _defineProperty(_mutations, PURGE_AUTH, function (state) {
  state.isAuthenticated = false;
  state.user = {};
  state.errors = {};

  _jwt["default"].destroyToken();
}), _mutations);
var _default = {
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
};
exports["default"] = _default;