import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  items: any[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<any>) => {
      const exists = state.items.find(item => (item.id || item._id) === (action.payload.id || action.payload._id));
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => (item.id || item._id) !== action.payload);
    },
    toggleWishlist: (state, action: PayloadAction<any>) => {
      const productId = action.payload.id || action.payload._id;
      const index = state.items.findIndex(item => (item.id || item._id) === productId);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
