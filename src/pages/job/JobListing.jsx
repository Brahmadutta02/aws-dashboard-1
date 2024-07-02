import React, { useState } from 'react';
import regionsData from  '../../../public/country_details.json'
import axios from 'axios';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import JobSidebar from '../../partials/job/JobSidebar';
import DropdownSort from '../../components/DropdownSort';
import JobListItem from '../../partials/job/JobListItem';
import PaginationNumeric from '../../components/PaginationNumeric';

function JobListing() {
  const items = [
    {
      id: 0,
      company: 'Company 01',
      role: 'SRHvsMI',
      link: '/job/job-post',
      details: 'Contract / Remote / New York, NYC',
      date: 'Jan 4',
      type: 'Featured',
      fav: false,
      bgColor: 'bg-blue-600/95',
    },
    {
      id: 1,
      company: 'Company 02',
      role: 'BJPOperationLotusInPunjab',
      link: '/job/job-post',
      details: 'Contract / Remote / New York, NYC',
      date: 'Jan 7',
      type: 'New',
      fav: true,
      bgColor: 'bg-blue-600/80',
    },
    {
      id: 2,
      company: 'Company 03',
      role: 'Highest IPL',
      link: '/job/job-post',
      details: 'Contract / Remote / New York, NYC',
      date: 'Jan 7',
      type: 'New',
      fav: false,
      bgColor: 'bg-blue-600/75',
    },
    {
      id: 3,
      company: 'Company 04',
      role: 'OrangeArmy',
      link: '/job/job-post',
      details: 'Full-time / Remote / Anywhere',
      date: 'Jan 7',
      type: 'New',
      fav: false,
      bgColor: 'bg-blue-500/75',
    },
    {
      id: 4,
      company: 'Company 05',
      role: 'Mayank',
      link: '/job/job-post',
      details: 'Full-time / Remote / London, UK',
      date: 'Jan 6',
      type: 'New',
      fav: true,
      bgColor: 'bg-blue-500/80',
    },
    {
      id: 5,
      company: 'Company 06',
      role: 'PREDICTION ON LIVE MATCH',
      link: '/job/job-post',
      details: 'Contract / Remote / New York, NYC',
      date: 'Jan 4',
      type: 'Featured',
      fav: false,
      bgColor: 'bg-blue-400/75',
    },
    {
      id: 6,
      company: 'Company 07',
      role: 'TNSUMMIT2024',
      link: '/job/job-post',
      details: 'Contract / Remote / New York, NYC',
      date: 'Jan 7',
      type: 'New',
      fav: true,
      bgColor: 'bg-blue-400/60',
    },
    {
      id: 7,
      company: 'Company 08',
      role: 'JeetoDhanDhanaDhan',
      link: '/job/job-post',
      details: 'Contract / Remote / New York, NYC',
      date: 'Jan 7',
      type: 'New',
      fav: false,
      bgColor: 'bg-blue-300/90',
    },
    {
      id: 8,
      company: 'Company 09',
      role: 'Bheema Bharti',
      link: '/job/job-post',
      details: 'Full-time / Remote / Anywhere',
      date: 'Jan 7',
      type: 'New',
      fav: false,
      bgColor: 'bg-blue-300/75',
    },
    {
      id: 9,
      company: 'Company 10',
      role: 'RCBs 263',
      link: '/job/job-post',
      details: 'Full-time / Remote / London, UK',
      date: 'Jan 6',
      type: 'New',
      fav: true,
      bgColor: 'bg-blue-200/90',
    }
  ];
  const [region, setRegion] = useState('All');
  const filteredItems = region === 'All' ? items : items.filter(item => item.region === region);
// function handleRegionChange(event) {
//   setRegion(event.target.value);
// }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  items.forEach(item => {
    console.log(item);
  });

  const API_ENDPOINT = 'https://yourapiendpoint.com/store';

  const storeRegionData = async (key, value) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error storing region data:', error);
    }
  };

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
        {/*  Site header */}
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
            
            <div className="flex flex-col items-center justify-end mb-8 w-64 h-1" style={{marginTop: "-2.1rem"}}>
              <label
                htmlFor="region"
                className="text-sm md:text-lg text-slate-800 dark:text-slate-100 font-bold"
              >
                Region
              </label>
              <select
                id="region"
                value={region}
                onChange={handleRegionChange}
                className="text-gray-900 dark:text-gray-100 w-full bg-slate-50 dark:bg-slate-700 rounded-md"
              >
                {regionsData.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            

            {/* Page content */}
            <div className="grid grid-cols-1 gap-6">
              {/* Content */}
              <div className="w-full ">
                {/* Jobs list */}
                <div className="flex justify-center">
                  <div className="space-y-4 w-full max-w-md">
                    {items.map((item) => (
                      <JobListItem
                        key={item.id}
                        id={item.id}
                        company={item.company}
                        role={item.role}
                        date={item.date}
                        type={item.type}
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
