import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, sortBy, category, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://654917a7dd8ebcd4ab242c38.mockapi.io/pizza/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
    );
    return data;
  },
);

export type SearchPizzaParams = {
  order: string;
  sortBy: string;
  category: string;
  currentPage: string;
};

type Pizza = {
  id: string;
  title: string;
  type: string[];
  size: number[];
  price: number;
  count: number;
  imageUrl: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceStateI {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceStateI = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
