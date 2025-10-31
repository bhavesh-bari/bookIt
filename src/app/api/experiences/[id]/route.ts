import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {

        const { id } = await context.params;

        await connectDB();

        const experience = await Experience.findById(id);

        if (!experience) {
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }

        return NextResponse.json(experience, { status: 200 });
    } catch (error) {
        console.error("Error fetching experience:", error);
        return NextResponse.json({ message: "Server error", error: String(error) }, { status: 500 });
    }
}
