import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_KEY;
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const dailyUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;


    const dailyRes = await fetch(dailyUrl,{
      next : {revalidate : 3600 },
    })

    const dailyData = await dailyRes.json();
    return NextResponse.json(dailyData);

  } catch (error) {
    console.log("Error in getting fiveday forecast data ", error);
    return new Response("Error fetching fiveday forecast data", { status: 500 });
  }
}