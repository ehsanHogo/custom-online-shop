import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import ShowProducts from "../views/ShowProducts.vue";
import Page404 from "../Page404.vue";
import ShoppingCart from "../components/shoppingCart.vue/ShoppingCart.vue";
import MainBody from "../components/products/MainBody.vue";
const routes: Array<RouteRecordRaw> = [
  { path: "/custom-online-shop/", name: "products", component: MainBody },
  { path: "/custom-online-shop/404", name: "404", component: Page404 },
  {
    path: "/custom-online-shop/shopping-cart",
    name: "shopping-cart",
    component: ShoppingCart,
  },
  {
    path: "/custom-online-shop/shopping-cart",
    name: "shopping-cart",
    component: ShoppingCart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
