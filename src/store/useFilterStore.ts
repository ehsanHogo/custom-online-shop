import { defineStore } from "pinia";
import {
  AllFiltersType,
  FilterItemType,
  FilterType,
  SelectedFilterItemType,
} from "../types/interfaces";

import usePageStore from "./usePageData";

const useFilterStore = defineStore("filters", {
  state: () => ({
    allFilter: {
      filters: [],
      onlyExist: false,
    } as AllFiltersType,

    filtersType: [] as FilterType[],
    selectedFilters: [] as SelectedFilterItemType[],
  }),
  getters: {},
  actions: {
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

    setAllFilter(val: AllFiltersType) {
      this.updateFilters(() => {
        this.allFilter = val;
      });
    },

    resetAllFilter() {
      this.updateFilters(() => {
        this.allFilter.filters = [];
        this.allFilter.onlyExist = false;

        this.selectedFilters = [];
      });
    },

    resetSelectedFilter() {
      this.selectedFilters = [];
    },

    addSelectedFilters(val: SelectedFilterItemType) {
      this.selectedFilters.push(val);
    },
    deleteSelectedFilters(val: string) {
      this.selectedFilters = this.selectedFilters.filter(
        (item) => item.id !== val
      );
    },
  },
});

export default useFilterStore;
