import React from 'react';
// import React, {useEffect, useState} from 'react';

function ChannelsTableItem(props) {


  return (
    <tr>
      <td className="first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center relative"></div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 text-slate-800 dark:text-slate-100 whitespace-nowrap">
        <div
          className="text-left overflow-hidden text-ellipsis max-w-xs"
          title={props.name}
        >
          {props.name}
        </div>
      </td>

      <td className="px-32 first:pl-5 last:pr-5 py-3 text-slate-800 dark:text-slate-100 whitespace-nowrap">
        <div className="text-left">{props.id}</div>
      </td>

      <td className="px-5 first:pl-5 last:pr-5 py-3 text-slate-800 dark:text-slate-100 whitespace-nowrap">
        <div className="text-left">{props.insert_date}</div>
      </td>

      <td className="px-5 first:pl-5 last:pr-5 py-3 text-slate-800 dark:text-slate-100 whitespace-nowrap">
        <div className="text-left">{props.update_date}</div>
      </td>

      <td className="px-10 first:pl-5 last:pr-5 py-3 text-slate-800 dark:text-slate-100 whitespace-nowrap">
        <div className="text-left">{props.status}</div>
      </td>
    </tr>
  );
}

export default ChannelsTableItem;
