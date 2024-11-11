import { defineStore } from "pinia";
import { FilterItemType } from "../types/interfaces";

import usePageStore from "./usePageData";

export interface FiltersType {
  filters: FilterItemType[];
  onlyExist: boolean;
}

const useFilterStore = defineStore("filters", {
  state: (): FiltersType => ({
    filters: [],
    onlyExist: false,
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
        this.filters.push(filter);
      });
    },

    deleteFilter(filterId: string) {
      this.updateFilters(() => {
        this.filters = this.filters.filter(
          (item) => item.criteriaId !== filterId
        );
      });
    },

    changeOnlyExist() {
      this.updateFilters(() => {
        this.onlyExist = !this.onlyExist;
      });
    },

    resetAllFilter() {
      this.updateFilters(() => {
        this.filters = [];
        this.onlyExist = false;
      });
    },
  },
});

export default useFilterStore;
