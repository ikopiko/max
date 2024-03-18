/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue")
        },
        {
          path: "/max",
          name: "max",
          component: () => import("@/view/pages/Max.vue")
        },
        {
          path: "/singleorder",
          name: "singleorder",
          props: true,
          component: () => import("@/view/pages/SingleOrder.vue")
        },
        {
          path: "/driversingle",
          name: "driversingle",
          props: true,
          component: () => import("@/view/pages/Driversingle.vue")
        },
        {
          path: "/checkout",
          name: "checkout",
          props: true,
          component: () => import("@/view/pages/Checkout.vue")
        },
        {
          path: "/timetable",
          name: "timetable",
          component: () => import("@/view/pages/Timetable.vue")
        },
        {
          path: "/driverdispatch",
          name: "driverdispatch",
          component: () => import("@/view/pages/Driverdispatch.vue")
        },
        // {
        //   path: "/driver",
        //   name: "driver",
        //   component: () => import("@/view/pages/Driver.vue")
        // },
        {
          path: "/banks",
          name: "banks",
          component: () => import("@/view/pages/Banks.vue")
        },
        {
          path: "/loader",
          name: "loader",
          component: () => import("@/view/pages/Loader.vue")
        },
        {
          path: "/order",
          name: "order",
          component: () => import("@/view/pages/Order.vue")
        },
        {
          path: "/orders",
          name: "orders",
          component: () => import("@/view/pages/Ordersnew.vue")
        },
        {
          path: "/builder",
          name: "builder",
          component: () => import("@/view/pages/Builder.vue")
        },
        {
          path: "/wizard",
          name: "wizard",
          component: () => import("@/view/pages/wizard/Wizard.vue"),
          children: [
            {
              path: "wizard-1",
              name: "wizard-1",
              component: () => import("@/view/pages/wizard/Wizard-1.vue")
            },
            {
              path: "wizard-2",
              name: "wizard-2",
              component: () => import("@/view/pages/wizard/Wizard-2.vue")
            },
            {
              path: "wizard-3",
              name: "wizard-3",
              component: () => import("@/view/pages/wizard/Wizard-3.vue")
            },
            {
              path: "wizard-4",
              name: "wizard-4",
              component: () => import("@/view/pages/wizard/Wizard-4.vue")
            }
          ]
        },
        {
          path: "/plugins",
          name: "plugins",
          component: () => import("@/view/pages/plugins/Plugins.vue"),
          children: [
            {
              path: "cropper",
              name: "cropper",
              component: () => import("@/view/pages/plugins/Cropper.vue")
            }
          ]
        }
      ]
    },
    {
      path: "/tabs",
      name: "tabs",
      component: () => import("@/view/pages/Tabs.vue")
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/view/pages/Test.vue")
    },
    {
      path: "/modal",
      name: "modal",
      component: () => import("@/view/pages/Modal.vue")
    },
    {
      path: "/pos",
      name: "pos",
      component: () => import("@/view/pages/Pos.vue")
    },
    {
      path: "/driver",
      name: "driver",
      component: () => import("@/view/pages/Driver.vue")
    },
    {
      path: "/error",
      name: "error",
      component: () => import("@/view/pages/error/Error.vue"),
      children: [
        {
          path: "error-1",
          name: "error-1",
          component: () => import("@/view/pages/error/Error-1.vue")
        },
        {
          path: "error-2",
          name: "error-2",
          component: () => import("@/view/pages/error/Error-2.vue")
        },
        {
          path: "error-3",
          name: "error-3",
          component: () => import("@/view/pages/error/Error-3.vue")
        },
        {
          path: "error-4",
          name: "error-4",
          component: () => import("@/view/pages/error/Error-4.vue")
        },
        {
          path: "error-5",
          name: "error-5",
          component: () => import("@/view/pages/error/Error-5.vue")
        },
        {
          path: "error-6",
          name: "error-6",
          component: () => import("@/view/pages/error/Error-6.vue")
        }
      ]
    },
    {
      path: "/",
      component: () => import("@/view/pages/auth/Auth"),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import("@/view/pages/auth/Login")
        },
        {
          name: "pin",
          path: "/pin",
          component: () => import("@/view/pages/auth/Pin")
        },
        {
          name: "register",
          path: "/register",
          component: () => import("@/view/pages/auth/Register")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue")
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   console.log('---', this.$store.state);
//   next();
// });

export default router;