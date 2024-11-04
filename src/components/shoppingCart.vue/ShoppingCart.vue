<script setup lang="ts">
import ShoppingRegistration from "./ShoppingRegistration.vue";
import ShopppingAlerts from "./ShopppingAlerts.vue";
import ShoppingList from "./ShoppingList.vue";
import {
  FiltersQueryType,
  ShoppingCartListType,
  ShoppingProductType,
} from "../../types/interfaces";
import { ref, toRef, watch } from "vue";

interface MyProps {
  shoppingList: ShoppingCartListType;
  // filterSortPageData: FiltersQueryType;
}
const props = defineProps<MyProps>();

const emit = defineEmits(["shopping-data", "filter-sort-page-data"]);
const passShoppingData = (data: ShoppingProductType) => {
  updateShoppingList(data);
  emit("shopping-data", childShoppingList.value);
};

const shoppingListRef = toRef(props, "shoppingList");
const childShoppingList = ref(shoppingListRef.value);
// console.log(shoppingListRef.value);

const updateShoppingList = (data: ShoppingProductType) => {
  console.log("add to shopping list");

  const resultIndex = childShoppingList.value.products.findIndex(
    (item) => item.id === data.id
  );
  if (resultIndex === -1) {
    childShoppingList.value.products =
      childShoppingList.value.products.concat(data);
  } else {
    if (data.count === 0) {
      childShoppingList.value.products.splice(resultIndex, 1);
    } else {
      childShoppingList.value.products[resultIndex].count = data.count;
    }
  }
};
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
      :shoppingList="childShoppingList"
    ></ShoppingList>
  </div>
</template>
