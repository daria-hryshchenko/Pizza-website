import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage } from '../../redux/slices/filterSlice';
import { Categories } from '../../components/Categories/Categories';
import { PizzaItem } from '../../components/PizzaItem/PizzaItem';
import { SortPopup, sortList } from '../../components/Sort/SortPopup';
import SkeletonPizzaItem from '../../components/PizzaItem/SkeletonPizzaItem';
import Pagination from '../../components/Pagination/Pagination';

import { fetchPizzas, selectPizzaData } from '../../redux/slices/pizzaSlice';
import { useAppDispatch } from '../../redux/store';
import uniqid from 'uniqid';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const { sortType, categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        searchValue,
        currentPage: String(currentPage),
      }),
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType.sortProperty, currentPage, searchValue]);

  const pizzas = items.map((pizza: any) => (
    <PizzaItem key={pizza.id} tabKey={uniqid()} {...pizza} />
  ));

  const skeletonPizzas = [...new Array(4)].map((_, index) => <SkeletonPizzaItem key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <SortPopup sortType={sortType} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Something wrong <span>😕</span>
          </h2>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletonPizzas : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
