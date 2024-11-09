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
    addFilter(filter: FilterItemType) {
      const pageStore = usePageStore();
      this.filters.push(filter);
      pageStore.$reset();
    },

    deleteFilter(filterId: string) {
      const pageStore = usePageStore();
      this.filters = this.filters.filter((item) => {
        return item.criteriaId !== filterId;
      });
      pageStore.$reset();
    },
    changeOnlyExist() {
      const pageStore = usePageStore();
      this.onlyExist = !this.onlyExist;
      pageStore.$reset();
    },
    reset() {
      const pageStore = usePageStore();
      this.filters = [];
      this.onlyExist = false;
      pageStore.$reset();
    },
  },
});

export default useFilterStore;
