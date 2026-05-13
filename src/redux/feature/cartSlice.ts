import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: any[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<{ items: any[]; totalItems: number; totalPrice: number }>) => {
      state.items = action.payload.items;
      state.totalItems = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
    },
    updateCartCount: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { setCart, updateCartCount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
