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

export interface FilterListCheckbox {
  name: string;
  presentation: string;
  id: string;
  open: boolean;
}

export interface SelectedFilterItemType {
  name: string;
  type: string;
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

  firstRefresh: boolean;
}

export interface PathObjectType {
  fillterSort: string;
  page: number;
  cart: string;
}

export interface PageType {
  currentPage: number;
  startIndex: number;
  endIndex: number;
}

export interface UpdatePathParams {
  sortField: SortType;
  filters: FilterItemType[];
  onlyExist: boolean;
  currentPage: number;
  startIndex: number;
  endIndex: number;
}

export interface AllFiltersType {
  filters: FilterItemType[];
  onlyExist: boolean;
}
