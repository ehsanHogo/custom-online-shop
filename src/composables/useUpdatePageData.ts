import usePageStore from "../store/usePageData";

export const useUpdateAllPageData = () => {
  const pageStore = usePageStore();

  const updateAllPageData = (
    curPage: number,
    startIdx: number,
    endIdx: number
  ) => {
    pageStore.setPage({
      currentPage: curPage,
      startIndex: startIdx,
      endIndex: endIdx,
    });
  };

  const updateCurrentPageData = (currPage: number) => {
    pageStore.setCurrentPage(currPage);
  };


  const resetPageData = () =>{
    pageStore.$reset();
  }

  return {
    updateAllPageData,
    updateCurrentPageData,
    resetPageData
  };
};
