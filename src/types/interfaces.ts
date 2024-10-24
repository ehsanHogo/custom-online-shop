import { Ref } from "vue";

export type SortType =
  | "price-cheap"
  | "price-expensive"
  | "new-created"
  | "none";
export interface DataFetchType {
  // page: number;
  // data: {
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
  // };
}

// export interface DataFetchInPageType {
//   page: number;
//   data: [
//     {
//       attributes: {
//         name: string;
//         slug: string;
//         description: string;
//         display_price: string;
//       };
//       relationships: {
//         images: {
//           data: { id: string; type: string }[];
//         };
//       };
//     }
//   ];
// }

export interface IncludedFetchType {
  attributes: {
    original_url: string;
  };
  id: string;
}

export interface FilterItem {
  name: string;
  presentation: string;
  id: string;
}

export interface FilterType {
  name: string;
  option_values: FilterItem[];
}

export interface FilterItemOptions {
  name: string;
  open: Ref<boolean>;
}

export interface FilterCriteriaType {
  criteriaName: string;
  criteriaType: string;
  criteriaId: string;
  data: DataFetchType[];
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
