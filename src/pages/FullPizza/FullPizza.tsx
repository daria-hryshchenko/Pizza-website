import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../scss/App.scss';
import { PizzaItem } from '../../components/PizzaItem/PizzaItem';

interface PizzaI {
  imageUrl: string;
  title: string;
  price: number;
  description: string;
  key: number;
}

export const FullPizza: React.FC = (key) => {
  const [pizza, setPizza] = useState<PizzaI | undefined>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get<PizzaI>(
          'https://654917a7dd8ebcd4ab242c38.mockapi.io/pizza/pizza/' + id,
        );
        setPizza(data);
      } catch (error) {
        alert('Not Found Pizza');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="pizza">
      <div className="pizza__button">
        <Link to="/">
          <button className="button button--outline button--add">
            <span>Назад</span>
          </button>
        </Link>
      </div>
      <div className="pizza__wrap">
        <img src={pizza.imageUrl} className="pizza__img" />
        <ul className="pizza__details">
          <li>
            <h2>{pizza.title}</h2>
          </li>
          <li>
            <h4>{pizza.price} $</h4>
          </li>
          <li>
            <p>{pizza.description}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FullPizza;
