<script setup lang="ts">
import { ref } from "vue";
import { DataFetchType, FilterItem } from "../../types/interfaces";
interface MyProps {
  filterColorData: FilterItem[];
}
const props = defineProps<MyProps>();
const filterList = ref(
  props.filterColorData.map((item) => ({
    ...item,
    open: false,
  }))
);

const emit = defineEmits(["data-criteria"]);

// const sendDatatoParrent = (data: DataFetchType[]) => {
//   emit("data-fetched", data);
// };
const sendDatatoParrent = (
  criteria: string,
  criteriaType: string,
  criteriaId: string,
  action: string
) => {
  emit("data-criteria", criteria, criteriaType, criteriaId, action);
};

const updateOpenFlag = (index: number, event: Event) => {
  //   console.log((event.target as HTMLInputElement).checked);
  //   if ((event.target as HTMLInputElement).checked)
  //     fetchFilteredData(filterList.value[index].name);
  //   console.log(index);
  // };

  console.log((event.target as HTMLInputElement).checked);
  if ((event.target as HTMLInputElement).checked)
    sendDatatoParrent(
      filterList.value[index].name,
      "color",
      filterList.value[index].id,
      "add"
    );
  else {
    sendDatatoParrent(
      filterList.value[index].name,
      "color",
      filterList.value[index].id,
      "remove"
    );
  }
  console.log(index);
};
// const text = ref(true);
</script>

<template>
  <div class="h-[200px] overflow-y-auto pr-4">
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
