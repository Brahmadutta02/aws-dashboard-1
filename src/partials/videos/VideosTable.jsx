import React, { useState, useEffect } from "react";
import Customer from "./VideosTableItem";

function VideosTable({ selectedItems }) {
  const [customers, setCustomers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  async function fetchData() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("x-api-key", "nQRdfFEoWy3hMcz2Nm1NzaWPu4g7bjZc7QYmjRsL");
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({
        "body": "{\"type\": \"video_processing_status\"}"
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      const response = await fetch("https://6azv1twa20.execute-api.us-east-1.amazonaws.com/prod", requestOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setCustomers(data); 
      
      console.log(data);
  
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        console.log(`Item ${i + 1}:`, item);
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  

  useEffect(() => {
    fetchData();
  }, [selectedItems]);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "nQRdfFEoWy3hMcz2Nm1NzaWPu4g7bjZc7QYmjRsL");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "body": "{\"type\": \"video_comments\", \"video_id\": \"1TRK90KSkFM\"}"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://6azv1twa20.execute-api.us-east-1.amazonaws.com/prod", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        
        console.log(data);
        
        fetchData();
      })
      .catch((error) => {
        console.error(error.message);
      });

    setNewUrl(""); 
};

  const handleRefresh = () => {
    
    fetchData();
  };

  const totalPages = Math.ceil(list.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedList = list.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
      <div className="p-4">
        {/* New URL input */}
        <form onSubmit={handleUrlSubmit} className="flex flex-col md:flex-row justify-end mt-4">
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Enter new URL"
            className="border rounded-l-md px-2 py-1 focus:outline-none mb-2 md:mb-0 md:mr-2"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-1 px-4 rounded-r-md focus:outline-none mb-2 md:mb-0 md:mr-2"
          >
            Submit
          </button>
          {/* Refresh button */}
          <button
            type="button"
            onClick={handleRefresh}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-1 px-4 rounded-md focus:outline-none"
          >
            Refresh
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto">
  <table className="table-auto w-full dark:text-slate-300">
    {/* Table header */}
    <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
      <tr>
        <th className="px-2 py-3 whitespace-nowrap w-px">
          <span className="sr-only"></span>
        </th>
        <th className="px-4 py-3 whitespace-nowrap">Title</th>
        <th className="px-4 py-3 whitespace-nowrap">Id</th>
        <th className="px-4 py-3 whitespace-nowrap">Insert Date</th>
        <th className="px-4 py-3 whitespace-nowrap">Update Date</th>
        <th className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center justify-between">
            <span>Status</span>
            <div className="dropdown ml-2 relative">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen ? "true" : "false"}
              >
                <span className="text-indigo-500">&#9660;</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 right-0 w-40 bg-white dark:bg-slate-700 rounded shadow-lg">
                  <label className="block flex text-xs py-2 px-4">
                    <input type="checkbox" value="Failed" className="mr-2" />
                    Failed
                  </label>
                  <label className="block flex text-xs py-2 px-4">
                    <input type="checkbox" value="Processed" className="mr-2" />
                    Processed
                  </label>
                  <label className="block flex text-xs py-2 px-4">
                    <input type="checkbox" value="In Queue" className="mr-2" />
                    In Queue
                  </label>
                </div>
              )}
            </div>
          </div>
        </th>
      </tr>
    </thead>
    {/* Table body */}
    <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
      {paginatedList.map((customer) => {
        console.log(customer); 
        return (
          <Customer
            key={customer.id}
            id={customer.video_id}
            name={customer.title}
            insert_date={customer.insert_time}
            update_date={customer.update_time}
            status={customer.status}
          />
        );
      })}
    </tbody>
  </table>
</div>

      </div>
      <div className="flex justify-between items-center p-4">
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        {/* <span>
          Page {currentPage} of {totalPages}
        </span> */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default VideosTable;
