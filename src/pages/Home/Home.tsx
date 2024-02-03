import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage } from '../../redux/slices/filterSlice';
import { Categories } from '../../components/Categories/Categories';
import { PizzaItem } from '../../components/PizzaItem/PizzaItem';
import { SortPopup, sortList } from '../../components/Sort/SortPopup';
import SkeletonPizzaItem from '../../components/PizzaItem/SkeletonPizzaItem';
import Pagination from '../../components/Pagination/Pagination';

import { fetchPizzas, selectPizzaData } from '../../redux/slices/pizzaSlice';
import { NotFoundBlock } from '../../components/NotFoundBlock/NotFoundBlock';
import { useAppDispatch } from '../../redux/store';

// export const Home: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const isSearch = useRef(false);
//   const isMounted = useRef(false);

//   const { sortType, categoryId, currentPage, searchValue } = useSelector(selectFilter);
//   const { items, status } = useSelector(selectPizzaData);

//   const onClickCategory = useCallback((id: number) => {
//     dispatch(setCategoryId(id));
//   }, []);

//   const onChangePage = (number: number) => {
//     dispatch(setCurrentPage(number));
//   };

//   const getPizzas = async () => {
//     const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
//     const sortBy = sortType.sortProperty.replace('-', '');
//     const category = categoryId > 0 ? `category=${categoryId}` : '';

//     dispatch(
//       fetchPizzas({
//         order,
//         sortBy,
//         category,
//         currentPage: String(currentPage),
//       }),
//     );
//     window.scrollTo(0, 0);
//   };

//   // useEffect(() => {
//   //   if (window.location.search) {
//   //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
//   //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
//   //     // if (sort) {
//   //     //   params.sortBy = sort;
//   //     // }
//   //     dispatch(
//   //       setFilters({
//   //         searchValue: params.order,
//   //         categoryId: Number(params.category),
//   //         currentPage: Number(params.currentPage),
//   //         sortType: sortType || sortList[0],
//   //       }),
//   //     );
//   //     isSearch.current = true;
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   window.scrollTo(0, 0);
//   //   if (!isSearch.current) {
//   //     getPizzas();
//   //   }
//   //   isSearch.current = false;
//   // }, [categoryId, sortType, currentPage, searchValue]);
//   useEffect(() => {
//     getPizzas();
//   }, [categoryId, sortType, currentPage, searchValue]);

//   // useEffect(() => {
//   //   if (isMounted.current) {
//   //     const queryString = qs.stringify({
//   //       sortProperty: sortType.sortProperty,
//   //       categoryId,
//   //       currentPage,
//   //     });
//   //     navigate(`?${queryString}`);
//   //   }
//   //   isMounted.current = true;

//   //   // if(!window.location.search){
//   //   //   dispatch(fetchPizzas({} as SearchPizzaParams))
//   //   // }
//   // }, [categoryId, sortType, currentPage, searchValue]);

//   const pizzas = items
//     // .filter((obj: any) => {
//     //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
//     //     return true;
//     //   }
//     //   return false;
//     // })

//     // .map((pizza: any) => (
//     //   <Link key={pizza.id} to={`/pizza/${pizza.id}`}>
//     //     <PizzaItem {...pizza} />
//     //   </Link>
//     // ));
//     .map((pizza: any) => <PizzaItem key={pizza.id} {...pizza} />);

//   return (
//     <div className="wrap">
//       <div className="content__top">
//         <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
//         <SortPopup sortType={sortType} />
//       </div>
//       <h2 className="content__title">All pizzas</h2>
//       {status === 'error' ? (
//         <div className="content__error-info">
//           <h2>
//             Something wrong <span>😕</span>
//           </h2>
//         </div>
//       ) : (
//         <div className="content__items">{pizzas}</div>
//       )}
//       <div className="content__items">
//         {status === 'loading'
//           ? [...new Array(9)].map((_, index) => <SkeletonPizzaItem key={index} />)
//           : pizzas}
//         {pizzas.length === 0 ? <NotFoundBlock /> : pizzas}
//       </div>
//       <Pagination currentPage={currentPage} onChangePage={onChangePage} />
//     </div>
//   );
// };
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

  const pizzas = items.map((pizza: any) => <PizzaItem key={pizza.id} {...pizza} />);

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
      {/* {pizzas.length === 0 ? <NotFoundBlock /> : pizzas} */}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
