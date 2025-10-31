"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Body from "@/components/Body";

const allExperiences = [
  {
    id: "exp1",
    title: "Kayaking",
    location: "Udupi",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included.",
    price: 999,
    imageUrl: "/kayak.jpg",
  },
  {
    id: "exp2",
    title: "Nandi Hills Sunrise",
    location: "Bangalore",
    description:
      "Beautiful sunrise view with a professional guide. Ideal for early risers.",
    price: 899,
    imageUrl: "/sunrise.jpg",
  },
  {
    id: "exp3",
    title: "Coffee Trail",
    location: "Coorg",
    description:
      "Walk through coffee plantations with an expert. Learn coffee making process.",
    price: 1299,
    imageUrl: "/coffee.jpg",
  },
  {
    id: "exp4",
    title: "Boat Cruise",
    location: "Sundarban",
    description:
      "A scenic boat ride through the mangroves with an experienced guide.",
    price: 999,
    imageUrl: "/boat.jpg",
  },
  {
    id: "exp5",
    title: "Bunjee Jumping",
    location: "Manali",
    description:
      "Thrilling jump experience with safety gear and professional trainers.",
    price: 1499,
    imageUrl: "/bunjee.jpg",
  },
  {
    id: "exp6",
    title: "Jungle Walk",
    location: "Wayanad",
    description:
      "Explore the forest trails safely with trained local guides.",
    price: 1199,
    imageUrl: "/forest.jpg",
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = allExperiences.filter((exp) =>
    `${exp.title} ${exp.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <Navbar onSearch={setSearchTerm} />
      <Body experiences={filtered} />
    </div>
  );
}
