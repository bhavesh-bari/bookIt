import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();

    const { name, email, date, time, qty, total, promo } = body;

    if (!name || !email || !date || !time || !qty || !total) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    try {
        const booking = await Booking.create({

            name,
            email,
            date,
            time,
            qty,
            total,
            promo,
        });

        return NextResponse.json(
            { message: "Booking successful", booking },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
