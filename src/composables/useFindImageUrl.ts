import { useProductListStore } from "../store/useProductListStore";

export function useFindImageUrl() {
  const productListStore = useProductListStore();
  const findImageUrl = (imageId: string) => {
    if (imageId === null || imageId === undefined) {
      return "";
    }

    const resultItem = productListStore.includedFetched.filter((item) => {
      return item.id === imageId;
    });

    if (resultItem.length === 0) {
      return "";
    } else {
      return resultItem[0].attributes.original_url;
    }
  };

  return { findImageUrl };
}
