<script setup lang="ts">
import ShoppingRegistration from "../components/shoppingCart/ShoppingRegistration.vue";
import ShopppingAlerts from "../components/shoppingCart/ShopppingAlerts.vue";
import ShoppingList from "../components/shoppingCart/ShoppingList.vue";
// import CattegorieseDesktop from "../components/products/cattegories/CattegorieseDesktop.vue";
import Cattegories from "../components/products/cattegories/Cattegories.vue";
import CattegorieseDesktop from "../components/products/cattegories/CattegorieseDesktop.vue";
import { useModalStore } from "../store/useModalsStore";
import { onMounted, onUnmounted, ref } from "vue";
import usePageStore from "../store/usePageData";
import ShoppingProductDesktop from "../components/shoppingCart/desktop/ShoppingProductDesktop.vue";
import ShoppingProductMobile from "../components/shoppingCart/mobile/ShoppingProductMobile.vue";

const pageStore = usePageStore();
const isDesktop = ref(window.innerWidth >= 768);

// Function to check the viewport size
const checkViewport = () => {
  if (window.innerWidth >= 768) {
    isDesktop.value = true;

    pageStore.setNumberOfProductsInPage(9);
  } else {
    isDesktop.value = false;

    pageStore.setNumberOfProductsInPage(10);
  }
};

// const modalsStore = useModalStore();

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("resize", checkViewport);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkViewport);
});
</script>

<template>
  <div>
    <CattegorieseDesktop v-if="isDesktop" class="pt-5"></CattegorieseDesktop>
    <div v-if="isDesktop" class="flex justify-center pt-5">
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
      <!-- <ShoppingList></ShoppingList>
        -->
      <ShoppingProductDesktop v-if="isDesktop"></ShoppingProductDesktop>

      <ShoppingProductMobile v-else></ShoppingProductMobile>
    </div>
  </div>
</template>
