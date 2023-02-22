import { CartItem, PropType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartState = {
  isShowMiniCart: boolean;
  cartItems: CartItem[];
};

const initialState: CartState = {
  isShowMiniCart: false,
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') as string)
    : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showMiniCart: (state) => {
      state.isShowMiniCart = true;
    },

    hideMiniCart: (state) => {
      state.isShowMiniCart = false;
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      const index = state.cartItems.findIndex((item) => item.id === newItem.id);

      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    setQuantity: (state, action: PayloadAction<Omit<CartItem, 'product'>>) => {
      const { id, quantity } = action.payload;

      const index = state.cartItems.findIndex((item) => item.id === id);

      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    removeFromCart: (
      state,
      action: PayloadAction<PropType<CartItem, 'id'>>
    ) => {
      const idNeedToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== idNeedToRemove
      );
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    removeCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const {
  showMiniCart,
  hideMiniCart,
  addToCart,
  setQuantity,
  removeFromCart,
  removeCart,
} = cartSlice.actions;
export default cartSlice.reducer;
