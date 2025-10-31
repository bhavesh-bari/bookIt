import Navbar from "@/components/Navbar";
import BookingDetails from "@/components/BookingDetails";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ExperiencePageProps {
    params: { id: string };
}

export default function ExperiencePage({ params }: ExperiencePageProps) {
    const { id } = params;

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            <div className="w-full max-w-6xl mx-auto px-6 py-4">
                <div className="flex items-center gap-3 mb-4">
                    <Link href="/">
                        <ArrowLeft
                            size={20}
                            className="cursor-pointer text-black hover:text-gray-700"
                        />
                    </Link>
                    <h1 className="text-lg font-semibold text-black capitalize">
                        Details
                    </h1>
                </div>

                {/* Booking Details Section */}
                <BookingDetails />
            </div>
        </div>
    );
}
