<script setup lang="ts">
import { ref, watch } from "vue";
import { DataFetchType, FilterItem } from "../../types/interfaces";
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

// const filterCriterias = ref<string[]>([])

const emit = defineEmits(["data-criteria"]);

const sendDatatoParrent = (
  criteria: string,
  criteriaType: string,
  criteriaId: string,
  action: string
) => {
  emit("data-criteria", criteria, criteriaType, criteriaId, action);
};

const updateOpenFlag = (index: number, event: Event) => {
  console.log((event.target as HTMLInputElement).checked);
  if ((event.target as HTMLInputElement).checked)
    // fetchFilteredData(filterList.value[index].name);
    sendDatatoParrent(
      filterList.value[index].name,
      "size",
      filterList.value[index].id,
      "add"
    );
  else {
    sendDatatoParrent(
      filterList.value[index].name,
      "size",
      filterList.value[index].id,
      "remove"
    );
  }
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
