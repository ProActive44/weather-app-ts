"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import defaultStates from "../utils/defaultStates";1

const GlobalContext = createContext();
const GlobalUpdateContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({})
    const [inputValue, setInputValue] = useState("");
    const [geoCodedList, setGeoCodedList] = useState(defaultStates);
    const [fivedayForecast, setFivedayForecast] = useState({})
    const [uvIndex, setUvIndex] = useState({});
    const [activeCityCoords, setActiveCityCoords] = useState([51.752021, -1.259041]);
    const [activeCity, setActiveCity] = useState([51.752021, -1.259041]);
 
    const fetchForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
            setForecast(res.data);
        } catch (error) {
            console.log("Error fetching forecast data: ", error.message);
        }
    };

    const fetchAirQuality = async (lat, lon) => {
        try {
            const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
            setAirQuality(res.data);
        } catch (error) {
            console.error("Error fetching air quality data: ", error.message);
        }
    }

    const fetchFiveDayForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
            setFivedayForecast(res.data);
        } catch (error) {
            console.error("Error fetching fiveday data: ", error);
        }
    }

    const fetchUvIndex = async (lat, lon) => {
        try {
            const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
            setUvIndex(res.data);
        } catch (error) {
            console.error("Error fetching the UV index:", error);
        }
    };

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };  

    useEffect(() => {
        const fetchGeoCodedList = async () => {
            try {
                const res = await axios.get(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`
                );
                setGeoCodedList(res.data);
            } catch (error) {
                console.error("Error fetching geocoded list:", error);
            }
        };
        if (inputValue) {
            fetchGeoCodedList();
        }
    }, [inputValue]);

    useEffect(() => {
        fetchForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
        fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
    }, [activeCityCoords]);

    return (
        <GlobalContext.Provider value={{
            forecast,
            airQuality,
            fivedayForecast,
            uvIndex,
            inputValue,
            geoCodedList,
            handleInput
        }}>
            <GlobalUpdateContext.Provider value={{
                setActiveCityCoords
            }}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalUpdateContext);