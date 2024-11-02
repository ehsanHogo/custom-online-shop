<script setup lang="ts">
import { ref } from "vue";

import AddRemoveProduct from "../generall/AddRemoveProduct.vue";
import { ShoppingProductType } from "../../types/interfaces";

const props = defineProps<ShoppingProductType>();
</script>

<template>
  <div class="border-b border-b-myGray-4 pb-4 mt-5">
    <div class="flex justify-evenly items-center">
      <button>
        <img
          src="../../assets/body/shopping cart/close-square.png"
          alt="delete product"
        />
      </button>
      <div>
        <img
          :src="props.image"
          alt="product picture"
          class="rounded-sm h-[150px]"
        />
      </div>
      <b> {{ props.name }}</b>
      <b>{{ props.price }} تومان</b>

      <AddRemoveProduct></AddRemoveProduct>
    </div>
    <div class="flex justify-end gap-3 mt-3">
      <img src="../../assets/body/shopping cart/trunk-fast.png" alt="" />
      <b class="text-myGray-9">ارسال از سه روز آینده</b>
    </div>
  </div>
</template>
