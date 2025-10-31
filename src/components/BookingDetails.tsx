"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Slot {
  date: string;
  time: string;
  available: number;
}

interface Experience {
  _id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  imageUrl: string;
  dates: string[];
  slots: Slot[];
}

const BookingDetails = ({ id }: { id?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const experienceId = id || searchParams.get("id");

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`/api/experiences/${experienceId}`);
        if (!res.ok) throw new Error("Failed to fetch experience");

        const data = await res.json();
        setExperience(data);

        if (data?.dates?.length) setSelectedDate(data.dates[0]);
        if (data?.slots?.length) setSelectedTime(data.slots[0].time);
      } catch (err) {
        console.error("Error fetching experience:", err);
      } finally {
        setLoading(false);
      }
    };

    if (experienceId) fetchExperience();
  }, [experienceId]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 animate-pulse">
        <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-6 bg-gray-300 w-1/3 mb-3"></div>
        <div className="h-4 bg-gray-200 w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 w-1/2 mb-2"></div>
      </div>
    );
  }

  if (!experience) {
    return <div className="text-center py-20 text-gray-600">Experience not found.</div>;
  }

  const taxes = 59;
  const subtotal = experience.price * quantity;
  const total = subtotal - taxes;

  // ✅ Safe check to avoid undefined access
  const availableSlots = experience?.slots?.filter((s) => s.date === selectedDate) || [];

  const handleConfirm = () => {
    const params = new URLSearchParams({
      name: experience.name,
      date: selectedDate,
      time: selectedTime,
      qty: quantity.toString(),
      subtotal: subtotal.toString(),
      taxes: taxes.toString(),
      total: total.toString(),
    });

    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <section className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8 bg-white">
      {/* Left side */}
      <div className="md:col-span-2 space-y-6">
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
          <Image
            src={experience.imageUrl || "/placeholder.jpg"}
            alt={experience.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{experience.name}</h1>
          <p className="text-gray-600 mt-2">{experience.description}</p>
        </div>

        {/* Choose date */}
        <div>
          <h2 className="font-medium text-gray-800 mb-3">Choose date</h2>
          <div className="flex flex-wrap gap-3">
            {experience?.dates?.length ? (
              experience.dates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-md text-sm border transition-all ${selectedDate === date
                    ? "bg-yellow-400 text-gray-900 font-semibold"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  {date}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-400">No available dates.</p>
            )}
          </div>
        </div>

        {/* Choose time */}
        <div>
          <h2 className="font-medium text-gray-800 mb-3">Choose time</h2>
          <div className="flex flex-wrap gap-3">
            {availableSlots.length ? (
              availableSlots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={slot.available === 0}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`px-4 py-2 rounded-md text-sm border flex items-center gap-2 transition-all ${slot.available === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : selectedTime === slot.time
                      ? "bg-yellow-400 text-gray-900 font-semibold"
                      : "bg-white hover:bg-gray-50 text-gray-800"
                    }`}
                >
                  {slot.time}
                  {slot.available > 0 && (
                    <span className="text-xs text-red-500">{slot.available} left</span>
                  )}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-400">No available slots for this date.</p>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-2">All times are in IST (GMT +5:30)</p>
        </div>
      </div>

      {/* Right side: Summary */}
      <aside className="bg-gray-50 rounded-xl p-6 h-fit shadow-md border border-gray-100 space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Starts at</span>
          <span className="font-semibold text-gray-800">₹{experience.price}</span>
        </div>

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
          <span>₹{subtotal}</span>
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
