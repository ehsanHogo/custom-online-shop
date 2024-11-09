<script setup lang="ts">
import { ref } from "vue";
import { FilterItemShowing, FilterItemType } from "../../../types/interfaces";
import useFilterStore from "../../../store/useFilterStore";
import { storeToRefs } from "pinia";
interface MyProps {
  filterSizeData: FilterItemShowing[];
  
}
const props = defineProps<MyProps>();

//store
const filterStore = useFilterStore();

const { filters } = storeToRefs(filterStore);

const updateFilterList = () => {
  return props.filterSizeData.map((item) => ({
    ...item,
    open:
      filters.value.filter((fil) => {
        return fil.criteriaId === item.id;
      }).length === 0
        ? false
        : true,
  }));
};

const filterList = ref(updateFilterList());

filterStore.$subscribe((mutation, _) => {
  const events = Array.isArray(mutation.events)
    ? mutation.events
    : [mutation.events];
  events.forEach((event) => {
    if (event.key !== "onlyExist") {
      filterList.value = updateFilterList();
    }
  });
});

const updateOpenFlag = (index: number) => {
  filterList.value[index].open = !filterList.value[index].open;
  if (filterList.value[index].open === true) {
    filterStore.addFilter({
      filterType: "size",
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
