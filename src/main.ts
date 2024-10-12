import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/styles/essential.css";
// import "vuestic-ui/styles/typography.css";

createApp(App).use(createVuestic()).mount("#app");
// createApp(App).mount("#app");
