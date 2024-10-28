import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import ShowProducts from "../views/ShowProducts.vue";
import Page404 from "../Page404.vue";
const routes: Array<RouteRecordRaw> = [
  { path: "/custom-online-shop/", name: "products", component: ShowProducts },
  { path: "/custom-online-shop/404", name: "404", component: Page404 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
