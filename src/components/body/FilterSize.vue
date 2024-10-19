<script setup lang="ts">
import { ref } from "vue";
import { FilterItem } from "../../types/interfaces";
interface MyProps {
  filterSizeData: FilterItem[];
}
const props = defineProps<MyProps>();
const filterList = ref(
  props.filterSizeData.map((item) => ({
    ...item,
    open: false, // default value for the new property
  }))
);
// const text = ref(true);
</script>

<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in filterList"
        :key="index"
        class="flex justify-between"
      >
        <p>{{ item.presentation }}</p>
        <input v-model="item.open" type="checkbox" />
      </li>
    </ul>
  </div>
</template>
