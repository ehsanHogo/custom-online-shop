import { defineStore } from "pinia";
import { FilterItemType } from "../types/interfaces";

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
    addFilter(filter: FilterItemType) {
      this.filters.push(filter);
    },

    deleteFilter(filterId: string) {
      this.filters = this.filters.filter((item) => {
        return item.criteriaId !== filterId;
      });
    },
    changeOnlyExist() {
      this.onlyExist = !this.onlyExist;
    },
  },
});

export default useFilterStore;
