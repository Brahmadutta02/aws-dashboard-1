import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';
import SearchForm from '../../partials/actions/SearchForm';
import DropdownTransaction from '../../components/DropdownTransaction';
import TransactionsTable from '../../partials/finance/CustomersTable';
import PaginationClassic from '../../components/PaginationClassic';

function Transactions() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">

          {/* Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-4 md:mb-2">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Channel URL ✨</h1>
              </div>

              
            </div>

          
            <TransactionsTable selectedItems={handleSelectedItems} />

            

          </div>

        </main>

      </div>

    </div>
  );
}

export default Transactions;