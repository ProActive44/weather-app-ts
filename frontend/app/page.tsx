import AirPollution from "./components/AirPollution/AirPollution";
import Dailyforecast from "./components/Dailyforecast/Dailyforecast";
import Navbar from "./components/Navbar";
import Sunset from "./components/Sunset/Sunset";
import Temperature from "./components/Temperature/Temperature"
import UvIndex from "./components/UvIndex/UvIndex";
import Wind from "./components/Wind/Wind";
import Pollution from "./components/Population/Population";
import FeelsLike from "./components/FeelsLike/FeelsLike";
import Humidity from "./components/Humidity/Humidity";
import Visibility from "./components/Visibility/Visibility";
import Pressure from "./components/Pressure/Pressure";
import Mapbox from "./components/Mapbox/Mapbox.js";
import defaultStates from "./utils/defaultStates";
import FiveDayForecast from "./components/FiveDayForecast/FiveDayForecast";
import Image from "next/image";


export default function Home() {
  

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <Dailyforecast />
            <UvIndex />
            <Pollution />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <Mapbox />
            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">
                Top Large Cities
              </h2>
              <div className="flex flex-col gap-4">
                {defaultStates.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                      // onClick={() => {
                      //   getClickedCityCords(state.lat, state.lon);
                      // }}
                    >
                      <p className="px-6 py-4">{state.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 flex justify-center pb-8">
        <p className="footer-text text-sm flex items-center gap-1">
          Made by
          <a
            href="https://github.com/Aparnaa-k"
            target="_blank"
            className=" text-green-300 font-bold"
          >
            Aparnaa
          </a>
        </p>
      </footer>
    </main>
  );
}