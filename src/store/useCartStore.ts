import { defineStore } from "pinia";
import { ShoppingCartListType, ShoppingProductType } from "../types/interfaces";

const useCartStore = defineStore("cart", {
  state: (): ShoppingCartListType => ({
    products: JSON.parse(localStorage.getItem("cart") || "[]"),
    firstRefresh: true,
  }),
  getters: {
    getCountById: (state) => {
      return (productId: string) =>
        state.products.find((product) => product.id === productId)?.count || 0;
    },
  },

  actions: {
    updateProductsById(pId: string, pCount: number) {
      const resultIndex = this.products.findIndex((item) => item.id === pId);

      if (pCount === 0) {
        this.products.splice(resultIndex, 1);
      } else {
        this.products[resultIndex].count = pCount;
      }

      this.saveToLocalStorage();
    },

    addProduct(p: ShoppingProductType) {
      this.products.push(p);
      this.saveToLocalStorage();
    },

    setProducts(p: ShoppingProductType[]) {
      this.products = p;
      this.saveToLocalStorage();
    },

    setFirstrefresh(f: boolean) {
      this.firstRefresh = f;
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.products));
    },
  },
});

export default useCartStore;
