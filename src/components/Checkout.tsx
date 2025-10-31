"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [promo, setPromo] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // --- Experience data from query params ---
  const [experience, setExperience] = useState({
    name: "",
    date: "",
    time: "",
    qty: 1,
    subtotal: 0,
    taxes: 0,
    total: 0,
  });

  // Fetch query parameters
  useEffect(() => {
    const expData = {
      name: searchParams.get("name") || "Experience",
      date: searchParams.get("date") || "",
      time: searchParams.get("time") || "",
      qty: Number(searchParams.get("qty")) || 1,
      subtotal: Number(searchParams.get("subtotal")) || 0,
      taxes: Number(searchParams.get("taxes")) || 0,
      total: Number(searchParams.get("total")) || 0,
    };
    setExperience(expData);
  }, [searchParams]);

  // Apply coupon logic
  const handleApplyCoupon = () => {
    if (promo.trim().toUpperCase() === "SAVE25" && !discountApplied) {
      const discountAmount = experience.total * 0.25;
      const newTotal = Math.max(0, experience.total - discountAmount);

      setExperience((prev) => ({
        ...prev,
        total: Number(newTotal.toFixed(2)),
      }));
      setDiscountApplied(true);
      toast.success("Coupon applied! You saved 25%");
    } else if (discountApplied) {
      toast.error("Coupon already applied");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  // Simulated payment
  const handlePayment = () => {
    if (!name || !email) {
      toast.error("Please enter all required fields!");
      return;
    }

    if (!agreed) {
      toast.error("You must agree to the terms before proceeding!");
      return;
    }

    const bookingId = "BK" + Math.floor(100000 + Math.random() * 900000);
    toast.success("Payment Successful!");
    setTimeout(() => {
      router.push(`/payment-success?id=${bookingId}`);
    }, 1000);
  };

  return (
    <section className="w-full max-w-5xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 bg-white">
      {/* Left: Form */}
      <div className="md:col-span-2 bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm space-y-5">
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Full name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Promo Code */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Promo code"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            className="flex-1 w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={discountApplied}
            className={`w-full sm:w-auto font-medium px-4 py-2 rounded-md transition ${discountApplied
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
          >
            {discountApplied ? "Applied" : "Apply"}
          </button>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 accent-yellow-400"
          />
          <span>I agree to the terms and safety policy</span>
        </div>
      </div>

      {/* Right: Summary */}
      <aside className="bg-gray-50 rounded-xl p-4 sm:p-6 h-fit shadow-md border border-gray-100 space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Experience</span>
          <span className="font-semibold text-gray-800">{experience.name}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Date</span>
          <span>{experience.date}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Time</span>
          <span>{experience.time}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Qty</span>
          <span>{experience.qty}</span>
        </div>

        <hr />
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>₹{experience.subtotal}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Taxes</span>
          <span>₹{experience.taxes}</span>
        </div>

        {discountApplied && (
          <div className="flex justify-between text-sm text-green-600 font-semibold">
            <span>Discount (SAVE25)</span>
            <span>-25%</span>
          </div>
        )}

        <hr />
        <div className="flex justify-between text-base font-semibold text-gray-900">
          <span>Total</span>
          <span>₹{experience.total}</span>
        </div>

        <button
          onClick={handlePayment}
          disabled={!agreed}
          className={`w-full font-semibold py-2 rounded-md transition-all ${agreed
              ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Pay and Confirm
        </button>
      </aside>
    </section>
  );
};

export default Checkout;
