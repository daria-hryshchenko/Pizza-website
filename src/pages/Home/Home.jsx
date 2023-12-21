import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCategoryId, setCurrentPage } from '../../redux/slices/filterSlice';
import { Categories } from '../../components/Categories/Categories';
import { PizzaItem } from '../../components/PizzaItem/PizzaItem';
import { Sort } from '../../components/Sort/Sort';
import SkeletonPizzaItem from '../../components/PizzaItem/SkeletonPizzaItem';
import Pagination from '../../components/Pagination/Pagination';
import { SeachContext } from '../../App';

export const Home = () => {
  const dispatch = useDispatch();
  const { sortType, categoryId, currentPage } = useSelector((state) => state.filter);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SeachContext);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    axios
      .get(
        `https://654917a7dd8ebcd4ab242c38.mockapi.io/pizza/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage, searchValue]);
  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((pizza) => <PizzaItem key={pizza.id} pizza={pizza} />);

  return (
    <div className="wrap">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, index) => <SkeletonPizzaItem key={index} />)
          : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
