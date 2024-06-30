import React, { useState } from 'react';

function PaginationClassic({}) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalItems = 50;

  const nextPage = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const previousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  // Calculate the range of items displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <span className={`btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500 ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`} onClick={previousPage}>&lt;- Previous</span>
          </li>
          <li className="ml-3 first:ml-0">
            <span className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500" onClick={nextPage}>Next -&gt;</span>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
        Showing <span className="font-medium text-slate-600 dark:text-slate-300">{startIndex}</span> to <span className="font-medium text-slate-600 dark:text-slate-300">{endIndex}</span> of <span className="font-medium text-slate-600 dark:text-slate-300">{totalItems}</span> results
      </div>
    </div>
  );
}

export default PaginationClassic;
