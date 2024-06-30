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
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow" >
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div >
            <div className="px-20 mb-4 sm:mb-0 flex justify-center items-center">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold"  >Trending Hashags ✨</h1>
              </div>
              {/* Left: Title */}
              {/* <div className="mb-4 sm:mb-0 flex justify-center items-center">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold"  style={{position:'relative', left:'400px'}}>Trending Hashags ✨</h1>
              </div> */}
              {/* <div className="mb-4 sm:mb-0">
                <h1 className="text-sm md:text-l text-slate-800 dark:text-slate-100 font-bold">Last Refresh Times</h1>
                <p className="text-xs text-gray-500">{new Date().toISOString().replace('T', ' ').split('.')[0]}</p>
              </div> */}
              {/* <div className="mb-4 sm:mb-0" style={{ position:'relative', left:'90%', bottom:'50px' }}>
  <h1 className="text-sm md:text-l text-slate-800 dark:text-slate-100 font-bold" style={{}}>Last Refresh Time</h1>
  <p className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#A0AEC0' }}>
    {new Date().toISOString().replace('T', ' ').split('.')[0]}
  </p>
</div> */}
<div className="mb-4 sm:mb-0 flex flex-col items-end sm:items-end" style={{position:'relative', bottom:'40px'}}>
  <h1 className="text-sm md:text-lg text-slate-800 dark:text-slate-100 font-bold">Last Refresh Time</h1>
  <p className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#A0AEC0' }}>
    {new Date().toISOString().replace('T', ' ').split('.')[0]}
  </p>
</div>


            </div>

            

            {/* Page content */}
            <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">
              {/* Content */}
              <div className='w-full' >
                {/* Jobs list */}
                <div className="flex justify-center" style={{position:'relative', right:'10px', bottom:'50px'}}>
                  <div className='space-y-1 text-center' style={{width: '35%'}}>
                    {items.map((item) => {
                      // const markedRole = item.role.replace('Web', '<mark>Web</mark>');
                      return (
                        <JobListItem
                          key={item.id}
                          id={item.id}
                          company={item.company}
                          // role={<span dangerouslySetInnerHTML={{__html: markedRole}} />}
                          role={item.role}
                          // link={item.link}
                          // details={item.details}
                          date={item.date}
                          type={item.type}
                          // fav={item.fav}
                          bgColor={item.bgColor}
                        />
                      );
                    })}
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
