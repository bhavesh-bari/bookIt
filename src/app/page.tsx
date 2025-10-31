"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Body from "@/components/Body";

interface Experience {
  _id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("/api/experiences");
        const data = await res.json();
        setExperiences(data);
      } catch (err) {
        console.error("Failed to fetch experiences:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const filtered = experiences.filter((exp) =>
    `${exp.name} ${exp.location}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <Navbar onSearch={setSearchTerm} />
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100 animate-pulse"
            >
              {/* Image skeleton */}
              <div className="h-48 bg-gray-200 w-full"></div>

              {/* Content skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>

                <div className="flex justify-between items-center pt-3">
                  <div className="h-5 bg-gray-300 rounded w-16"></div>
                  <div className="h-8 bg-gray-300 rounded-lg w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Body
          experiences={filtered.map((exp) => ({
            id: exp._id,
            title: exp.name,
            location: exp.location,
            description: exp.description,
            price: exp.price,
            imageUrl: exp.imageUrl,
          }))}
        />
      )}
    </div>
  );
}
