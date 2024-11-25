import { storeToRefs } from "pinia";
import { useFetchData } from "./useFetchData";
import { useUpdatePath } from "./useUpdatePath";
import usePageStore from "../store/usePageData";
import useFilterStore from "../store/useFilterStore";
import useSortStore from "../store/useSortStore";

export function useHandleStoreUpdate() {
  const { updatePath } = useUpdatePath();
  const { fetchData } = useFetchData();
  const sortStore = useSortStore();
  const { sortField } = storeToRefs(sortStore);
  //filter store
  const filterStore = useFilterStore();
  const { allFilter } = storeToRefs(filterStore);
  //page store
  const pageStore = usePageStore();
  const { pageData } = storeToRefs(pageStore);
  // product list store

  const ProductPath = "/custom-online-shop/";
  const handleStoreUpdate = () => {
    updatePath(ProductPath, {
      sortField: sortField.value,
      filters: allFilter.value.filters,
      onlyExist: allFilter.value.onlyExist,
      currentPage: pageData.value.currentPage,
      startIndex: pageData.value.startIndex,
      endIndex: pageData.value.endIndex,
    });
    fetchData({
      allFilter: allFilter.value,
      sortField: sortField.value,
      pageData: pageData.value,
    });
  };

  return { handleStoreUpdate };
}
