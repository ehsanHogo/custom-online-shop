import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/styles/essential.css";
import { createPinia } from "pinia";
import "material-design-icons-iconfont/dist/material-design-icons.min.css";

import router from "./route/router";
const pinia = createPinia();
createApp(App).use(router).use(createVuestic()).use(pinia).mount("#app");
