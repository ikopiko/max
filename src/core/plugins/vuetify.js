import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "",
        secondary: "#e8ecfa",
        accent: "",
        error: "#fd397a",
        info: "#5578eb",
        success: "#0abb87",
        warning: "#ffb822"
      }
    }
  }
});
