import React, { useState } from 'react';
import './scss/App.scss';
import { Header } from './components/Header/Header';
import { Categories } from './components/Categories/Categories';
import pizzas from './assets/data/db.json';
import { PizzaItem } from './components/PizzaItem/PizzaItem';
import { Sort } from './components/Sort/Sort';

function App() {
  const [items, setItems] = useState([]);
  fetch('https://654917a7dd8ebcd4ab242c38.mockapi.io/pizza/pizza')
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data));
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">
          {items.map((pizza) => (
            <PizzaItem pizza={pizza} key={pizza.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
