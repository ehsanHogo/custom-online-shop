<script setup lang="ts">
import { ref } from "vue";
import FilterSize from "../desktop/FilterSize.vue";

import FilterColor from "../desktop/FilterColor.vue";
import { FilterItemOptions, FilterType } from "../../../../types/interfaces";
import useFilterStore from "../../../../store/useFilterStore";
import { storeToRefs } from "pinia";
import { useModalStore } from "../../../../store/useModalsStore";

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

const onExistSwitchChange = () => {
  filterStore.changeOnlyExist();
};

const modalsStore = useModalStore();
</script>

<template>
  <VaModal
    ref="modal"
    v-model="modalsStore.filterModal"
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

          <button @click="() => modalsStore.toggleFilterModal()">
            <img
              src="../../../../assets/images/body/products/black-arrow-right.png"
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
              :model-value="allFilter.onlyExist"
              @update:modelValue="onExistSwitchChange"
            />
            <img
              v-else
              src="../../../../assets/images/body/products/arrow-down.png"
              alt="arrow down"
            />

            <p class="">{{ filterButton.name }}</p>
          </button>
          <FilterSize
            :filterSizeData="props.filterData[1].option_values"
            v-if="
              filterButtons[index].name === 'اندازه' &&
              filterButtons[index].open &&
              props.filterData.length !== 0
            "
          ></FilterSize>

          <FilterColor
            :filterColorData="props.filterData[0].option_values"
            v-if="
              filterButtons[index].name === 'رنگ' &&
              filterButtons[index].open &&
              props.filterData.length !== 0
            "
          ></FilterColor>
        </div>
      </div>
    </div>
  </VaModal>
</template>
