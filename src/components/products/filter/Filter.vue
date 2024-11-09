<script setup lang="ts">
import { computed, ref, toRef, watch } from "vue";
import FilterSize from "./FilterSize.vue";

import FilterColor from "./FilterColor.vue";
import {
  FilterItemOptions,
  FilterItemType,
  FiltersQueryType,
  FilterType,
} from "../../../types/interfaces";
import useFilterStore from "../../../store/useFilterStore";
import { storeToRefs } from "pinia";

interface MyProps {
  filterData: FilterType[];
  previousFilterCriterias: FiltersQueryType;
}

//store
const filterStore = useFilterStore();
const { onlyExist } = storeToRefs(filterStore);
//**** */

const props = defineProps<MyProps>();
const sendingToday = ref(false);

const fatherFilterCriterias = toRef(props, "previousFilterCriterias");

const filterCriterias = ref<FilterItemType[]>(
  fatherFilterCriterias.value.filters
);

const selectedFilterColorCriterias = computed<FilterItemType[]>(() => {
  return filterCriterias.value.filter((item) => {
    return item.filterType === "color";
  });
});

const selectedFilterSizeCriterias = computed<FilterItemType[]>(() => {
  return filterCriterias.value.filter((item) => {
    return item.filterType === "size";
  });
});

const filterButtons = ref<FilterItemOptions[]>([
  { name: "برند", open: false },
  { name: "اندازه", open: selectedFilterSizeCriterias.value.length !== 0 },
  { name: "رنگ", open: selectedFilterColorCriterias.value.length !== 0 },
  { name: "ارسال امروز", open: false },
  { name: "فقط کالاهای موجود", open: false },

  { name: "محدوده قیمت", open: false },
  { name: "مدل", open: false },
  { name: "طرح", open: false },
]);

const setOpen = (index: number) => {
  filterButtons.value[index].open = !filterButtons.value[index].open;
};

const deleteAllFilter = () => {
  filterStore.$reset();
};
</script>

<template>
  <div class="col-span-1 border rounded-sm p-5 flex flex-col gap-5 h-fit">
    <div class="flex justify-between">
      <button @click="deleteAllFilter">
        <b class="text-redp">حذف فیلتر ها</b>
      </button>
      <b>فیلتر ها</b>
    </div>

    <div class="flex flex-col gap-6">
      <div
        v-for="(filterButton, index) in filterButtons"
        :key="index"
        class="border-b last:border-none pb-2"
      >
        <button class="flex justify-between w-full" @click="setOpen(index)">
          <VaSwitch size="small" v-if="index === 3" v-model="sendingToday" />
          <VaSwitch size="small" v-else-if="index === 4" v-model="onlyExist" />
          <img
            v-else
            src="../../../assets/body/arrow-down.png"
            alt="arrow down"
          />

          <p>{{ filterButton.name }}</p>
        </button>
        <FilterSize
          :filterSizeData="props.filterData[1].option_values"
          v-if="
            filterButtons[index].name === 'اندازه' &&
            filterButtons[index].open &&
            props.filterData.length !== 0
          "
          :selectedFilters="selectedFilterSizeCriterias"
        ></FilterSize>

        <FilterColor
          :filterColorData="props.filterData[0].option_values"
          v-if="
            filterButtons[index].name === 'رنگ' &&
            filterButtons[index].open &&
            props.filterData.length !== 0
          "
          :selectedFilters="selectedFilterColorCriterias"
        ></FilterColor>
      </div>
    </div>
  </div>
</template>
