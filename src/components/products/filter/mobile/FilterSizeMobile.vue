<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  FilterItemShowing,
  FilterListCheckbox,
} from "../../../../types/interfaces";
import useFilterStore from "../../../../store/useFilterStore";
import { storeToRefs } from "pinia";
interface MyProps {
  filterSizeData: FilterItemShowing[];
}

const props = defineProps<MyProps>();

//store
const filterStore = useFilterStore();

const { allFilter } = storeToRefs(filterStore);

const filterList = ref<FilterListCheckbox[]>([]);

const updateOpenFlag = (index: number) => {
  console.log(filterList.value[index].open);

  filterList.value = filterList.value.map((item, i: number) =>
    i === index ? { ...item, open: !item.open } : item
  );
  console.log(filterList.value[index].open);
  if (filterList.value[index].open === true) {
    filterStore.addSelectedFilters({
      name: filterList.value[index].name,
      type: "size",
      id: filterList.value[index].id,
    });
  } else {
    filterStore.deleteSelectedFilters(filterList.value[index].id);
  }
};

onMounted(() => {
  const updateFilterList: FilterListCheckbox[] = props.filterSizeData.map(
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
