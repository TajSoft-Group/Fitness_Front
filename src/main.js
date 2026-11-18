import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { API_URL } from "./config";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
// import BootstrapVue3 from "bootstrap-vue-3";

import "@/assets/css/styles.scss";

const app = createApp(App);
app.config.globalProperties.$api = API_URL; // for templates: :src="$api + '/' + img"
// app.use(BootstrapVue3);

app.use(router);

app.mount("#app");
