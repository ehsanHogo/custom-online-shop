<script setup lang="ts">
import { computed, Ref, ref, watch } from "vue";
import FilterSize from "./FilterSize.vue";

import FilterColor from "./FilterColor.vue";
import {
  FilterItemOptions,
  FilterItemType,
  FilterType,
} from "../../types/interfaces";

interface MyProps {
  filterData: FilterType[];
}

const emit = defineEmits(["data-fetched"]);

const props = defineProps<MyProps>();
const sendingToday = ref(false);
const onlyExist = ref(false);

const filterButtons = ref<FilterItemOptions[]>([
  { name: "برند", open: false },
  { name: "اندازه", open: false },
  { name: "رنگ", open: false },
  { name: "ارسال امروز", open: false },
  { name: "فقط کالاهای موجود", open: false },

  { name: "محدوده قیمت", open: false },
  { name: "مدل", open: false },
  { name: "طرح", open: false },
]);

// const filterButtons: FilterItemOptions[] = [
//   { name: "برند", open: ref(false) },
//   { name: "اندازه", open: ref(false) },
//   { name: "رنگ", open: ref(false) },
//   { name: "ارسال امروز", open: ref(false) },
//   { name: "فقط کالاهای موجود", open: ref(false) },

//   { name: "محدوده قیمت", open: ref(false) },
//   { name: "مدل", open: ref(false) },
//   { name: "طرح", open: ref(false) },
// ];

const setOpen = (index: number) => {
  filterButtons.value[index].open = !filterButtons.value[index].open;
};

const filterCriterias = ref<FilterItemType[]>([]);

const filterColorCriterias = computed<FilterItemType[]>(() => {
  return filterCriterias.value.filter((item) => {
    return item.filterType === "color";
  });
});

const filterSizeCriterias = computed<FilterItemType[]>(() => {
  return filterCriterias.value.filter((item) => {
    return item.filterType === "size";
  });
});

watch(onlyExist, (newVal) => {
  emit("data-fetched", { filters: filterCriterias.value, onlyExist: newVal });
});

const recieveCriteria = (
  criteria: string,
  criteriaType: string,
  criteriaId: string,
  action: string
) => {
  if (action === "add") {
    filterCriterias.value.push({
      filterType: criteriaType,
      filterCriteria: criteria,
      criteriaId: criteriaId,
    });
  } else if (action === "remove") {
    filterCriterias.value = filterCriterias.value.filter((item) => {
      return item.criteriaId !== criteriaId;
    });
  }

  // console.log("exist :" , onlyExist.value);
  // if (action === "add")
  emit("data-fetched", {
    filters: filterCriterias.value,
    onlyExist: onlyExist.value,
  });
};

const deleteAllFilter = () => {
  filterCriterias.value = [];

  filterButtons.value = filterButtons.value.map((item) => {
    return { name: item.name, open: false };
  });
  onlyExist.value = false;
  emit("data-fetched", {
    filters: filterCriterias.value,
    onlyExist: onlyExist.value,
  });
  console.log("delete");
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
          <img v-else src="../../assets/body/arrow-down.png" alt="arrow down" />

          <p>{{ filterButton.name }}</p>
        </button>
        <FilterSize
          @data-criteria="recieveCriteria"
          :filterSizeData="props.filterData[1].option_values"
          v-if="
            filterButtons[index].name === 'اندازه' && filterButtons[index].open
          "
          :selectedFilters="filterSizeCriterias"
        ></FilterSize>

        <FilterColor
          @data-criteria="recieveCriteria"
          :filterColorData="props.filterData[0].option_values"
          v-if="
            filterButtons[index].name === 'رنگ' && filterButtons[index].open
          "
          :selectedFilters="filterColorCriterias"
        ></FilterColor>
      </div>
    </div>
  </div>
</template>
