"use client";

import Navbar from "@/components/Navbar";
import Checkout from "@/components/Checkout";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            <div className="w-full max-w-6xl mx-auto px-6 py-4">
                {/* Back button */}
                <div className="flex items-center gap-3 mb-4">
                    <button
                        onClick={() => router.back()} // 👈 go to previous page
                        className="flex items-center text-black hover:text-gray-700 transition"
                    >
                        <ArrowLeft size={20} className="" />

                    </button>

                    <h1 className="text-lg font-semibold text-black ml-2">Checkout</h1>
                </div>

                <Checkout />
            </div>
        </div>
    );
}
