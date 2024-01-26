import React from 'react';

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy'];

interface CategoriesPropsI {
  categoryId: number;
  onClickCategory: (index: number) => void;
}

export const Categories: React.FC<CategoriesPropsI> = ({ categoryId, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={categoryId === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
