import Navbar from "@/components/Navbar";
import BookingDetails from "@/components/BookingDetails";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// ✅ Keep params as a Promise in Next.js 16
interface ExperiencePageProps {
    params: Promise<{ id: string }>;
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
    // ✅ Unwrap the Promise
    const { id } = await params;

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            <div className="w-full max-w-6xl mx-auto px-6 py-4">
                {/* Back Button */}
                <div className="flex items-center gap-3 mb-4">
                    <Link href="/">
                        <ArrowLeft
                            size={20}
                            className="cursor-pointer text-black hover:text-gray-700"
                        />
                    </Link>
                    <h1 className="text-lg font-semibold text-black capitalize">Details</h1>
                </div>

                {/* Booking Details */}
                <BookingDetails id={id} />
            </div>
        </div>
    );
}
