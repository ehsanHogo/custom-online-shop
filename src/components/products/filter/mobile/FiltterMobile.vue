<script setup lang="ts">
import { ref } from "vue";
import FilterSize from "../desktop/FilterSize.vue";

import FilterColor from "../desktop/FilterColor.vue";
import { FilterItemOptions, FilterType } from "../../../../types/interfaces";
import useFilterStore from "../../../../store/useFilterStore";
import { storeToRefs } from "pinia";
import FilterColorMobile from "./FilterColorMobile.vue";
import FilterSizeMobile from "./FilterSizeMobile.vue";

interface MyProps {
  filterData: FilterType[];
}

//store
const filterStore = useFilterStore();
const { allFilter } = storeToRefs(filterStore);

//**** */

const props = defineProps<MyProps>();
const sendingToday = ref(false);

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

console.log(filterButtons.value[2].name);
console.log(filterButtons.value[2].open);

const setOpen = (index: number) => {
  filterButtons.value[index].open = !filterButtons.value[index].open;
};

const deleteAllFilter = () => {
  filterStore.resetAllFilter();
};

const onlyExist = ref(allFilter.value.onlyExist);
const onExistSwitchChange = () => {
  onlyExist.value = !onlyExist.value;
};

const handleCloseFilter = () => {
  filterStore.resetSelectedFilter();
  onlyExist.value = false;
  toggleModal();
};

const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const updateFilters = () => {
  const selectedFilters = filterStore.selectedFilters.map((item) => {
    return {
      filterCriteria: item.name,
      filterType: item.type,
      criteriaId: item.id,
    };
  });

  filterStore.setAllFilter({
    filters: selectedFilters,
    onlyExist: onlyExist.value,
  });

  showModal.value = false;
};
</script>

<template>
  <button @click="toggleModal" class="flex gap-1 justify-center items-center">
    <img
      src="../../../../assets/images/body/products/setting.png"
      alt="filter icon"
    />
    <p>فیلتر</p>
  </button>

  <VaModal
    ref="modal"
    v-model="showModal"
    hide-default-actions
    size="large"
    :noDismiss="true"
  >
    <div
      class="col-span-1 border rounded-sm flex flex-col gap-5 h-fit md:px-3 font-MyFont mt-3"
    >
      <div class="flex justify-between border-b pb-2 items-center">
        <button @click="deleteAllFilter" class="p-5">
          <b class="text-redp">حذف فیلتر ها</b>
        </button>
        <div class="flex justify-center items-center pr-5">
          <b class="p-5">فیلتر ها</b>

          <button @click="handleCloseFilter">
            <img
              src="../../../../assets/images/body/black-arrow-right.png"
              alt=""
            />
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-6 px-4">
        <div
          v-for="(filterButton, index) in filterButtons"
          :key="index"
          class="border-b last:border-none pb-2"
        >
          <button class="flex justify-between w-full" @click="setOpen(index)">
            <VaSwitch size="small" v-if="index === 3" v-model="sendingToday" />

            <VaSwitch
              size="small"
              v-else-if="index === 4"
              :model-value="onlyExist"
              @update:modelValue="onExistSwitchChange"
            />
            <img
              v-else
              src="../../../../assets/images/body/products/arrow-down.png"
              alt="arrow down"
            />

            <p class="">{{ filterButton.name }}</p>
          </button>
          <FilterSizeMobile
            :filterSizeData="props.filterData[1].option_values"
            v-if="
              filterButtons[index].name === 'اندازه' &&
              filterButtons[index].open &&
              props.filterData.length !== 0
            "
          ></FilterSizeMobile>

          <FilterColorMobile
            :filterColorData="props.filterData[0].option_values"
            v-if="
              filterButtons[index].name === 'رنگ' &&
              filterButtons[index].open &&
              props.filterData.length !== 0
            "
          ></FilterColorMobile>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <button
          @click="updateFilters"
          class="border bg-redp w-2/3 h-10 rounded-sm text-white"
        >
          <b> اعمال فیلتر</b>
        </button>
      </div>
    </div>
  </VaModal>
</template>
