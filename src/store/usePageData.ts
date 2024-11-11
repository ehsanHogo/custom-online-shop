import { defineStore } from "pinia";
import { PageType } from "../types/interfaces";

const usePageStore = defineStore("currentPage", {
  state: (): PageType => ({
    currentPage: 1,
    startIndex: 0,
    endIndex: 2,
  }),
  getters: {},

  actions: {
    setPage(p: PageType) {
      this.currentPage = p.currentPage;
      this.startIndex = p.startIndex;
      this.endIndex = p.endIndex;
    },

    setCurrentPage(curPage: number) {
      this.currentPage = curPage;
    },
  },
});

export default usePageStore;
