import { Ref } from "vue";

export type SortType =
  | "price-cheap"
  | "price-expensive"
  | "new-created"
  | "none";
export interface DataFetchType {
  id: string;
  attributes: {
    name: string;
    slug: string;
    description: string;
    display_price: string;
  };
  relationships: {
    images: {
      data: { id: string; type: string }[];
    };
  };
}

export interface IncludedFetchType {
  attributes: {
    original_url: string;
  };
  id: string;
}

export interface FilterItemShowing {
  name: string;
  presentation: string;
  id: string;
}

export interface FilterType {
  name: string;
  option_values: FilterItemShowing[];
}

export interface FilterItemOptions {
  name: string;
  open: boolean;
}

// export interface FilterCriteriaType {
//   criteriaName: string;
//   criteriaType: string;
//   criteriaId: string;
//   data: DataFetchType[];
// }

export interface FilterItemType {
  filterType: string;
  filterCriteria: string;
  criteriaId: string;
}

export interface QueryType {
  include: {
    images: string;
  };
  sort: {
    priceDec: string;
    priceAsc: string;
    createdAsc: string;
  };

  splitQuery: string;
}

export interface FiltersQueryType {
  filters: FilterItemType[];
  onlyExist: boolean;

  sortField: SortType;
}

export interface ShoppingProductType {
  name: string;
  image: string;
  price: string;
  count: number;
  id: string;
}

export interface ShoppingCartListType {
  products: ShoppingProductType[];

  firstRefresh : boolean
}
