"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const BookingConfirmed = () => {
  const router = useRouter();
  const params = useSearchParams();
  const refId = params.get("id") || "UNKNOWN";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />

      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Booking Confirmed
      </h1>

      <p className="text-gray-500 mb-6">Ref ID: {refId}</p>

      <button
        onClick={() => router.push("/")}
        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-medium hover:bg-gray-300 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default BookingConfirmed;
