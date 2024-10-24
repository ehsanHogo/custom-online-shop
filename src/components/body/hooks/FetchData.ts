import { ref } from "vue";
import { DataFetchType, FilterCriteriaType, FilterItemType, FilterType, IncludedFetchType, SortType } from "../../../types/interfaces";

const filteredfetchData = ref<DataFetchType[]>([]);

const loading = ref(true);
const dataFetched = ref<DataFetchType[]>([]);
const ShowData = ref<DataFetchType[]>([]);

const includedFetched = ref<IncludedFetchType[]>([]);

const filterCriterias = ref<FilterCriteriaType[]>([]);

const haveNewItems = ref(false);
const filters = ref<FilterType[]>([]);
const fetchData = async (
    sort: SortType,
    filter: FilterItemType,
    nextPage: number
  ) => {
    loading.value = true;
  
    console.log(nextPage);
  
    let query = "";
  
    if (nextPage === 1) {
      query = "https://demo.spreecommerce.org/api/v2/storefront/products?";
    } else {
      query = `https://demo.spreecommerce.org/api/v2/storefront/products?page=${nextPage}&`;
    }
    if (sort === "none") {
      query += "include=images";
    } else if (sort === "price-cheap") {
      query += "sort=price&include=images";
    } else if (sort === "price-expensive") {
      query += "sort=-price&include=images";
    } else if (sort === "new-created") {
      query += "sort=-created_at&include=images";
    }
  
    if (filter.filterType !== "none") {
      query += `&filter[options][${filter.filterType}]=${filter.filterCriteria}`;
      // console.log(query);
    } else if (filterCriterias.value.length !== 0) {
      filterCriterias.value.forEach((item) => {
        query += `&filter[options][${item.criteriaType}]=${item.criteriaName}`;
      });
    }
    try {
      const res = await fetch(`${query}`, { method: "GET" });
      const response = await res.json();
  
      if (!res.ok) {
        throw Error("error in fetch");
      } else {
        if (response.data.length === 0) {
          console.log("hereee");
  
          haveNewItems.value = false;
        } else {
          haveNewItems.value = true;
        }
        if (filter.filterType !== "none") {
          console.log(response.data);
  
          filters.value = response.meta.filters.option_types;
          filterCriterias.value.push({
            criteriaName: filter.filterCriteria,
            criteriaType: filter.filterType,
            criteriaId: filter.criteriaId,
            data: response.data,
          });
  
          includedFetched.value = includedFetched.value.concat(response.included);
  
          filteredfetchData.value = filteredfetchData.value.concat(response.data);
  
          ShowData.value = filteredfetchData.value;
        } else {
          filters.value = response.meta.filters.option_types;
  
          includedFetched.value = includedFetched.value.concat(response.included);
  
          dataFetched.value = dataFetched.value.concat(response.data);
  
          ShowData.value = ShowData.value.concat(response.data);
        }
  
        loading.value = false;
      }
    } catch (e) {
      console.log(e);
    }
  };
  