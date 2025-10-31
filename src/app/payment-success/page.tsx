import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import PaymentSuccessClient from "./PaymentSuccessClient";

export default function PaymentSuccessPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <Suspense fallback={<div className="text-center py-10">Loading booking...</div>}>
                <PaymentSuccessClient />
            </Suspense>
        </div>
    );
}
