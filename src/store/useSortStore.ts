import { defineStore } from "pinia";
import { SortType } from "../types/interfaces";

interface State {
  sortField: SortType;
}

 const useSortStore = defineStore("sortField", {
  state: (): State => ({
    sortField: "none",
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
  },
});


export default useSortStore