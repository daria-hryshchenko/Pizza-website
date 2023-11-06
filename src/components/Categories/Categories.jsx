import React, { useState } from 'react';

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

export const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onChangeCategory = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={activeIndex === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
