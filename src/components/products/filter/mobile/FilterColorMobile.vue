<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  FilterItemShowing,
  FilterListCheckbox,
} from "../../../../types/interfaces";
import useFilterStore from "../../../../store/useFilterStore";
import { storeToRefs } from "pinia";

interface MyProps {
  filterColorData: FilterItemShowing[];
}
const props = defineProps<MyProps>();

//store

const filterStore = useFilterStore();
const { allFilter } = storeToRefs(filterStore);

const filterList = ref<FilterListCheckbox[]>([]); // for reactivity of open flag
const updateOpenFlag = (index: number) => {
  filterList.value = filterList.value.map((item, i: number) =>
    i === index ? { ...item, open: !item.open } : item
  );
  if (filterList.value[index].open === true) {
    filterStore.addSelectedFilters({
      name: filterList.value[index].name,
      type: "color",
      id: filterList.value[index].id,
    });
  } else {
    filterStore.deleteSelectedFilters(filterList.value[index].id);
  }
};

watch(
  () => filterStore.selectedFilters,
  (newVal) => {
    // handle delete all filetrs
    if (newVal.length === 0) {
      const updateFilterList: FilterListCheckbox[] = props.filterColorData.map(
        (item) => ({
          ...item,
          open: false,
        })
      );

      filterList.value = updateFilterList;
    }
  }
);

onMounted(() => {
  const updateFilterList: FilterListCheckbox[] = props.filterColorData.map(
    (item) => ({
      ...item,
      open:
        allFilter.value.filters.filter((fil) => {
          return fil.criteriaId === item.id;
        }).length === 0
          ? false
          : true,
    })
  );

  filterList.value = updateFilterList;
});
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
