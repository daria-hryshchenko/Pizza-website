import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  POPULARITY = 'popularity',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

interface FilterSliceStateI {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortType: Sort;
}

const initialState: FilterSliceStateI = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: 'Popularity',
    sortProperty: SortPropertyEnum.POPULARITY,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortType: (state, action: PayloadAction<Sort>) => {
      state.sortType = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceStateI>) => {
      state.currentPage = Number(action.payload.currentPage);
      state.sortType = action.payload.sortType;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const selectSort = (state: RootState) => state.filter.sortType;

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
