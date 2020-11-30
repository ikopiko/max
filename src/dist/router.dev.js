"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  routes: [{
    path: "/",
    redirect: "/dashboard",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/layout/Layout"));
      });
    },
    children: [{
      path: "/dashboard",
      name: "dashboard",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/Dashboard.vue"));
        });
      }
    }, {
      path: "/max",
      name: "max",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/Max.vue"));
        });
      }
    }, {
      path: "/singleorder",
      name: "singleorder",
      props: true,
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/SingleOrder.vue"));
        });
      }
    }, {
      path: "/driversingle",
      name: "driversingle",
      props: true,
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/Driversingle.vue"));
        });
      }
    }, {
      path: "/timetable",
      name: "timetable",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/Timetable.vue"));
        });
      }
    }, {
      path: "/driverdispatch",
      name: "driverdispatch",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/Driverdispatch.vue"));
        });
      }
    }, {
      path: "/driver",
      name: "driver",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/Driver.vue"));
        });
      }
    }, {
      path: "/banks",
      name: "banks",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/Banks.vue"));
        });
      }
    }, // {
    //   path: "/pos",
    //   name: "pos",
    //   component: () => import("@/view/pages/Pos.vue")
    // },
    // {
    //   path: "/pin",
    //   name: "pin",
    //   component: () => import("@/view/pages/Pin.vue")
    // },
    {
      path: "/loader",
      name: "loader",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/Loader.vue"));
        });
      }
    }, {
      path: "/order",
      name: "order",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/Order.vue"));
        });
      }
    }, {
      path: "/builder",
      name: "builder",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/Builder.vue"));
        });
      }
    }, {
      path: "/vue-bootstrap",
      name: "vue-bootstrap",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/VueBootstrap.vue"));
        });
      },
      children: [{
        path: "alert",
        name: "vue-bootstrap-alert",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Alert.vue"));
          });
        }
      }, {
        path: "badge",
        name: "vue-bootstrap-badge",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Badge.vue"));
          });
        }
      }, {
        path: "button",
        name: "vue-bootstrap-button",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Button.vue"));
          });
        }
      }, {
        path: "button-group",
        name: "vue-bootstrap-button-group",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/ButtonGroup.vue"));
          });
        }
      }, {
        path: "button-toolbar",
        name: "vue-bootstrap-button-toolbar",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/ButtonToolbar.vue"));
          });
        }
      }, {
        path: "card",
        name: "vue-bootstrap-card",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Card.vue"));
          });
        }
      }, {
        path: "carousel",
        name: "vue-bootstrap-carousel",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Carousel.vue"));
          });
        }
      }, {
        path: "collapse",
        name: "vue-bootstrap-collapse",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Collapse.vue"));
          });
        }
      }, {
        path: "dropdown",
        name: "vue-bootstrap-dropdown",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Dropdown.vue"));
          });
        }
      }, {
        path: "embed",
        name: "vue-bootstrap-embed",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Embed.vue"));
          });
        }
      }, {
        path: "form",
        name: "vue-bootstrap-form",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Form.vue"));
          });
        }
      }, {
        path: "form-checkbox",
        name: "vue-bootstrap-form-checkbox",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/FormCheckbox.vue"));
          });
        }
      }, {
        path: "form-file",
        name: "vue-bootstrap-form-file",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/FormFile.vue"));
          });
        }
      }, {
        path: "form-group",
        name: "vue-bootstrap-form-group",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/FormGroup.vue"));
          });
        }
      }, {
        path: "form-input",
        name: "vue-bootstrap-form-input",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/FormInput.vue"));
          });
        }
      }, {
        path: "form-radio",
        name: "vue-bootstrap-form-radio",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/FormRadio.vue"));
          });
        }
      }, {
        path: "form-select",
        name: "vue-bootstrap-form-select",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/FormSelect.vue"));
          });
        }
      }, {
        path: "form-textarea",
        name: "vue-bootstrap-form-textarea",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/FormTextarea.vue"));
          });
        }
      }, {
        path: "image",
        name: "vue-bootstrap-image",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Image.vue"));
          });
        }
      }, {
        path: "input-group",
        name: "vue-bootstrap-input-group",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/InputGroup.vue"));
          });
        }
      }, {
        path: "jumbotron",
        name: "vue-bootstrap-jumbotron",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Jumbotron.vue"));
          });
        }
      }, {
        path: "layout-grid-system",
        name: "vue-bootstrap-layout-grid-system",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/LayoutGridSystem.vue"));
          });
        }
      }, {
        path: "link",
        name: "vue-bootstrap-link",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Link.vue"));
          });
        }
      }, {
        path: "list-group",
        name: "vue-bootstrap-list-group",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/ListGroup.vue"));
          });
        }
      }, {
        path: "media",
        name: "vue-bootstrap-media",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Media.vue"));
          });
        }
      }, {
        path: "modal",
        name: "vue-bootstrap-modal",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Modal.vue"));
          });
        }
      }, {
        path: "nav",
        name: "vue-bootstrap-nav",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Nav.vue"));
          });
        }
      }, {
        path: "navbar",
        name: "vue-bootstrap-navbar",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Navbar.vue"));
          });
        }
      }, {
        path: "pagination",
        name: "vue-bootstrap-pagination",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Pagination.vue"));
          });
        }
      }, {
        path: "pagination-nav",
        name: "vue-bootstrap-pagination-nav",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/PaginationNav.vue"));
          });
        }
      }, {
        path: "popover",
        name: "vue-bootstrap-popover",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Popover.vue"));
          });
        }
      }, {
        path: "progress",
        name: "vue-bootstrap-progress",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Progress.vue"));
          });
        }
      }, {
        path: "spinner",
        name: "vue-bootstrap-spinner",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Spinner.vue"));
          });
        }
      }, {
        path: "table",
        name: "vue-bootstrap-table",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Table.vue"));
          });
        }
      }, {
        path: "tabs",
        name: "vue-bootstrap-tabs",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Tabs.vue"));
          });
        }
      }, {
        path: "toasts",
        name: "vue-bootstrap-toasts",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Toasts.vue"));
          });
        }
      }, {
        path: "tooltip",
        name: "vue-bootstrap-tooltip",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vue-bootstrap/Tooltip.vue"));
          });
        }
      }]
    }, {
      path: "/vuetify",
      name: "vuetify",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/vuetify/Vuetify.vue"));
        });
      },
      children: [{
        path: "alerts",
        name: "vuetify-alerts",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/Alerts.vue"));
          });
        }
      }, {
        path: "avatars",
        name: "vuetify-avatars",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/Avatars.vue"));
          });
        }
      }, {
        path: "badges",
        name: "vuetify-badges",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/Badges.vue"));
          });
        }
      }, {
        path: "buttons",
        name: "vuetify-buttons",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/Buttons.vue"));
          });
        }
      }, {
        path: "calendars",
        name: "vuetify-calendars",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/Calendars.vue"));
          });
        }
      }, {
        path: "cards",
        name: "vuetify-cards",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/Cards.vue"));
          });
        }
      }, {
        path: "chips",
        name: "vuetify-chips",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/Chips.vue"));
          });
        }
      }, {
        path: "dialog",
        name: "vuetify-dialog",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/Dialog.vue"));
          });
        }
      }, {
        path: "autocompletes",
        name: "vuetify-autocompletes",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/forms/Autocompletes.vue"));
          });
        }
      }, {
        path: "file-inputs",
        name: "vuetify-file-inputs",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/forms/FileInputs.vue"));
          });
        }
      }, {
        path: "forms",
        name: "vuetify-forms",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/forms/Forms.vue"));
          });
        }
      }, {
        path: "selection-controls",
        name: "vuetify-selection-controls",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/forms/SelectionControls.vue"));
          });
        }
      }, {
        path: "selects",
        name: "vuetify-selects",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/forms/Selects.vue"));
          });
        }
      }, {
        path: "textareas",
        name: "vuetify-textareas",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/forms/Textareas.vue"));
          });
        }
      }, {
        path: "text-fields",
        name: "vuetify-text-fields",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/forms/TextFields.vue"));
          });
        }
      }, {
        path: "simple-tables",
        name: "vuetify-simple-tables",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/tables/SimpleTables.vue"));
          });
        }
      }, {
        path: "data-tables",
        name: "vuetify-data-tables",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/tables/DataTables.vue"));
          });
        }
      }, {
        path: "tabs",
        name: "vuetify-tabs",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/Tabs.vue"));
          });
        }
      }, {
        path: "timelines",
        name: "vuetify-timelines",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/Timelines.vue"));
          });
        }
      }, {
        path: "tooltips",
        name: "vuetify-tooltips",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/Tooltips.vue"));
          });
        }
      }, {
        path: "treeview",
        name: "vuetify-treeview",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/vuetify/Treeview.vue"));
          });
        }
      }]
    }, {
      path: "/wizard",
      name: "wizard",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/wizard/Wizard.vue"));
        });
      },
      children: [{
        path: "wizard-1",
        name: "wizard-1",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/wizard/Wizard-1.vue"));
          });
        }
      }, {
        path: "wizard-2",
        name: "wizard-2",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/wizard/Wizard-2.vue"));
          });
        }
      }, {
        path: "wizard-3",
        name: "wizard-3",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/wizard/Wizard-3.vue"));
          });
        }
      }, {
        path: "wizard-4",
        name: "wizard-4",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/wizard/Wizard-4.vue"));
          });
        }
      }]
    }, {
      path: "/plugins",
      name: "plugins",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/plugins/Plugins.vue"));
        });
      },
      children: [{
        path: "cropper",
        name: "cropper",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("@/view/pages/plugins/Cropper.vue"));
          });
        }
      }]
    }]
  }, {
    path: "/tabs",
    name: "tabs",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/pages/Tabs.vue"));
      });
    }
  }, {
    path: "/test",
    name: "test",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/pages/Test.vue"));
      });
    }
  }, {
    path: "/modal",
    name: "modal",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/pages/Modal.vue"));
      });
    }
  }, {
    path: "/pos",
    name: "pos",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/pages/Pos.vue"));
      });
    }
  }, {
    path: "/error",
    name: "error",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/pages/error/Error.vue"));
      });
    },
    children: [{
      path: "error-1",
      name: "error-1",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/error/Error-1.vue"));
        });
      }
    }, {
      path: "error-2",
      name: "error-2",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/error/Error-2.vue"));
        });
      }
    }, {
      path: "error-3",
      name: "error-3",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/error/Error-3.vue"));
        });
      }
    }, {
      path: "error-4",
      name: "error-4",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/error/Error-4.vue"));
        });
      }
    }, {
      path: "error-5",
      name: "error-5",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/error/Error-5.vue"));
        });
      }
    }, {
      path: "error-6",
      name: "error-6",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/error/Error-6.vue"));
        });
      }
    }]
  }, {
    path: "/",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/pages/auth/Auth"));
      });
    },
    children: [{
      name: "login",
      path: "/login",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/auth/Login"));
        });
      }
    }, {
      name: "pin",
      path: "/pin",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/auth/Pin"));
        });
      }
    }, {
      name: "register",
      path: "/register",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/view/pages/auth/Register"));
        });
      }
    }]
  }, {
    path: "*",
    redirect: "/404"
  }, {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/pages/error/Error-1.vue"));
      });
    }
  }]
}); // router.beforeEach((to, from, next) => {
//   console.log('---', this.$store.state);
//   next();
// });

var _default = router;
exports["default"] = _default;