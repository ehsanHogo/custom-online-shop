<script setup lang="ts">
import { ref } from "vue";
import {
  DataFetchType,
  FilterItemShowing,
  FilterItemType,
} from "../../types/interfaces";
interface MyProps {
  filterColorData: FilterItemShowing[];
  selectedFilters: FilterItemType[];
}
const props = defineProps<MyProps>();
const filterList = ref(
  props.filterColorData.map((item) => ({
    ...item,
    open:
      props.selectedFilters.filter((fil) => {
        return fil.criteriaId === item.id;
      }).length === 0
        ? false
        : true,
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

const updateOpenFlag = (index: number) => {
  //   console.log((event.target as HTMLInputElement).checked);
  //   if ((event.target as HTMLInputElement).checked)
  //     fetchFilteredData(filterList.value[index].name);
  //   console.log(index);
  // };

  filterList.value[index].open = !filterList.value[index].open;
  if (filterList.value[index].open === true) {
    sendDatatoParrent(
      filterList.value[index].name,
      "color",
      filterList.value[index].id,
      "add"
    );
  } else {
    sendDatatoParrent(
      filterList.value[index].name,
      "color",
      filterList.value[index].id,
      "remove"
    );
  }
  // console.log((event.target as HTMLInputElement).checked);
  // if ((event.target as HTMLInputElement).checked)
  //   sendDatatoParrent(
  //     filterList.value[index].name,
  //     "color",
  //     filterList.value[index].id,
  //     "add"
  //   );
  // else {
  //   sendDatatoParrent(
  //     filterList.value[index].name,
  //     "color",
  //     filterList.value[index].id,
  //     "remove"
  //   );
  // }
  // console.log(index);
};
// const text = ref(true);
</script>

<template>
  <!-- <transition-group name="fade" mode="out-in"> -->
  <div class="h-[200px] overflow-y-auto pr-4">
    <ul>
      <li
        v-for="(item, index) in filterList"
        :key="index"
        class="flex justify-between "
      >
        <button
          @click="updateOpenFlag(index)"
          class="flex justify-between w-full"
        >
          <p>{{ item.presentation }}</p>

          <input v-model="item.open" type="checkbox" />
        </button>
      </li>
    </ul>
  </div>

  <!-- </transition-group> -->
</template>
