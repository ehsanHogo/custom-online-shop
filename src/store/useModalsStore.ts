import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modals", {
  state: () => ({
    cattegoriesModal: false,
    sortModal: false,
    filterModal: false,
    selectedSort: "پرفروش ترین" as string,
  }),

  actions: {
    toggleCattegoriesModal() {
      this.cattegoriesModal = !this.cattegoriesModal;
    },
    toggleSortModal() {
      this.sortModal = !this.sortModal;
    },
    setSelectedSort(val: string) {
      this.selectedSort = val;
    },
    toggleFilterModal() {
      this.filterModal = !this.filterModal;
    },
  },
});
