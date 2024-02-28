import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activePage: 1,
  pageNumberLimit: 3, // display just 3 pages buttons, not all of them
  maxPageNumberLimit: 3, // must be equal to pageNumberLimit
  minPageNumberLimit: 0,
};

const activePageSlice = createSlice({
  name: "activePage",
  initialState: initialState,
  reducers: {
    setActivePage(state, action) {
      state.activePage = action.payload;
    },    
    jumpToFirstPage(state) {
      state.activePage = 1;
      state.minPageNumberLimit = 0;
      state.maxPageNumberLimit = 3;
    },
    moveToPreviousPages(state) {
      state.activePage = state.activePage - 1;

      if ((state.activePage ) % state.pageNumberLimit === 0) {
        state.maxPageNumberLimit = state.maxPageNumberLimit - state.pageNumberLimit;
        state.minPageNumberLimit = state.minPageNumberLimit - state.pageNumberLimit;
      }
    },
    moveToNextPage(state) {
      state.activePage = state.activePage + 1;

      if (state.activePage > state.maxPageNumberLimit) {
        state.maxPageNumberLimit = state.maxPageNumberLimit + state.pageNumberLimit;
        state.minPageNumberLimit = state.minPageNumberLimit + state.pageNumberLimit;
      }
    },
    jumpToLastPage(state, action) {
      state.activePage = action.payload; // total number of pages

      // if last page is 4, 4 % 3 = 1, so we add 2 in order for the maxPageNumberLimit to be 6 (4 + 2)
      // if last page is 5, 5 % 3 = 2, so we add 1 in order for the maxPageNumberLimit to be 6 (5 + 1)
      // if last page is 6, 6 % 3 = 0, so the maxPageNumberLimit  = total number of pages
      if (state.activePage % 3 === 0) {
        state.maxPageNumberLimit = action.payload;
        state.minPageNumberLimit = action.payload - state.pageNumberLimit;
      } else if (state.activePage % 3 === 1) {
        state.maxPageNumberLimit = action.payload + 2;
        state.minPageNumberLimit = (action.payload + 2) - state.pageNumberLimit;
      } else if (state.activePage % 3 === 2) {
        state.maxPageNumberLimit = action.payload + 1;
        state.minPageNumberLimit = (action.payload + 1) - state.pageNumberLimit;
      }
    },
  },
});

export const activePageActions = activePageSlice.actions;

export default activePageSlice;
