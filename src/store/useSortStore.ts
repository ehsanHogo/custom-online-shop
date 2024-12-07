import { defineStore } from "pinia";
import { SortType } from "../types/interfaces";

interface State {
  sortField: SortType;
  sortName: string;
}

const useSortStore = defineStore("sortField", {
  state: (): State => ({
    sortField: "none",
    sortName: "پرفروش ترین" as string,
  }),
  getters: {
    getSortField: (state) => {
      state.sortField;
    },
  },

  actions: {
    updateSortField(newSortField: SortType) {
      this.sortField = newSortField;
    },

    updateSortName(val: string) {
      this.sortName = val;
    },
  },
});

export default useSortStore;
