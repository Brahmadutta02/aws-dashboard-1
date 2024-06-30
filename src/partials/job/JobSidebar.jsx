import React, { useState } from 'react';

function JobSidebar() {

  const [companySetting, setCompanySetting] = useState(true);
  const [immigrationSetting, setImmigrationSetting] = useState(false);

  return (
    <div className="space-y-8">
      {/* Alert */}
      <div className="relative bg-indigo-200 dark:bg-indigo-500 rounded-sm p-5 min-w-60">
        {/* Content */}
      </div>

      {/* Three equal-size boxes */}
      <div className="flex flex-col space-y-8">
        {/* Box 1 */}
        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5 min-w-60">
          {/* Content */}
        </div>
        
        {/* Box 2 */}
        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5 min-w-60">
          {/* Content */}
        </div>

        {/* Box 3 */}
        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5 min-w-60">
          {/* Content */}
        </div>
      </div>
    </div>
  );
}

export default JobSidebar;