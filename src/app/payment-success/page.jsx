"use client";
import { useSearchParams } from "next/navigation";
import BookingConfirmed from "@/components/BookingConfirmed";
import Navbar from "@/components/Navbar";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <BookingConfirmed bookingId={id ?? ""} />
        </div>
    );
}
