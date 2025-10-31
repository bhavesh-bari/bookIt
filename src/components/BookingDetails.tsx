"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const BookingDetails = ({ id }: { id?: string }) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("Oct 22");
  const [selectedTime, setSelectedTime] = useState("9:00 am");
  const [quantity, setQuantity] = useState(1);

  const price = 999;
  const taxes = 59;
  const total = price * quantity - taxes;

  const dates = ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"];
  const times = [
    { time: "07:00 am", left: 4 },
    { time: "9:00 am", left: 2 },
    { time: "11:00 am", left: 5 },
    { time: "1:00 pm", left: 0 },
  ];

  const handleConfirm = () => {
    // Pass details to checkout via query params
    const params = new URLSearchParams({
      name: "Kayaking",
      date: selectedDate,
      time: selectedTime,
      qty: quantity.toString(),
      subtotal: (price * quantity).toString(),
      taxes: taxes.toString(),
      total: total.toString(),
    });

    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <section className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8 bg-white ">
      {/* Left side: Experience details */}
      <div className="md:col-span-2 space-y-6">
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
          <Image
            src="/kayak.png"
            alt="Kayaking"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Kayaking</h1>
          <p className="text-gray-600 mt-2">
            Curated small-group experience. Certified guide. Safety first with gear included.
            Helmet and life jackets along with an expert will accompany in kayaking.
          </p>
        </div>

        {/* Choose date */}
        <div>
          <h2 className="font-medium text-gray-800 mb-3">Choose date</h2>
          <div className="flex flex-wrap gap-3">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-md text-sm border transition-all ${
                  selectedDate === date
                    ? "bg-yellow-400 text-gray-900 font-semibold"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        {/* Choose time */}
        <div>
          <h2 className="font-medium text-gray-800 mb-3">Choose time</h2>
          <div className="flex flex-wrap gap-3">
            {times.map((slot) => (
              <button
                key={slot.time}
                disabled={slot.left === 0}
                onClick={() => setSelectedTime(slot.time)}
                className={`px-4 py-2 rounded-md text-sm border flex items-center gap-2 transition-all ${
                  slot.left === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : selectedTime === slot.time
                    ? "bg-yellow-400 text-gray-900 font-semibold"
                    : "bg-white hover:bg-gray-50 text-gray-800"
                }`}
              >
                {slot.time}
                {slot.left > 0 && (
                  <span className="text-xs text-red-500">{slot.left} left</span>
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            All times are in IST (GMT +5:30)
          </p>
        </div>

        {/* About section */}
        <div>
          <h2 className="font-medium text-gray-800 mb-2">About</h2>
          <p className="bg-gray-50 text-gray-600 p-3 rounded-md text-sm">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </p>
        </div>
      </div>

      {/* Right side: Booking summary */}
      <aside className="bg-gray-50 rounded-xl p-6 h-fit shadow-md border border-gray-100 space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Starts at</span>
          <span className="font-semibold text-gray-800">₹{price}</span>
        </div>

        {/* Quantity selector */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Quantity</span>
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              className="px-2 py-1 text-lg text-gray-700 hover:bg-gray-100"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              −
            </button>
            <span className="px-3 text-gray-800">{quantity}</span>
            <button
              className="px-2 py-1 text-lg text-gray-700 hover:bg-gray-100"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <hr />

        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>₹{price * quantity}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Taxes</span>
          <span>₹{taxes}</span>
        </div>

        <hr />

        <div className="flex justify-between text-base font-semibold text-gray-900">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-md hover:bg-yellow-500 transition-all"
        >
          Confirm
        </button>
      </aside>
    </section>
  );
};

export default BookingDetails;
