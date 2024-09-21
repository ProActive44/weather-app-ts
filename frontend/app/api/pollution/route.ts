import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Mark as dynamic
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const apiKey = process.env.OPENWEATHERMAP_KEY;

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error in getting air pollution data ", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}
