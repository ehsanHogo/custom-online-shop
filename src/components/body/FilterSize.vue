<script setup lang="ts">
import { ref, watch } from "vue";
import { DataFetchType, FilterItemShowing } from "../../types/interfaces";
interface MyProps {
  filterSizeData: FilterItemShowing[];
}
const props = defineProps<MyProps>();
const filterList = ref(
  props.filterSizeData.map((item) => ({
    ...item,
    open: false,
  }))
);

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
