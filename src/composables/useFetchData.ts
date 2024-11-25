import { ref } from "vue";
import {
  AllFiltersType,
  FilterItemType,
  FilterType,
  PageType,
} from "../types/interfaces";
import { useProductListStore } from "../store/useProductListStore";
import useFilterStore from "../store/useFilterStore";
import usePageStore from "../store/usePageData";

interface QueryType {
  include: {
    images: string;
  };
  sort: {
    priceAsc: string;
    priceDec: string;
    createdAsc: string;
  };
  splitQuery: string;
}

interface FetchParams {
  pageData: PageType;
  sortField: string;
  allFilter: AllFiltersType;
}

export function useFetchData() {
  //   const loading = ref(false);
  //   const showData = ref([]);
  //   const includedFetched = ref([]);
  //   const filtersType = ref([]);
  //   const numberOfPage = ref(1);

  const productListStore = useProductListStore();
  const filterStore = useFilterStore();
  const pageStore = usePageStore();
  const mainQuery: QueryType = {
    include: {
      images: "include=images",
    },
    sort: {
      priceAsc: "sort=price",
      priceDec: "sort=-price",
      createdAsc: "sort=-created_at",
    },
    splitQuery: "&",
  };

  const fetchData = async ({
    pageData,
    sortField,
    allFilter,
  }: FetchParams): Promise<void> => {
    productListStore.setLoading(true);

    let baseQuery = `https://demo.spreecommerce.org/api/v2/storefront/products?per_page=${pageStore.numberOfProductsInPage}&include=images`;

    if (pageData.currentPage !== 1) {
      baseQuery += `&page=${pageData.currentPage}`;
    }

    if (sortField === "none") {
    } else if (sortField === "price-cheap") {
      baseQuery += mainQuery.splitQuery + mainQuery.sort.priceAsc;
    } else if (sortField === "price-expensive") {
      baseQuery += mainQuery.splitQuery + mainQuery.sort.priceDec;
    } else if (sortField === "new-created") {
      baseQuery += mainQuery.splitQuery + mainQuery.sort.createdAsc;
    }

    if (allFilter.filters.length !== 0) {
      allFilter.filters.forEach((item) => {
        baseQuery += `&filter[options][${item.filterType}]=${item.filterCriteria}`;
      });
    }

    if (allFilter.onlyExist) {
      baseQuery += `&filter[in_stock]=true`;
    }

    try {
      const res = await fetch(`${baseQuery}`, { method: "GET" });
      const response = await res.json();

      if (!res.ok) {
        throw Error("error in fetch");
      } else {
        // filtersType.value = response.meta.filters.option_types;
        filterStore.setFilterType(response.meta.filters.option_types);
        productListStore.setIncludedFetched(response.included);
        //   includedFetched.value = response.included;
        productListStore.setShowData(response.data);
        //   showData.value = response.data;

        // numberOfPage.value = response.meta.total_pages;
        pageStore.setNumberOfPage(response.meta.total_pages);

        // productListStore.setLoading(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      productListStore.loading = false;
    }
  };

  return {
    fetchData,
  };
}
