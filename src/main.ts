import { createApp } from "vue";
import { Quasar } from "quasar";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./core/router";
import VueMapboxTs from "vue-mapbox-ts";

import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import "quasar/src/css/index.sass";

import "@/assets/styles/index.scss";

import { configure as veeConfig } from "vee-validate";
import { useUserStore } from "./stores/user";

veeConfig({
  validateOnBlur: false,
  validateOnChange: false,
  validateOnInput: false,
  validateOnModelUpdate: false,
});

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(VueMapboxTs);

useUserStore()
  .initializeUser()
  .then(() => {
    app.use(Quasar, {});

    // router runs right after it was used,
    // so we should run it after user initialized
    app.use(router);
    app.mount("#app");
  });
