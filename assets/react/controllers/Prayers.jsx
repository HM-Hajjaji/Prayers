import React, {Component} from 'react';

import Fajr from '../media/Fajr.jpeg';
import Sunrise from '../media/Sunrise.jpeg';
import Dhuhr from '../media/Dhuhr.jpeg';
import Asr from '../media/Asr.jpeg';
import Maghrib from '../media/Maghrib.jpeg';
import Isha from '../media/Isha.jpeg';

import Prayer from "../component/Prayer";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: {}
        };
    }

    render() {
        return (
            <>
                <div className="flex gap-2 mt-7">
                    <div className="flex-1">
                        <p className="text-2xl font-bold">Prayer Times in {this.state.city.name}</p>
                        <div className="mt-3">
                            <select onChange={this.handlePrayerTimings}
                                className="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="Rabat">Rabat</option>
                                <option value="Casablanca">Casablanca</option>
                                <option value="Tanja">Tanja</option>
                                <option value="Marrakech">Marrakech</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex-1 text-right">
                        <p className="text-xl">{this.state.city.date}</p>
                        <p className="text-lg font-semibold">{this.state.city.hijri}</p>
                    </div>
                </div>
                <div className="grid mx-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 mt-3">{this.showPrayers()}</div>
            </>
        );
    }

    async componentDidMount() {
         await this.handleRequest();
    }

    async handleRequest (city = 'Rabat', country = 'MA') {
        try {
            const url = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const {data} = await response.json();

            const prayers = [
                {title : 'Fajr',time : data.timings['Fajr'],image : Fajr},
                {title : 'Sunrise',time : data.timings['Sunrise'],image : Sunrise},
                {title : 'Dhuhr',time : data.timings['Dhuhr'],image : Dhuhr},
                {title : 'Asr',time : data.timings['Asr'],image : Asr},
                {title : 'Maghrib',time : data.timings['Maghrib'],image : Maghrib},
                {title : 'Isha',time : data.timings['Isha'],image : Isha}
            ];

            this.setState({
                city: {
                    name: city,
                    date: data.date.readable,
                    hijri: data.date.hijri.date,
                    prayers
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    handlePrayerTimings = async (event) => {
        await this.handleRequest(event.target.value);
    }

    showPrayers()
    {
        if (Object.entries(this.state.city).length > 0)
        {
            return this.state.city.prayers.map((prayer,index) => <Prayer key={index} image={prayer.image} title={prayer.title} time={prayer.time}/>);
        }
        return undefined;
    }
}
