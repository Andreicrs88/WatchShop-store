import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritesItems: [],
  totalQuantity: 0,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialState,
  reducers: {
    addToFavorites(state, action) {
      const newItem = action.payload;
      const existingItem = state.favoritesItems.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.favoritesItems.push({
          id: newItem.id,
          imageSrc: newItem.imageSrc,
          category: newItem.category,
          title: newItem.title,
          modelCode: newItem.modelCode,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
        state.totalQuantity++;
      } else {
        return;
      }
    },
    removeFromFavorites(state, action) {
      const itemId = action.payload.id;
      const existingItem = state.favoritesItems.find((item) => item.id === itemId);

      if (existingItem) {
        state.favoritesItems = state.favoritesItems.filter((item) => item.id !== itemId);
        state.totalQuantity--;
      }
    },  
  },
});

export const favoritesActions = favoritesSlice.actions;

export default favoritesSlice;

