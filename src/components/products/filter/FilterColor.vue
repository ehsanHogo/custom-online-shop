<script setup lang="ts">
import { ref } from "vue";
import { FilterItemShowing, FilterItemType } from "../../../types/interfaces";
import useFilterStore from "../../../store/useFilterStore";
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

//store

const filterStore = useFilterStore();

// const emit = defineEmits(["data-criteria"]);



const updateOpenFlag = (index: number) => {
  filterList.value[index].open = !filterList.value[index].open;
  if (filterList.value[index].open === true) {
    filterStore.addFilter({
      filterType: "color",
      filterCriteria: filterList.value[index].name,
      criteriaId: filterList.value[index].id,
    });

  } else {

    filterStore.deleteFilter(filterList.value[index].id);

  }
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
</template>
