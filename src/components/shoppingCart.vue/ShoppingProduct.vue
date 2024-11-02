<script setup lang="ts">
import { ref } from "vue";

const itemNumber = ref(1);

const decItemNum = () => {
  if (itemNumber.value - 1 >= 0) itemNumber.value -= 1;
};

const incItemNum = () => {
  itemNumber.value += 1;
};
</script>

<template>
  <div class="border-b border-b-myGray-4 pb-4 mt-5">
    <div class="flex justify-evenly items-center">
      <img
        src="../../assets/body/shopping cart/close-square.png"
        alt="delete product"
      />

      <img
        src="../../assets/body/shopping cart/test.png"
        alt="product picture"
      />

      <b> تیشرت سفید طرح دار</b>
      <b>240,000 تومان</b>

      <div class="flex">
        <button
          @click="incItemNum"
          class="border border-myGray-4 px-3 py-2 rounded-r-sm"
        >
          <p>+</p>
        </button>

        <div class="border border-myGray-4 px-3 py-2">
          <b>{{ itemNumber }}</b>
        </div>
        <button
          @click="decItemNum"
          class="border border-myGray-4 px-3 py-2 rounded-l-sm"
        >
          <p>-</p>
        </button>
      </div>
    </div>
    <div class="flex justify-end gap-3 mt-3">
      <img src="../../assets/body/shopping cart/truck-fast.png" alt="" />
      <b class="text-myGray-9">ارسال از سه روز آینده</b>
    </div>
  </div>
</template>
