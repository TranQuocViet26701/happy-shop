import { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';

export const cartItemsSelector = (state: RootState) => state.cart.cartItems;

export const cartItemsCountSelector = createSelector(
  cartItemsSelector,
  (cartItems) => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }
);

export const cartTotalSelector = createSelector(
  cartItemsSelector,
  (cartItems) =>
    cartItems.reduce(
      (total, item) => total + item.quantity * item.product.salePrice,
      0
    )
);
