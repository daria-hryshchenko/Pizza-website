import React, { useState, useEffect } from 'react';

import { Categories } from '../../components/Categories/Categories';
import { PizzaItem } from '../../components/PizzaItem/PizzaItem';
import { Sort } from '../../components/Sort/Sort';
import SkeletonPizzaItem from '../../components/PizzaItem/SkeletonPizzaItem';

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'Popularity', sortProperty: 'popularity' });

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    fetch(
      `https://654917a7dd8ebcd4ab242c38.mockapi.io/pizza/pizza?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort sortType={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, index) => <SkeletonPizzaItem key={index} />)
          : items.map((pizza) => <PizzaItem key={pizza.id} pizza={pizza} />)}
      </div>
    </>
  );
};
