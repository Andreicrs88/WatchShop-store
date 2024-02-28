import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  cartItems: [],
  totalAmount: 0, // total price of cart items
  totalQuantity: 0, // total number of items in the cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initalState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      // if the item is not in the array, it is added
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          imageSrc: newItem.imageSrc,
          category: newItem.category,
          title: newItem.title,
          modelCode: newItem.modelCode,
          availability: "In stock",
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
        //  if the item is already in the array,  quantity and totalPrice propesties are updated
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      state.totalAmount += newItem.price;
    },

    removeItemFromCart(state, action) {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === itemId);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        // if the cart item has a quantity of 1, it is removed from the cart
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      } else {
        // if the cart item has a quantity greater than 1, the item quantity decreases by 1
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      state.totalAmount -= existingItem.price;
    },

    // clearing the cart after an order has been placed
    emptyCart(state) {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
