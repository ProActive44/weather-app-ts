export const KelvinToCelsius =(Kelvin: number )=>{
    return Math.round(Kelvin-273.15);
}
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