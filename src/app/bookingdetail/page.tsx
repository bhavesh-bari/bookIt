import BookingDetails from "@/components/BookingDetails";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from 'lucide-react';


export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Navbar */}
            <Navbar />

            {/* Main Section */}
            <div className="w-full max-w-6xl mx-auto px-6 py-4">
                {/* Header: ← Details */}
                <div className="flex items-center gap-3 mb-4">
                    <ArrowLeft size={20} className="cursor-pointer text-black" />
                    <h1 className="text-lg font-semibold text-black">Details</h1>
                </div>

                {/* Booking Details Component */}
                <BookingDetails />
            </div>
        </div>
    );
}
