<script setup lang="ts">
import Header from "./components/header/TheHeader.vue";
import Footer from "./components/footer/TheFooter.vue";

import Cattegories from "./components/products/filter/Cattegories.vue";
import { ref } from "vue";
import { ShoppingCartListType, ShoppingProductType } from "./types/interfaces";

const shoppingList = ref<ShoppingCartListType>({
  products: [],
  firstRefresh: true,
});

const updateShoppingList = (data: ShoppingCartListType) => {
  shoppingList.value.firstRefresh = false;

  console.log(data);

  shoppingList.value = data;
};
</script>

<template>
  <div class="font-MyFont">
    <Header></Header>
    <Cattegories class="pt-5"></Cattegories>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<style scoped></style>
