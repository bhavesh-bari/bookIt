import React from "react";
import ExperienceCard from "./ExperienceCard";

interface Experience {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface BodyProps {
  experiences: Experience[];
}

function Body({ experiences }: BodyProps) {
  return (
    <div className="bg-white w-full min-h-screen px-6 py-8">
      {experiences.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No results found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} {...exp} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Body;
