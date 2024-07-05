import React, { useState, useEffect } from 'react';
import regionsData from '../../../public/country_details.json';
import axios from 'axios';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import JobSidebar from '../../partials/job/JobSidebar';
import DropdownSort from '../../components/DropdownSort';
import JobListItem from '../../partials/job/JobListItem';
import PaginationNumeric from '../../components/PaginationNumeric';
import zIndex from '@mui/material/styles/zIndex';

function JobListing() {
  const bgColors = [
    'bg-blue-600/95',
    'bg-blue-600/80',
    'bg-blue-600/75',
    'bg-blue-500/80',
    'bg-blue-500/75',
    'bg-blue-400/60',
    'bg-blue-400/75',
    'bg-blue-300/90',
    'bg-blue-300/75',
    'bg-blue-200/90',
  ];

  const getRequestOptions = (region) => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "no5LtyF1CI4peL4ifoD036r0F8ZWbq9s2IdPV80N");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "body": `{ "type": "trending_hashtags", "region": "${region}" }`
    });

    return {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  };

  const [hashtags, setHashtags] = useState([]);
  const [date, setDate] = useState('');
  const [items, setItems] = useState([]);
  const [region, setRegion] = useState('US'); // Default region to US
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false); // Track if data has been loaded
  const [hashtagError, setHashtagError] = useState(false); // Track if there was an error fetching hashtags

  useEffect(() => {
    const fetchHashtags = (region) => {
      const requestOptions = getRequestOptions(region);
      fetch("https://hqdc0hrdni.execute-api.us-east-1.amazonaws.com/prod", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log('Raw result:', result);
          try {
            if (result.body) {
              const responseBody = JSON.parse(result.body);

              // Extract date and hashtags
              const date = responseBody.date;
              const hashtags = responseBody.hashtags;

              // Log the extracted data
              console.log('Date:', date);
              console.log('Hashtags:', hashtags);

              // Update the hashtags state
              setDate(date);
              setHashtags(hashtags);
              setDataLoaded(true); // Set data loaded to true
              setHashtagError(false); // Reset error state when data is loaded
              if (hashtags.length === 0) {
                setHashtagError(true); // Set error if hashtags array is empty
              }
            } else {
              console.error('Response body is empty or undefined.');
              setHashtagError(true); // Set error if response body is empty
              setHashtags([]); // Set empty array to signify no hashtags
            }
          } catch (error) {
            console.error('Error parsing response:', error);
            setHashtagError(true); // Set error if there's an error parsing response
            setHashtags([]); // Set empty array to signify no hashtags on error
          }
        })
        .catch((error) => {
          console.error('Fetch error:', error);
          setHashtagError(true); // Set error if there's a fetch error
          setHashtags([]); // Set empty array to signify no hashtags on fetch error
        });
    };

    fetchHashtags(region);
  }, [region]);


  useEffect(() => {
    const transformHashtagsToItems = (hashtags) => {
      return hashtags.map((hashtag, index) => ({
        role: hashtag,
        bgColorIndex: index % bgColors.length,
      }));
    };

    setItems(transformHashtagsToItems(hashtags));
  }, [hashtags]); // Run when hashtags state changes

  // Example of how to use the bgColorIndex to get the actual bgColor
  items.forEach(item => {
    item.bgColor = bgColors[item.bgColorIndex];
  });

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);

    // Trigger the submit action
    if (selectedRegion) {
      handleSubmit(selectedRegion);
    }
  };

  const handleSubmit = (selectedRegion) => {
    // Implement your submit logic here
    console.log(`Selected region: ${selectedRegion}`);
    // You can also make an API call or perform other actions
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="flex justify-center items-center mb-8">
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                  Trending Hashtags ✨
                </h1>
              </div>
            </div>

            {/* Date and Time stamp */}
            <div className="flex justify-end mb-8">
              <div className="text-right">
                <h1 className="text-sm md:text-lg text-slate-800 dark:text-slate-100 font-bold">
                  Last Refresh Time
                </h1>
                <div className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold text-center">
                    {date ? date : new Date().toISOString().split("T")[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* Country details */}
            <div
              className="flex flex-col items-center justify-end mb-8 w-64 h-1"
              style={{ marginTop: "-2.1rem" }}
            >
              <label
                htmlFor="region"
                className="text-sm md:text-lg text-slate-800 dark:text-slate-100 font-bold"
              >
                Region
              </label>
              <div className="dropdown">
                <select
                  style={{
                    width: "300px",
                    maxWidth: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  id="region"
                  value={region}
                  onChange={handleRegionChange}
                  className="text-gray-900 dark:text-gray-100 w-full bg-slate-50 dark:bg-slate-700 rounded-md max-w-md dropdown-menu"
                >
                  {regionsData.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Page content */}
            {dataLoaded && !hashtagError ? (
              <div className="grid grid-cols-1 gap-6">
                {/* Content */}
                <div className="w-full">
                  {/* Jobs list */}
                  <div className="flex justify-center">
                    <div className="space-y-4 w-full max-w-md border border-gray-300 p-4 rounded-lg">
                      {items.map((item, index) => (
                        <div key={index} className="rounded-lg overflow-auto">
                          <JobListItem
                            role={item.role}
                            bgColor={item.bgColor}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="text-center text-slate-800 dark:text-slate-100 font-bold bg-red-600/95 w-64 p-4 rounded-lg border border-grey">
                  Response body is empty or undefined. No trending hashtags available.
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default JobListing;
