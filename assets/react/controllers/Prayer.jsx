import React,{useState,useEffect} from 'react';
import Header from "../component/Header";
import PrayerTime from "../component/PrayerTime";

//images
import Fajr from "../media/Fajr.jpeg";
import Sunrise from "../media/Sunrise.jpeg";
import Dhuhr from "../media/Dhuhr.jpeg";
import Asr from "../media/Asr.jpeg";
import Maghrib from "../media/Maghrib.jpeg";
import Isha from "../media/Isha.jpeg";

export default function Prayer() {
    const [city, setCity] = useState({});

    useEffect(() => {
        (async () => {await handleRequest()})();
    },[]);
    const handleRequest = async (cityName = 'Rabat', country = 'MA') =>
    {
        try {
            const  url = `http://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=${country}`;
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
            setCity({name : cityName,date : data.date.readable,hijri: data.date.hijri.date,prayers});
        }catch (e) {
            console.error(e);
        }
    }

    const handleChangeCity = async (event) => {await handleRequest(event.target.value)};

    const showProgressTime = () => {

        if (Object.entries(city).length > 0)
        {
            return city.prayers.map((prayer,index)=> <PrayerTime image={prayer.image} time={prayer.time} title={prayer.title} key={index} />);
        }
        return undefined;
    }
    return (
        <>
            <Header info={{cityName:city.name,date:city.date,hijri:city.hijri}} changeCity={handleChangeCity}/>
            <div className="grid mx-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 mt-3">{showProgressTime()}</div>
        </>
    );
}