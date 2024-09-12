"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import Dailyforecast from "../components/Dailyforecast/Dailyforecast";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({})
    const [fivedayForecast, setFivedayForecast] = useState({})
    const [uvIndex, seUvIndex] = useState({});

    const fetchForecast = async () => {
        try {
            const res = await axios.get("/api/weather");
            setForecast(res.data);
        } catch (error) {
            console.log("Error fetching forecast data: ", error.message);
        }
    };

    const fetchAirQuailty = async () =>{
        try{
            const res = await axios.get("api/pollution");
            setAirQuality(res.data); 
        }catch(error){
            console.error("Error fetching air quality data: ", error.message);
        }
    }

    const fetchFiveDayForecast = async () =>{
        try{
            const res = await axios.get("api/fiveday");
            setFivedayForecast(res.data);
            
        }   catch(error){
            console.error("Error fetching fiveday data: ", error);
        }
    }

    const fetchUvIndex = async (lat, lon) => {
        try {
          const res = await axios.get(`/api/uv`);
          seUvIndex(res.data);
        } catch (error) {
          console.error("Error fetching the forecast:", error);
        }
      };


    useEffect(() => {
        fetchForecast();
        fetchAirQuailty();
        fetchFiveDayForecast();
        fetchUvIndex();
    }, []);

    return (
        <GlobalContext.Provider value={{forecast,airQuality,fivedayForecast, uvIndex,}}>
            <GlobalContextUpdate.Provider value={fetchForecast}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
