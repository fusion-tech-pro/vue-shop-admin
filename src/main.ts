import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./core/router";

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

useUserStore()
  .initializeUser()
  .then(() => {
    app.use(Quasar, {
      plugins: { Notify },
    });

    // router runs right after it was used,
    // so we should run it after user initialized
    app.use(router);
    app.mount("#app");
  });
