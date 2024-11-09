<script setup lang="ts">
import { ShoppingProductType } from "../../types/interfaces";
import ShoppingProduct from "./ShoppingProduct.vue";
import useCartStore from "../../store/useCartStore";
import { storeToRefs } from "pinia";

//store
const cartStore = useCartStore();

const { products } = storeToRefs(cartStore);

const emit = defineEmits(["shopping-data"]);

const passShoppingData = (data: ShoppingProductType) => {
  emit("shopping-data", data);
};
</script>
<template>
  <div class="col-span-2 p-5" dir="rtl">
    <div class="border-b border-b-myGray-4 pb-4">
      <b class="text-myGray-9 mr-10">سبد خرید</b>
    </div>

    <div class="">
      <ul v-if="products.length !== 0">
        <li v-for="item in products" :key="item.id">
          <ShoppingProduct
            :name="item.name"
            :price="item.price"
            :image="item.image"
            :count="item.count"
            :id="item.id"
            @shopping-data="passShoppingData"
          ></ShoppingProduct>
        </li>
      </ul>
    </div>
  </div>
</template>
