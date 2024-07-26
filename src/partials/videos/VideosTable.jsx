import React, { useState, useEffect } from "react";
import Customer from "./VideosTableItem";

function VideosTable({ selectedItems }) {
  const [list, setList] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [commentsData, setCommentsData] = useState(null); // State variable for comments data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedStatuses, setSelectedStatuses] = useState([]); // State variable for selected statuses

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (commentsData) {
      // console.log("Comments Data:", commentsData);
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatuses((prevStatuses) =>
      prevStatuses.includes(status)
        ? prevStatuses.filter((s) => s !== status)
        : [...prevStatuses, status]
    );
  };

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "nQRdfFEoWy3hMcz2Nm1NzaWPu4g7bjZc7QYmjRsL");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      body: '{"type": "video_processing_status"}',
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://6azv1twa20.execute-api.us-east-1.amazonaws.com/prod",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // Parse the JSON string in the body property
        if (result.body) {
          const parsedBody = JSON.parse(result.body);
          // console.log(result.body);
          if (parsedBody.video_data) {
            const videoData = JSON.parse(parsedBody.video_data);
            setList(videoData);
          } else {
            console.error("Unexpected data format:", result);
          }
        } else {
          console.error("Unexpected data format:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "nQRdfFEoWy3hMcz2Nm1NzaWPu4g7bjZc7QYmjRsL");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      body: '{"type": "video_comments", "video_id": "1TRK90KSkFM"}',
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://6azv1twa20.execute-api.us-east-1.amazonaws.com/prod",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("Submitted URL data:", data);
        if (data.body) {
          const parsedBody = JSON.parse(data.body);
          setCommentsData(parsedBody.comments); // Store comments data in state
        }
        fetchData();
      })
      .catch((error) => {
        console.error("Error submitting URL:", error.message);
      });

    setNewUrl("");
  };

  const handleRefresh = () => {
    fetchData();
  };

  const totalPages = Math.ceil(list.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedList = Array.isArray(list)
    ? list.slice(startIndex, endIndex)
    : [];

  const filteredList = selectedStatuses.length
    ? paginatedList.filter((item) => selectedStatuses.includes(item.status))
    : paginatedList;

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
      <header className="px-5 py-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100"></h2>
        <form
          onSubmit={handleUrlSubmit}
          className="flex flex-col md:flex-row justify-end"
        >
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Enter new URL"
            className="border rounded-l-md px-2 py-1 focus:outline-none mb-2 md:mb-0 md:mr-2 text-slate-800"
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
      </header>

      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-sm font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-1 py-3 whitespace-nowrap">
                  <span className="sr-only"></span>
                </th>
                <th className="px-3 py-6 whitespace-nowrap w-px text-left text-slate-800 dark:text-slate-100">
                  Video Title
                </th>
                <th className="px-32 py-3 whitespace-nowrap w-px text-left text-slate-800 dark:text-slate-100">
                  Video Id
                </th>
                <th className="px-10 py-3 whitespace-nowrap w-px text-left text-slate-800 dark:text-slate-100">
                  Insert Date
                </th>
                <th className="px-8 py-3 whitespace-nowrap w-px text-left text-slate-800 dark:text-slate-100">
                  Update Date
                </th>
                <th className="px-7 py-3 whitespace-nowrap w-px text-slate-800 dark:text-slate-100">
                  <div className="px-4 flex items-center justify-between">
                    <th className="px-1 py-3 whitespace-nowrap text-slate-800 dark:text-slate-100">
                      <div className="relative flex items-center">
                        <span className="">Status</span>
                        <button
                          className="ml-2 btn btn-primary dropdown-toggle"
                          type="button"
                          onClick={toggleDropdown}
                          aria-haspopup="true"
                          aria-expanded={isDropdownOpen ? "true" : "false"}
                        >
                          <span className="text-slate-800 dark:text-slate-100">
                            &#9660;
                          </span>
                        </button>
                        {isDropdownOpen && (
                          <div className="absolute mt-40 left-14 w-0 bg-white dark:bg-slate-700 rounded shadow-lg">
                            <label className="block flex text-xs py-2 px-4">
                              <input
                                type="checkbox"
                                value="Failed"
                                className="mr-2"
                                onChange={() => handleStatusChange("Failed")}
                              />
                              Failed
                            </label>
                            <label className="block flex text-xs py-2 px-4">
                              <input
                                type="checkbox"
                                value="Processed"
                                className="mr-2"
                                onChange={() => handleStatusChange("Processed")}
                              />
                              Processed
                            </label>
                            <label className="block flex text-xs py-2 px-4">
                              <input
                                type="checkbox"
                                value="in_queue"
                                className="mr-2"
                                onChange={() => handleStatusChange("in_queue")}
                              />
                              In Queue
                            </label>
                          </div>
                        )}
                      </div>
                    </th>
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
              {Array.isArray(filteredList) &&
                filteredList.map((customer) => (
                  <Customer
                    key={customer.video_id}
                    id={customer.video_id}
                    name={customer.video_title}
                    insert_date={customer.insert_time}
                    update_date={customer.update_time}
                    status={customer.status}
                  />
                ))}
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
