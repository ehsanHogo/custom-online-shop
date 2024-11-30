<script setup lang="ts">
import { computed, ref } from "vue";
import { FilterItemShowing } from "../../../../types/interfaces";
import useFilterStore from "../../../../store/useFilterStore";
import { storeToRefs } from "pinia";

interface MyProps {
  filterColorData: FilterItemShowing[];
}
const props = defineProps<MyProps>();

//store

const filterStore = useFilterStore();
const { allFilter } = storeToRefs(filterStore);

const updateFilterList = computed(() => {
  return props.filterColorData.map((item) => ({
    ...item,
    open:
      allFilter.value.filters.filter((fil) => {
        return fil.criteriaId === item.id;
      }).length === 0
        ? false
        : true,
  }));
});

const filterList = ref(updateFilterList); // for reactivity of open flag

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
