import { defineStore } from "pinia";
import { PageType } from "../types/interfaces";

const usePageStore = defineStore("currentPage", {
  state: () => ({
    numberOfPage: 1 as number,
    numberOfProductsInPage: 9 as number,
    stepNum: 3 as number,
    pageData: {
      currentPage: 1,
      startIndex: 0,
      endIndex: 3 - 1,
    } as PageType,
  }),
  getters: {},

  actions: {
    setPage(p: PageType) {
      this.pageData.currentPage = p.currentPage;
      this.pageData.startIndex = p.startIndex;
      this.pageData.endIndex = p.endIndex;
    },

    setCurrentPage(curPage: number) {
      this.pageData.currentPage = curPage;
    },

    updateAllPageData(curPage: number, startIdx: number, endIdx: number) {
      this.pageData.currentPage = curPage;
      this.pageData.startIndex = startIdx;
      this.pageData.endIndex = endIdx;
    },

    setNumberOfPage(val: number) {
      this.numberOfPage = val;
    },
    setNumberOfProductsInPage(val: number) {
      this.numberOfProductsInPage = val;
    },
    resetPageData() {
      this.pageData.currentPage = 1;
      this.pageData.startIndex = 0;
      this.pageData.endIndex = 3 - 1;
    },
  },
});

export default usePageStore;
