import qs from "qs";
import { useRoute } from "vue-router";
import {
  AllFiltersType,
  FiltersQueryType,
  SortType,
} from "../types/interfaces";
import useFilterStore from "../store/useFilterStore";
import usePageStore from "../store/usePageData";
import useSortStore from "../store/useSortStore";

export function useInitializeStores() {
  const route = useRoute();
  const filterStore = useFilterStore();
  const pageStore = usePageStore();
  const sortStore = useSortStore();




  const initializeStores = () => {
    const query = qs.parse(route.query as unknown as string);

    const filterSortParam = query["fillterSort"];
    const pageParam = query["page"];

    handleFiltersAndSorting(filterSortParam);
    handlePagination(pageParam);



  };

  const handleFiltersAndSorting = (filterSortParam: any) => {
    const filterSortObj =
      filterSortParam && typeof filterSortParam === "string"
        ? (qs.parse(filterSortParam) as unknown as FiltersQueryType)
        : ({} as FiltersQueryType);

    if (filterSortObj && Object.keys(filterSortObj).length !== 0) {
      if (
        filterSortObj.filters &&
        Array.isArray(filterSortObj.filters) &&
        (filterSortObj.filters[0] as unknown) === ""
      ) {
        filterSortObj.filters = [];
      }

      filterSortObj.onlyExist =
        (filterSortObj.onlyExist as unknown) === "false" ? false : true;

      //   allFilter.value.filters = filterSortObj.filters;
      filterStore.setAllFilter({
        filters: filterSortObj.filters,
        onlyExist: filterSortObj.onlyExist,
      });
      //   allFilter.value.onlyExist = filterSortObj.onlyExist;

      sortStore.updateSortField(filterSortObj.sortField as SortType);
    } else {
      filterStore.$reset();
      sortStore.$reset();
    }
  };

  const handlePagination = (pageParam: any) => {
    const pageObj =
      pageParam && typeof pageParam === "string" ? qs.parse(pageParam) : {};

    if (pageObj.currentPage && pageObj.startIndex && pageObj.endIndex) {
      pageStore.updateAllPageData(
        +pageObj.currentPage,
        +pageObj.startIndex,
        +pageObj.endIndex
      );
    } else {
      pageStore.resetPageData();
    }
  };

  return { initializeStores };
}
