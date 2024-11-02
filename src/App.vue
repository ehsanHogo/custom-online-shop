<script setup lang="ts">
import Header from "./components/header/TheHeader.vue";
import Footer from "./components/footer/TheFooter.vue";

import Cattegories from "./components/products/Cattegories.vue";
import { ref } from "vue";
import { ShoppingCartListType, ShoppingProductType } from "./types/interfaces";

const shoppingList = ref<ShoppingCartListType>({ products: [] });

const updateShoppingList = (data: ShoppingProductType) => {
  console.log("add to shopping list");
  shoppingList.value.products = shoppingList.value.products.concat(data);
};
</script>

<template>
  <div class="font-MyFont">
    <Header></Header>
    <Cattegories class="pt-5"></Cattegories>
    <!-- <MainBody></MainBody> -->
    <router-view
      @shopping-data="updateShoppingList"
      :shoppingList="shoppingList"
    />

    <Footer></Footer>

    <!-- <router-view /> -->
  </div>
</template>

<style scoped></style>
