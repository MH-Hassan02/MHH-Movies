import React from "react";
import { Link } from "react-router-dom";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const handlePageChange = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pagination">
      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            to={`?page=${page}`}
            className={`page-number ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
