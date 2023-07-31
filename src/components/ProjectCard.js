import React, { useRef } from 'react';

const ProjectCard = ({ name, img, desc }) => {
  const projectRef = useRef(null);

  return (
    <a href={img} target="_blank" rel="noopener noreferrer">
      <div
        ref={projectRef} // Ajoutez une référence à l'élément de la carte
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-offset="100"
        className="hover:bg-dark w-full h-full bg-dark-200 rounded-md py-4 px-4"
      >
        <img src={img} className="w-full h-60 mx-auto object-cover" alt={name} />
        <div className="mt-2">
          <h1 className="font-bold md:text-xl">{name}</h1>
          <p className="font-light text-gray-400">{desc}</p>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
