<script setup lang="ts">
import ShoppingRegistration from "../components/shoppingCart/ShoppingRegistration.vue";
import ShopppingAlerts from "../components/shoppingCart/ShopppingAlerts.vue";
import CattegorieseDesktop from "../components/products/cattegories/CattegorieseDesktop.vue";
import ShoppingProductDesktop from "../components/shoppingCart/desktop/ShoppingProductDesktop.vue";
import ShoppingProductMobile from "../components/shoppingCart/mobile/ShoppingProductMobile.vue";
import useScreenStore from "../store/useScreenStore";

const screenStore = useScreenStore();
</script>

<template>
  <div>
    <CattegorieseDesktop
      v-if="screenStore.isDesktop"
      class="pt-5"
    ></CattegorieseDesktop>
    <div v-if="screenStore.isDesktop" class="flex justify-center pt-5">
      <img
        src="../assets/images/body/shopping cart/steper.png"
        alt="shopping progress"
      />
    </div>

    <div class="flex flex-col-reverse md:grid md:grid-cols-3 md:gap-3">
      <div class="flex flex-col gap-5 ml-3 mt-5">
        <ShoppingRegistration></ShoppingRegistration>
        <ShopppingAlerts></ShopppingAlerts>
      </div>

      <ShoppingProductDesktop
        v-if="screenStore.isDesktop"
      ></ShoppingProductDesktop>

      <ShoppingProductMobile v-else></ShoppingProductMobile>
    </div>
  </div>
</template>
