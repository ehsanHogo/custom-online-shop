import { defineStore } from "pinia";
import { FilterItemType } from "../types/interfaces";
import { useUpdateAllPageData } from "../composables/useUpdatePageData";

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
      const { resetPageData } = useUpdateAllPageData();
      resetPageData();
    },

    deleteFilter(filterId: string) {
      this.filters = this.filters.filter((item) => {
        return item.criteriaId !== filterId;
      });
      const { resetPageData } = useUpdateAllPageData();
      resetPageData();
    },
    changeOnlyExist() {
      this.onlyExist = !this.onlyExist;
      const { resetPageData } = useUpdateAllPageData();
      resetPageData();
    },
    reset() {
      this.filters = [];
      this.onlyExist = false;
      const { resetPageData } = useUpdateAllPageData();
      resetPageData();
    },
  },
});

export default useFilterStore;
