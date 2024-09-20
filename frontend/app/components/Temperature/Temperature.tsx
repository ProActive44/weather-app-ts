// "use client";

// import { useGlobalContext } from '@/app/context/globalContext';
// import { clearSky, cloudy, drizzleIcon, navigation, rain, snow } from '@/app/utils/Icons';
// import { KelvinToCelsius } from '@/app/utils/misc';
// import moment from 'moment';
// import React, { useEffect, useState } from 'react';

// function Temperature() {
//     const forecast = useGlobalContext();

//     if (!forecast || !forecast.forecast || !forecast.forecast.main || !forecast.forecast.weather || !forecast.forecast.timezone || !forecast.forecast.name) {
//         return <p>Loading...</p>;
//     }

//     const { main, timezone, name, weather } = forecast.forecast;
//     const temp = KelvinToCelsius(main.temp);
//     const minTemp = KelvinToCelsius(main.temp_min);
//     const maxTemp = KelvinToCelsius(main.temp_max);
//     const { main: weatherMain, description } = weather[0];

//     const [localTime, setLocalTime] = useState<string>("");
//     const [currentDay, setCurrentDay] = useState<string>("");

//     const getIcon = () => {
//         switch (weatherMain) {
//             case "Drizzle":
//                 return drizzleIcon;
//             case "Rain":
//                 return rain;
//             case "Snow":
//                 return snow;
//             case "Clear":
//                 return clearSky;
//             case "Clouds":
//                 return cloudy;
//             default:
//                 return clearSky;
//         }
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             const localMoment = moment().utcOffset(timezone / 60);
//             const formattedTime = localMoment.format("HH:mm:ss");
//             const day = localMoment.format("dddd");

//             setLocalTime(formattedTime);
//             setCurrentDay(day);
//         }, 1000);

//         return () => clearInterval(interval); // Cleanup interval on component unmount
//     }, [timezone]);

//     return (
//         <div className='pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none'>
//             <p className='flex flex-row justify-between'>
//                 <span className='font-medium'>{currentDay}</span>
//                 <span className='font-medium'>{localTime}</span>
//             </p>
//             <p className='pt-2 font-bold flex gap-1'>
//                 <span>{name}</span>
//                 <span>{navigation}</span>
//             </p>
//             <p className='py-10 text-9xl font-bold self-center'>{temp}°</p>
//             <div>
//                 <span>{getIcon()}</span>
//                 <p className='pt-2 capitalize text-lg font-medium'>{description}</p>
//                 <p className='flex items-center gap-2'>
//                     <span>Low: {minTemp}°</span>
//                     <span>High: {maxTemp}°</span>
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default Temperature;

"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow } from '@/app/utils/Icons';
import { KelvinToCelsius } from '@/app/utils/misc';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

function Temperature() {
    const forecast = useGlobalContext();

    const [localTime, setLocalTime] = useState<string>("");
    const [currentDay, setCurrentDay] = useState<string>("");

    useEffect(() => {
        if (!forecast || !forecast.forecast || !forecast.forecast.timezone) return;
        const interval = setInterval(() => {
            const localMoment = moment().utcOffset(forecast.forecast.timezone / 60);
            const formattedTime = localMoment.format("HH:mm:ss");
            const day = localMoment.format("dddd");

            setLocalTime(formattedTime);
            setCurrentDay(day);
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [forecast]);

    if (!forecast || !forecast.forecast || !forecast.forecast.main || !forecast.forecast.weather || !forecast.forecast.timezone || !forecast.forecast.name) {
        return <p>Loading...</p>;
    }

    const { main, name, weather } = forecast.forecast;
    const temp = KelvinToCelsius(main.temp);
    const minTemp = KelvinToCelsius(main.temp_min);
    const maxTemp = KelvinToCelsius(main.temp_max);
    const { main: weatherMain, description } = weather[0];

    const getIcon = () => {
        switch (weatherMain) {
            case "Drizzle":
                return drizzleIcon;
            case "Rain":
                return rain;
            case "Snow":
                return snow;
            case "Clear":
                return clearSky;
            case "Clouds":
                return cloudy;
            default:
                return clearSky;
        }
    };

    return (
        <div className='pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <p className='flex flex-row justify-between'>
                <span className='font-medium'>{currentDay}</span>
                <span className='font-medium'>{localTime}</span>
            </p>
            <p className='pt-2 font-bold flex gap-1'>
                <span>{name}</span>
                <span>{navigation}</span>
            </p>
            <p className='py-10 text-9xl font-bold self-center'>{temp}°</p>
            <div>
                <span>{getIcon()}</span>
                <p className='pt-2 capitalize text-lg font-medium'>{description}</p>
                <p className='flex items-center gap-2'>
                    <span>Low: {minTemp}°</span>
                    <span>High: {maxTemp}°</span>
                </p>
            </div>
        </div>
    );
}

export default Temperature;

