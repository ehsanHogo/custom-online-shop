import { useRouter } from "vue-router";
import qs from "qs";
import {
  FiltersQueryType,
  PageType,
  UpdatePathParams,
} from "../types/interfaces";

export function useUpdatePath() {
  const router = useRouter();

  const updatePath = (path: string, params: UpdatePathParams) => {
    const obj = {
      fillterSort: qs.stringify(
        {
          filters: params.filters,
          onlyExist: params.onlyExist,
          sortField: params.sortField,
        } as FiltersQueryType,
        {
          allowEmptyArrays: true,
        }
      ),
      page: qs.stringify({
        currentPage: params.currentPage,
        startIndex: params.startIndex,
        endIndex: params.endIndex,
      } as PageType),
    };

    router.push({
      path: path,
      query: obj,
    });
  };

  return {
    updatePath,
  };
}
