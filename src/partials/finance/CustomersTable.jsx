import React, { useState, useEffect } from 'react';
import TransactionItem from './TransactionsTableItem';


function TransactionsTable({selectedItems}) {

  const [customers, setTransaction] = useState([]);
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
        const requestOptions = {
          method: "GET",
          headers: {
            accept: "application/json"
          }
        };
        const response = await fetch(
          "http://100.25.131.90:8000/status",
          requestOptions 
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setTransaction(data);
        setList(data);
        console.log(data); // Do something with the response data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    useEffect(() => {
    fetchData();
  }, [selectedItems]); 

  

  // useEffect(() => {
  //   setList(customers);
  // }, [customers]);



  const handleUrlSubmit = (e) => {
    e.preventDefault();
    fetch('http://100.25.131.90:8000/comments/', {
      method: 'POST',
      body: JSON.stringify({
        url: newUrl,
      }),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((data) => {
      // Handle the response data if needed
      console.log(data);
      // After successful POST request, trigger a reload of the table data
      fetchData();
    })
    .catch((err) => {
      console.log(err.message);
    });
    setNewUrl(""); // Reset the input field after submitting
  };
  

  const handleRefresh = () => {
    // Trigger a reload of the table data
    fetchData();
  };


  const totalPages = Math.ceil(list.length / itemsPerPage);

  // Slice the list based on current page and items per page
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
      <div>
        {/* New URL input */}
        <form onSubmit={handleUrlSubmit} className="flex justify-end mt-4" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0px', position:'relative', bottom:'45px', right:'2px' }}>
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Enter new URL"
            className="border rounded-l-md px-2 py-1 focus:outline-none"
          />
          <button
            type="submit"
            className=" bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-1 px-4 rounded-r-md focus:outline-none"
          >
            Submit
          </button>
          {/* Refresh button */}
      <button
        type="button"
        onClick={handleRefresh}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-1 px-4 ml-2 rounded-md focus:outline-none"
      >
        Refresh
      </button>
        </form>
        {/* Table */}
        <div>
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
              <tr className="">
                <th className="px-0 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <span className="sr-only"></span>
                </th>
                <th className="px-20 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  Title
                </th>
                <th className="px-10 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
                  Id
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
                  Insert Date
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
                  Update Date
                </th>
                <th className="px-2 first:pl-5 last:pr-2 py-1 whitespace-nowrap relative">
                <div className="font-semibold text-left flex items-center">
                  <span>Status</span>
                  <div className="dropdown ml-2">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      style={{
                        position: "relative",
                        top: "1px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      }}
                      type="button"
                      onClick={toggleDropdown}
                      aria-haspopup="true"
                      aria-expanded={isDropdownOpen ? "true" : "false"}
                    >
                      <span
                        style={{
                          position: "relative",
                          left: "1px",
                          bottom: "1px",
                          fontSize: "1rem",
                          marginLeft: "4px",
                          color: "bg-white dark:bg-slate-100 border-slate-900",
                        }}
                      >
                        &#9660;
                      </span>
                    </button>
                    {isDropdownOpen && (
                      <div
                        style={{
                          position: "absolute",
                          top: "110%",
                          right: "1px",
                        }}
                      >
                        <div style={{ backgroundColor: "3", position:'relative', bottom:'20px' }}>
                          <label style={{ fontSize: "10px"}}>
                            <input type="checkbox" value="Failed" style={{ marginRight: "5px", transform: "scale(0.8)" }} />
                            Failed
                          </label>
                          <br />
                          <label style={{ fontSize: "10px" }}>
                            <input type="checkbox" value="Processed" style={{ marginRight: "5px", transform: "scale(0.8)" }} />
                            Processed
                          </label>
                          <br />
                          <label style={{ fontSize: "10px"}}>
                            <input type="checkbox" value="In Queue" style={{ marginRight: "5px", transform: "scale(0.8)" }} />
                            In Queue
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
              {paginatedList.map((transaction) => {
                return (
                  <TransactionItem
                    key={transaction.id}
                    id={transaction.video_id}
                    name={transaction.title}
                    insert_date={transaction.insert_time}
                    update_date={transaction.update_time}
                    status={transaction.status}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-0" 
      style={{position:'relative', right: '77px',}}>
      <button
        onClick={previousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 mr-1 bg-indigo-500 text-white rounded-md disabled:opacity-50"
        style={{ position: 'relative', top: '50px', left:'49.5%' }} // Example positioning style
      >
        Previous
      </button>
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:opacity-50"
        style={{ position: 'relative', top: '50px', left:'49.5%' }} // Example positioning style
      >
        Next
      </button>
    </div>
    </div>
  );
}

export default TransactionsTable;
