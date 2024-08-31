"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({})

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
            console.log(res.data);
            setAirQuality(res.data); 
        }catch(error){
            console.error("Error fetching air quality data: ", error.message);
        }
    }

    useEffect(() => {
        fetchForecast();
        fetchAirQuailty();
    }, []);

    return (
        <GlobalContext.Provider value={{forecast,airQuality,}}>
            <GlobalContextUpdate.Provider value={fetchForecast}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
