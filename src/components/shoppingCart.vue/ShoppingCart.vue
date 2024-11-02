<script setup lang="ts">
import ShoppingRegistration from "./ShoppingRegistration.vue";
import ShopppingAlerts from "./ShopppingAlerts.vue";
import ShoppingList from "./ShoppingList.vue";
import {
  ShoppingCartListType,
  ShoppingProductType,
} from "../../types/interfaces";
import { toRef } from "vue";

interface MyProps {
  shoppingList: ShoppingCartListType;
}
const props = defineProps<MyProps>();

const emit = defineEmits(["shopping-data"]);
const passShoppingData = (data: ShoppingProductType) => {
  emit("shopping-data", data);
};

const shoppingListRef = toRef(props, "shoppingList");
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
