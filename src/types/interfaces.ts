import { Ref } from "vue";

export type SortType =
  | "price-cheap"
  | "price-expensive"
  | "new-created"
  | "none";
export interface DataFetchType {
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

export interface FilterItem {
  name: string;
  presentation: string;
}

export interface FilterType {
  name: string;
  option_values: FilterItem[];
}

export interface FilterItemOptions {
  name: string;
  open: Ref<boolean>;
}
