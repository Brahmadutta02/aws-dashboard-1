import React from 'react';

function TransactionsTableItem(props) {

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center relative">
        </div>
      </td>
      <td className="px-20 first:pl-5 last:pr-5 py-3 whitespace-nowrap flex items-center justify-center">
        <div className="flex items-center">
          
          <div className="font-medium text-slate-800 dark:text-slate-100">{props.name}</div>
        </div>
      </td>

      <td className="px-10 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          
          <div className="font-medium text-slate-800 dark:text-slate-100">{props.id}</div>
        </div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.insert_date}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.update_date}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.status}</div>
      </td>
      
    </tr>
  );
}

export default TransactionsTableItem;
