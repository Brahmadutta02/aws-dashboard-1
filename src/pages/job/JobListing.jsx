import React, { useState } from 'react';
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
    'bg-blue-500/75',
    'bg-blue-500/80',
    'bg-blue-400/75',
    'bg-blue-400/60',
    'bg-blue-300/90',
    'bg-blue-300/75',
    'bg-blue-200/90',
  ];
  
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "no5LtyF1CI4peL4ifoD036r0F8ZWbq9s2IdPV80N");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "body": "{\"type\": \"trending_hashtags\", \"region\": \"US\"}"
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://hqdc0hrdni.execute-api.us-east-1.amazonaws.com/prod", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const responseBody = JSON.parse(result.body);

      // Extract date and hashtags
      const date = responseBody.date;
      const hashtags = responseBody.hashtags;

      // Log the extracted data
      console.log('Date:', date);
      console.log('Hashtags:', hashtags);
    })
    .catch((error) => console.error('Error:', error));
  
  // Mock data for items
  const [items, setItems] = useState([
    { role: 'Software Engineer', bgColorIndex: 0 },
    { role: 'Product Manager', bgColorIndex: 1 },
    { role: 'Designer', bgColorIndex: 2 },
  ]);

  // Example of how to use the bgColorIndex to get the actual bgColor
  items.forEach(item => {
    item.bgColor = bgColors[item.bgColorIndex];
  });

  const [region, setRegion] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleRegionChange = async (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);
    
    const response = await storeRegionData('region', selectedRegion);
    console.log('API response:', response);
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
                    {new Date().toISOString().split("T")[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* Country details */}
            <div className="flex flex-col items-center justify-end mb-8 w-64 h-1" style={{ marginTop: "-2.1rem" }}>
              <label htmlFor="region" className="text-sm md:text-lg text-slate-800 dark:text-slate-100 font-bold">
                Region
              </label>
              <div className="dropdown">
                <select
                  style={{ width: '200px', maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
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
            <div className="grid grid-cols-1 gap-6">
              {/* Content */}
              <div className="w-full">
                {/* Jobs list */}
                <div className="flex justify-center">
                  <div className="space-y-4 w-full max-w-md">
                    {items.map((item, index) => (
                      <JobListItem
                        key={index}
                        role={item.role}
                        bgColor={item.bgColor}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default JobListing;
