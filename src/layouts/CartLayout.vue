<script setup lang="ts">
import ShoppingRegistration from "../components/shoppingCart/ShoppingRegistration.vue";
import ShopppingAlerts from "../components/shoppingCart/ShopppingAlerts.vue";
import ShoppingList from "../components/shoppingCart/ShoppingList.vue";
// import CattegorieseDesktop from "../components/products/cattegories/CattegorieseDesktop.vue";
import Cattegories from "../components/products/cattegories/Cattegories.vue";
import CattegorieseDesktop from "../components/products/cattegories/CattegorieseDesktop.vue";
</script>

<template>
  <div>
    <CattegorieseDesktop class="pt-5"></CattegorieseDesktop>
    <div class="flex justify-center pt-5">
      <img
        src="../assets/images/body/shopping cart/steper.png"
        alt="shopping progress"
      />
    </div>

    <div class="grid grid-cols-3 gap-3">
      <div class="flex flex-col gap-5 ml-3 mt-5">
        <ShoppingRegistration></ShoppingRegistration>
        <ShopppingAlerts></ShopppingAlerts>
      </div>
      <ShoppingList></ShoppingList>
    </div>
  </div>
</template>
