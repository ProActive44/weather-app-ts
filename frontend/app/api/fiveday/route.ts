import { NextRequest, NextResponse } from "next/server";

// Mark the route as dynamic
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_KEY;
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // Ensure lat and lon are provided in the request
    if (!lat || !lon) {
      return new Response("Latitude and Longitude are required", { status: 400 });
    }

    const dailyUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const dailyRes = await fetch(dailyUrl);

    if (!dailyRes.ok) {
      return new Response("Error fetching data from OpenWeatherMap", { status: dailyRes.status });
    }

    const dailyData = await dailyRes.json();
    return NextResponse.json(dailyData);

  } catch (error) {
    console.error("Error in getting five-day forecast data: ", error);
    return new Response("Error fetching five-day forecast data", { status: 500 });
  }
}
  