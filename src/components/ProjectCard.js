import React, { useState, useRef } from "react";
import { X } from "lucide-react";

const ProjectCard = ({ name, img, desc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const projectRef = useRef(null);

  return (
    <>
      <div
        ref={projectRef}
        onClick={() => setIsOpen(true)}
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-offset="100"
        className="hover:bg-dark w-full h-full bg-dark-200 rounded-md py-4 px-4 cursor-pointer"
      >
        <img
          src={img}
          className="w-full h-60 mx-auto object-cover"
          alt={name}
        />
        <div className="mt-2">
          <h1 className="font-bold text-base md:text-xl">{name}</h1>
          <p className="font-light text-gray-400 text-sm">{desc}</p>
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
