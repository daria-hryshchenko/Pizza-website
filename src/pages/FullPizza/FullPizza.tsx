import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface PizzaI {
  imageUrl: string;
  title: string;
  price: number;
}

export const FullPizza: React.FC = () => {
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
    return <div>'Loading...'</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} $</h4>
    </div>
  );
};

export default FullPizza;
