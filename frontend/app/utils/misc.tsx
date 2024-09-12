import moment from "moment";

export const KelvinToCelsius =(Kelvin: number )=>{
    return Math.round(Kelvin-273.15);
}
export const unixToTime = (unix: number, timezone: number) => {
    return moment.unix(unix).utcOffset(timezone / 60).format("HH:mm");
}

export const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num;
    }
  };
  
export const airQualityIndexText =[
    {
        rating: 10,
        description: "Good",
    },
    {
        rating: 20,
        description: "Moderate",
    },
    {
        rating: 30,
        description: "Unhealthy for Sensitive Groups",
    },
    {
        rating: 40,
        description: "Unhealthy",
    },
    {
        rating: 50,
        description: "Very Unhealthy",
    }
]