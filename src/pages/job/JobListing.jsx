import React, { useState } from 'react';

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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  items.forEach(item => {
    console.log(item);
  });

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
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Trending Hashtags ✨</h1>
              </div>
            </div>

            <div className="flex justify-end mb-8">
              <div className="text-right">
                <h1 className="text-sm md:text-lg text-slate-800 dark:text-slate-100 font-bold">Last Refresh Time</h1>
                <p className="text-xs text-gray-500">
                  {new Date().toISOString().replace('T', ' ').split('.')[0]}
                </p>
              </div>
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
