"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

interface ExperienceCardProps {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  id,
  title,
  location,
  description,
  price,
  imageUrl,
}) => {
  const router = useRouter();

  return (
    <div
      id={id}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-xs border border-gray-100"
    >
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-md">
            {location}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-snug">{description}</p>

        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-900 text-sm">
            From <span className="font-semibold text-lg">₹{price}</span>
          </p>
          <button
            onClick={() => router.push(`/experience/${id}`)}
            className="bg-yellow-400 text-gray-900 text-sm font-semibold px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
