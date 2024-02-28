import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFilters: [],  
  selectedSort: "",
};

const filteredItemsSlice = createSlice({
  name: "filteredItems",
  initialState: initialState,
  reducers: {  
    setSelectedFilters(state, action) { 
      const newFilterObj = action.payload;
      const existingFilterValue = state.selectedFilters.find((filter) => filter.value === newFilterObj.value);
      const existingFilterCategory = state.selectedFilters.find((filter) => filter.category === newFilterObj.category);
      const existingFilterCategoryIndex = state.selectedFilters.indexOf(existingFilterCategory);

      //  if the filter is already selected, when it's clicked again it is removed from the selectedFilters array
      if (existingFilterValue) {
        state.selectedFilters = state.selectedFilters.filter((filter) => filter.value !== existingFilterValue.value);
        return;
      }

      // if the filter category is not in the selectedFilters array, it's added to the selectedFilters array
      if (!existingFilterCategory) {
        state.selectedFilters.push(newFilterObj);
      } else {
      // if the filter category is in the selectedFilters array, we replace it's value 
      // this way only a filter value per each category can be selected
        state.selectedFilters.splice(existingFilterCategoryIndex, 1, newFilterObj);
      }
    },
    removeSingleFilter(state, action) {
      const existingFilterIndex = state.selectedFilters.findIndex((filter) => filter.value === action.payload);
      state.selectedFilters.splice(existingFilterIndex, 1);
    },
    resetSelectedFilters(state) {
      state.selectedFilters = [];
    },           
    setSortCategory(state, action) {
      state.selectedSort = action.payload;
    },
    resetSort(state) {
      state.selectedSort = "";
    },    
  },
});

export const filteredItemsActions = filteredItemsSlice.actions;

export default filteredItemsSlice;
