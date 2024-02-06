import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { count } from 'console';

export type CartItem = {
  tabKey: string;
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceStateI {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceStateI = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.price === action.payload.price &&
          obj.size === action.payload.size,
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return +(sum = Number(obj.price * obj.count));
      }, 0);
    },
    minusItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.price === action.payload.price &&
          obj.size === action.payload.size,
      );
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.price === action.payload.price &&
          obj.size === action.payload.size,
      );

      if (findItem) {
        let indexPizzaRemove = state.items.indexOf(findItem);
        state.items.splice(indexPizzaRemove, 1);
      }
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
