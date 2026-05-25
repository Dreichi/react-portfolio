import React, { useState, useRef } from "react";
import { X } from "lucide-react";

const ProjectCard = ({ name, img, desc, stack, impact, variant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const projectRef = useRef(null);
  const isTerminal = variant === "terminal";

  return (
    <>
      <div
        ref={projectRef}
        onClick={() => setIsOpen(true)}
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-offset="100"
        className={`w-full h-full rounded-md py-4 px-4 cursor-pointer ${
          isTerminal ? "neon-card terminal-block" : "hover:bg-dark bg-dark-200"
        }`}
      >
        <img
          src={img}
          className="w-full h-52 sm:h-60 mx-auto object-cover rounded-md"
          alt={name}
        />
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-base md:text-xl glitch-hover">{name}</h1>
            {isTerminal && (
              <span className="text-xs text-green-300">run --active</span>
            )}
          </div>
          <p className="font-light text-gray-400 text-sm mt-2">{desc}</p>
          {isTerminal && (
            <div className="mt-3 text-xs text-green-200 space-y-1">
              <p>stack: {stack}</p>
              <p>impact: {impact}</p>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-60 rounded-full p-1"
            >
              <X size={24} />
            </button>
            <img
              src={img}
              alt={name}
              className="max-w-full max-h-screen rounded-md"
            />
          </div>
        </div>
      )}
    </>
  );
};


export default ProjectCard;
