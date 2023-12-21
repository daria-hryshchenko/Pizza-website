import React from 'react';
import ReactPaginate from 'react-paginate';
import '../../scss/components/_pagination.scss';

const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      className="pagination"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
