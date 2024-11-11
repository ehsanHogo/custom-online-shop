<script setup lang="ts">
import ShoppingRegistration from "./ShoppingRegistration.vue";
import ShopppingAlerts from "./ShopppingAlerts.vue";
import ShoppingList from "./ShoppingList.vue";
import { ShoppingCartListType } from "../../types/interfaces";
import { onBeforeMount } from "vue";
import qs from "qs";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import useCartStore from "../../store/useCartStore";

///store
const cartStore = useCartStore();
const { products, firstRefresh } = storeToRefs(cartStore);

//subscriber
cartStore.$subscribe(() => {
  updatePath();
});

//router
const router = useRouter();
const route = useRoute();
const updatePath = () => {
  const obj = {
    cart: qs.stringify(
      {
        products: products.value,
        firstRefresh: firstRefresh.value,
      } as ShoppingCartListType,
      {
        allowEmptyArrays: true,
      }
    ),
  };

  router.replace({
    path: "/custom-online-shop/shopping-cart",
    query: obj,
  });
};

//initialization
onBeforeMount(() => {
  const cartObj = qs.parse(qs.parse(route.query)["cart"]);
  console.log("refresh : ", firstRefresh.value);

  if (
    firstRefresh.value &&
    cartObj !== undefined &&
    cartObj !== null &&
    Object.keys(cartObj).length !== 0
  ) {
    if (cartObj.products[0] === "") {
      // products.value = [];
      cartStore.setProducts([]);
    } else {
      cartStore.setProducts(
        (cartObj as ShoppingCartListType).products.map((item) => {
          return { ...item, count: +item.count };
        })
      );
    }

    // firstRefresh.value = false;
    cartStore.setFirstrefresh(false);
  } else {
  }
});
</script>

<template>
  <div class="flex justify-center pt-5">
    <img
      src="../../assets/body/shopping cart/steper.png"
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
</template>
