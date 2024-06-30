import React from 'react';
import { Link } from 'react-router-dom';

function JobListItem(props) {
  
  return (
    <div
      
      className={`shadow-lg rounded-sm border px-5 py-4 ${
        props.bgColor
          ? props.bgColor
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
      }`}
      style={{
        
    }}
    >
      <div className="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2" style={{position:'relative', left:'10px',  textAlign:'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {/* Left side */}
        <div className="flex items-start space-x-3 md:space-x-4">
          
          <div>
          <div className="inline-flex flex-col items-center">
            <Link className="inline-flex font-semibold text-slate-800 dark:text-slate-100" to={props.link}>
              {props.role}
            </Link>
            <div className="text-sm">{props.details}</div>
          </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center space-x-4 pl-10 md:pl-0">
          
          <button className={`${props.fav ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400 dark:hover:text-slate-500'}`}>
            <span className="sr-only">Bookmark</span>
            
          </button>
        </div>
      </div>
    </div>
  );
}


export default JobListItem;