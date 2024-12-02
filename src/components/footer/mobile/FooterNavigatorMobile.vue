<script setup lang="ts">
import Home from "../../../assets/images/footer/Home.png";
import User from "../../../assets/images/footer/User.png";
import Design from "../../../assets/images/footer/Design.png";
import Cart from "../../../assets/images/footer/Cart.png";

import SelectedHome from "../../../assets/images/footer/home-selected.png";
import SelectedUser from "../../../assets/images/footer/user-selected.png";
import SelectedDesign from "../../../assets/images/footer/designtools-selected.png";
import SelectedCart from "../../../assets/images/footer/cart-selected.png";
import { ref } from "vue";

const selected = ref("user");

const menuItems = [
  {
    id: "user",
    label: "پروفایل",
    icon: User,
    selectedIcon: SelectedUser,
    routePath: "products",
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
    routePath: "products",
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
