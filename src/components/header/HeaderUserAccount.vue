<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import useCartStore from "../../store/useCartStore";

const route = useRoute();

const newPathWithQuery = computed(() => {
  return {
    path: "/custom-online-shop/shopping-cart",
    query: { ...route.query },
  };
});

const cartStore = useCartStore();
</script>

<template>
  <router-link
    :to="newPathWithQuery"
    class="flex justify-start items-center gap-1 text-myGray-9"
  >
    <b class="text-sm">سبد خرید</b>

    <div class="flex items-center">
      <img src="../../assets/header/shopping-cart.png" alt="shopping cart" />
      <div
        class="bg-Tint-5 rounded-xl w-6 h-6 flex justify-center items-center relative -translate-x-2 -translate-y-2 pt-1"
      >
        <b> {{ cartStore.products.length }}</b>
      </div>
    </div>
  </router-link>
  <button class="flex justify-start items-center gap-1 text-myGray-9">
    <b class="text-sm">ورود | ثبت نام</b>
    <img src="../../assets/header/Login.png" alt="login logo" />
  </button>
</template>
