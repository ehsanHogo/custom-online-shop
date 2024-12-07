<script setup lang="ts">
import Home from "../../../assets/images/footer/Home.png";
import User from "../../../assets/images/footer/User.png";
import Design from "../../../assets/images/footer/Design.png";
import Cart from "../../../assets/images/footer/Cart.png";

import SelectedHome from "../../../assets/images/footer/home-selected.png";
import SelectedUser from "../../../assets/images/footer/user-selected.png";
import SelectedDesign from "../../../assets/images/footer/designtools-selected.png";
import SelectedCart from "../../../assets/images/footer/cart-selected.png";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const selected = ref("home");

const menuItems = [
  {
    id: "user",
    label: "پروفایل",
    icon: User,
    selectedIcon: SelectedUser,
    routePath: "404",
  },
  {
    id: "cart",
    label: "سبد خرید",
    icon: Cart,
    selectedIcon: SelectedCart,
    routePath: "shopping-cart",
  },
  {
    id: "design",
    label: "طراحی سفارشی",
    icon: Design,
    selectedIcon: SelectedDesign,
    routePath: "404",
  },
  {
    id: "home",
    label: "خانه",
    icon: Home,
    selectedIcon: SelectedHome,
    routePath: "products",
  },
];

const handleSeleted = (id: string) => {
  selected.value = id;
};

const route = useRoute();

// Watch for route changes
watch(
  () => route.name,
  (newRouteName) => {
    switch (newRouteName) {
      case "products":
        selected.value =
          menuItems.find((item) => item.routePath === "products")?.id || "";
        break;
      case "404":
        menuItems.find((item) => item.routePath === "404")?.id || "";
        break;
      case "shopping-cart":
        menuItems.find((item) => item.routePath === "shopping-cart")?.id || "";
        break;
    }
  }
);
</script>
<template>
  <div class="bg-redp flex justify-around items-center py-5">
    <router-link
      v-for="item in menuItems"
      :key="item.id"
      class="flex flex-col gap-2 justify-center items-center"
      :to="{ name: item.routePath }"
      @click="() => handleSeleted(item.id)"
    >
      <img
        :src="selected === item.id ? item.selectedIcon : item.icon"
        :alt="`${item.label} icon`"
      />
      <p class="text-white">{{ item.label }}</p>
    </router-link>
  </div>
</template>
