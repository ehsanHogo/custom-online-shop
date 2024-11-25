import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import ProductListLayout from "../layouts/ProductListLayout.vue";
import Page404 from "../Page404.vue";
import CartLayout from "../layouts/CartLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/custom-online-shop/",
    name: "products",
    component: ProductListLayout,
  },

  { path: "/custom-online-shop/404", name: "404", component: Page404 },
  {
    path: "/custom-online-shop/shopping-cart",
    name: "shopping-cart",
    component: CartLayout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
