<script setup lang="ts">
import Header from "./components/header/TheHeader.vue";
import Footer from "./components/footer/TheFooter.vue";

import Cattegories from "./components/products/Cattegories.vue";
import { ref } from "vue";
import { ShoppingCartListType, ShoppingProductType } from "./types/interfaces";

const shoppingList = ref<ShoppingCartListType>({
  products: [],
  firstRefresh: true,
});

const updateShoppingList = (data: ShoppingCartListType) => {
  shoppingList.value.firstRefresh = false;
  // console.log("add to shopping list");

  // console.log(data.count);
  // console.log(data.id);

  // const resultIndex = shoppingList.value.products.findIndex(
  //   (item) => item.id === data.id
  // );

  // console.log("resultIndex", resultIndex);
  // if (resultIndex === -1) {
  //   shoppingList.value.products = shoppingList.value.products.concat(data);
  //   console.log(" enter -1");
  // } else {
  //   if (data.count === 0) {
  //     shoppingList.value.products.splice(resultIndex, 1);
  //     console.log("deleted");
  //   } else {
  //     shoppingList.value.products[resultIndex].count = data.count;
  //   }
  // }

  shoppingList.value = data;
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
