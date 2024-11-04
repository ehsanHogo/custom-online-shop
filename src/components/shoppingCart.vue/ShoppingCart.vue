<script setup lang="ts">
import ShoppingRegistration from "./ShoppingRegistration.vue";
import ShopppingAlerts from "./ShopppingAlerts.vue";
import ShoppingList from "./ShoppingList.vue";
import {
  FiltersQueryType,
  ShoppingCartListType,
  ShoppingProductType,
} from "../../types/interfaces";
import { onBeforeMount, ref, toRef, watch } from "vue";
import { LocationQuery, useRoute, useRouter } from "vue-router";
import qs from "qs";

interface MyProps {
  shoppingList: ShoppingCartListType;
  filterSortPageData: FiltersQueryType;
  routing: LocationQuery;
}
const props = defineProps<MyProps>();

const emit = defineEmits(["shopping-data", "filter-sort-page-data"]);
const passShoppingData = (data: ShoppingProductType) => {
  emit("shopping-data", data);
};

const fatherRouting = toRef(props, "routing");

const shoppingListRef = toRef(props, "shoppingList");
const childShoppingList = ref(shoppingListRef.value);
watch(fatherRouting, (newVal) => {
  console.log("lsit change newVal", newVal);
});

const router = useRouter();

const route = useRoute();

const updatePath = () => {
  const obj = {
    cart: qs.stringify(shoppingListRef.value as ShoppingCartListType, {
      allowEmptyArrays: true,
    }),
  };

  // console.log(qs.stringify(params));

  router.push({
    path: "/custom-online-shop/",
    query: obj,
  });
};

watch(fatherRouting, (newVal) => {
  console.log("hey path");

  router.push({
    path: "/custom-online-shop/shopping-cart",
    query: newVal,
  });
});

onBeforeMount(() => {
  console.log(fatherRouting.value);

  router.push({
    path: "/custom-online-shop/shopping-cart",
    query: fatherRouting.value,
  });
});

// console.log(fatherRouting);
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
    <ShoppingList
      @shopping-data="passShoppingData"
      :shoppingList="shoppingListRef"
    ></ShoppingList>
  </div>
</template>
