import React, { useState, useEffect } from 'react';

import { Categories } from '../../components/Categories/Categories';
import { PizzaItem } from '../../components/PizzaItem/PizzaItem';
import { Sort } from '../../components/Sort/Sort';
import SkeletonPizzaItem from '../../components/PizzaItem/SkeletonPizzaItem';

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://654917a7dd8ebcd4ab242c38.mockapi.io/pizza/pizza')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
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
