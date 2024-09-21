import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Mark as dynamic
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.OPENWEATHERMAP_KEY;
        const searchParams = req.nextUrl.searchParams;
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        console.log(url);

        const res = await axios.get(url);
        return NextResponse.json(res.data);
    } catch (error) {
        console.error("Error fetching forecast data:", error);
        return new Response("Error fetching forecast data", { status: 500 });
    }
}
