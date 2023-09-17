import React  from 'react';
export default function PrayerTime({image, title,time}) {
    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg" src={image} alt="payer image"/>
                <div className="pl-5 pt-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{time}</p>
                </div>
            </div>
        </>
    );
}