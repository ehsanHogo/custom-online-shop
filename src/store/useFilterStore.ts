import { defineStore } from "pinia";
import { AllFiltersType, FilterItemType, FilterType } from "../types/interfaces";

import usePageStore from "./usePageData";



const useFilterStore = defineStore("filters", {
  state: () => ({
    allFilter: {
      filters: [],
      onlyExist: false,
    } as AllFiltersType,

    filtersType: [] as FilterType[],
  }),
  getters: {},
  actions: {
    // Helper function to update filters and reset page data
    updateFilters(action: () => void) {
      action(); // Perform the specific filter update
      const pageStore = usePageStore();
      pageStore.resetPageData(); // Reset page data
    },

    addFilter(filter: FilterItemType) {
      this.updateFilters(() => {
        this.allFilter.filters.push(filter);
      });
    },

    deleteFilter(filterId: string) {
      this.updateFilters(() => {
        this.allFilter.filters = this.allFilter.filters.filter(
          (item) => item.criteriaId !== filterId
        );
      });
    },

    changeOnlyExist() {
      this.updateFilters(() => {
        this.allFilter.onlyExist = !this.allFilter.onlyExist;
      });
    },
    setFilterType(val: FilterType[]) {
      this.filtersType = val;
    },

    resetAllFilter() {
      this.updateFilters(() => {
        this.allFilter.filters = [];
        this.allFilter.onlyExist = false;
      });
    },
  },
});

export default useFilterStore;
