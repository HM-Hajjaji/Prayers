import React from 'react';
import moment from 'moment';

export default function Header({info : {cityName, date, hijri},changeCity})
{
    return (
      <>
          <div className="flex gap-2 mt-7">
              <div className="flex-1">
                  <p className="text-2xl font-bold">Prayer Times in {cityName}</p>
                  <div className="mt-3">
                      <select onChange={changeCity} className="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value="Rabat">Rabat</option>
                          <option value="Casablanca">Casablanca</option>
                          <option value="Tanja">Tanja</option>
                          <option value="Marrakech">Marrakech</option>
                      </select>
                  </div>
              </div>
              <div className="flex-1 text-right">
                  <p className="text-xl">{moment(date).format("DD MMMM, YYYY")}</p>
                  <p className="text-lg font-semibold">{moment(hijri).format("YYYY-MM-DD")}</p>
              </div>
          </div>
      </>
    );
}