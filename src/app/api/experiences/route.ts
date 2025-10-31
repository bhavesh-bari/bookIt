import { connectDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const experiences = await Experience.find();
    return NextResponse.json(experiences);
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const { name, location, description, price, imageUrl, dates, slots } = body;

        if (!name || !price || !description) {
            return NextResponse.json(
                { message: "Name, price, and description are required" },
                { status: 400 }
            );
        }

        const newExperience = await Experience.create({
            name,
            location,
            description,
            price,
            imageUrl,
            dates,
            slots,
        });

        return NextResponse.json(
            { message: "Experience added successfully", experience: newExperience },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding experience:", error);
        return NextResponse.json(
            { message: "Failed to add experience", error },
            { status: 500 }
        );
    }
}