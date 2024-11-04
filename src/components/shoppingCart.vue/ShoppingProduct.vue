<script setup lang="ts">
import { ref, toRef } from "vue";

import AddRemoveProduct from "../generall/AddRemoveProduct.vue";
import { ShoppingProductType } from "../../types/interfaces";

const props = defineProps<ShoppingProductType>();

const emit = defineEmits(["shopping-data"]);

const passShoppingData = (data: ShoppingProductType) => {
  emit("shopping-data", data);
};

const fatherCount = toRef(props, "count");
const MyCount = ref(fatherCount.value);
const updateCount = (data: number) => {
  MyCount.value = data;


  if (data === 0) {
  }

  passShoppingData({
    name: props.name,
    image: props.image,
    count: MyCount.value,
    price: props.price,
    id: props.id,
  });
};

const handleDelete = () => {
  passShoppingData({
    name: props.name,
    image: props.image,
    count: 0,
    price: props.price,
    id: props.id,
  });
};
</script>

<template>
  <div class="border-b border-b-myGray-4 pb-4 mt-5">
    <div class="flex justify-evenly items-center">
      <button @click="handleDelete">
        <img
          src="../../assets/body/shopping cart/close-square.png"
          alt="delete product"
        />
      </button>
      <div>
        <img
          :src="props.image"
          alt="product picture"
          class="rounded-sm h-[150px] w-[150px]"
        />
      </div>
      <b> {{ props.name }}</b>
      <b>{{ props.price }} </b>

      <AddRemoveProduct
        :firstCount="MyCount"
        @count-data="updateCount"
      ></AddRemoveProduct>
    </div>
    <div class="flex justify-end gap-3 mt-3">
      <img src="../../assets/body/shopping cart/truck-fast.png" alt="" />
      <b class="text-myGray-9">ارسال از سه روز آینده</b>
    </div>
  </div>
</template>
