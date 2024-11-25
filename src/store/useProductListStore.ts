import { defineStore } from "pinia";
import { DataFetchType, IncludedFetchType } from "../types/interfaces";

export const useProductListStore = defineStore("productList", {
  // State
  state: () => ({
    showData: [] as DataFetchType[],
    includedFetched: [] as IncludedFetchType[],
    loading: false as Boolean,
  }),

  // Getters (optional)
  getters: {
    totalProducts(state) {
      return state.showData.length;
    },
    includedDataCount(state) {
      return state.includedFetched.length;
    },
  },

  // Actions
  actions: {
    // Setters
    setShowData(data: DataFetchType[]) {
      this.showData = data;
    },
    setIncludedFetched(data: IncludedFetchType[]) {
      this.includedFetched = data;
    },

    setLoading(val: boolean) {
      this.loading = val;
    },
    // Resetters
    resetShowData() {
      this.showData = [];
    },
    resetIncludedFetched() {
      this.includedFetched = [];
    },
  },
});
