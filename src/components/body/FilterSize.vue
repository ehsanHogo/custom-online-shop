<script setup lang="ts">
import { ref, watch } from "vue";
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

const fetchFilteredData = async (filterName: string) => {
  const res = await fetch(
    `https://demo.spreecommerce.org/api/v2/storefront/products?filter[options][size]=${filterName}`
  );

  const data = await res.json();

  console.log(data);


  
};

const updateOpenFlag = (index: number, event: Event) => {
  console.log((event.target as HTMLInputElement).checked);
  if ((event.target as HTMLInputElement).checked)
    fetchFilteredData(filterList.value[index].name);
  console.log(index);
};
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
        <input
          v-model="item.open"
          type="checkbox"
          @change="(event) => updateOpenFlag(index, event)"
        />
      </li>
    </ul>
  </div>
</template>
