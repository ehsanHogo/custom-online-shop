<script setup lang="ts">
import useCartStore from "../../../store/useCartStore";

const cartStore = useCartStore();
</script>

<template>
  <router-link
    :to="{ name: 'shopping-cart' }"
    class="flex justify-start items-center gap-1 text-myGray-9"
  >
    <b class="text-sm text-nowrap">سبد خرید</b>

    <div class="flex items-center">
      <img
        src="../../../assets/images/header/shopping-cart.png"
        alt="shopping cart"
      />
      <div
        class="bg-Tint-5 rounded-xl w-6 h-6 flex justify-center items-center relative -translate-x-2 -translate-y-2 pt-1"
      >
        <b> {{ cartStore.products.length }}</b>
      </div>
    </div>
  </router-link>
  <button class="flex justify-start items-center gap-1 text-myGray-9">
    <b class="text-sm text-nowrap">ورود | ثبت نام</b>
    <img src="../../../assets/images/header/Login.png" alt="login logo" />
  </button>
</template>
