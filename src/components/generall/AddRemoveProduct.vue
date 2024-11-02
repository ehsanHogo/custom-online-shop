<script setup lang="ts">
import { ref, toRef } from "vue";

interface MyProps {
  firstCount: number;
}
const props = defineProps<MyProps>();
const emit = defineEmits(["count-data"]);

const fatherCount = toRef(props, "firstCount");
const itemNumber = ref(fatherCount.value);

const decItemNum = () => {
  if (itemNumber.value - 1 >= 0) itemNumber.value -= 1;
  emit("count-data", itemNumber.value);
};

const incItemNum = () => {
  itemNumber.value += 1;
  emit("count-data", itemNumber.value);
};
</script>

<template>
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
</template>
