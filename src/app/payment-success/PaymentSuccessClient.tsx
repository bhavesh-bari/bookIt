"use client";

import { useSearchParams } from "next/navigation";
import BookingConfirmed from "@/components/BookingConfirmed";

export default function PaymentSuccessClient() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-8">
            <BookingConfirmed />
        </div>
    );
}
