import ProjectCard from "./ProjectCard.js"

import hr from "../assets/curve-hr.svg"
import thow from "../assets/projects/throw.gif"
import fluff from "../assets/projects/fluff.jpg"
import portfolio from "../assets/projects/portfolio.png"
import dayread from "../assets/projects/dayread.jpg"
import key from "../assets/projects/key.webp"


const topProjects = [
  {
    name: "Fluff Event",
    img: fluff,
    desc:
      "Événement caritatif 2023 (16 000€ collectés) : site, boutique et réplique r/Place.",
    stack: "React • Shopify • API",
    impact: "Collecte records + 3K visiteurs",
  },
  {
    name: "Throwing System for OBS",
    img: thow,
    desc:
      "Système de lancer d'objet pour streamers avec physique Matter.js en temps réel.",
    stack: "React • Matter.js • OBS",
    impact: "Alternative gratuite, faible charge",
  },
  {
    name: "Tales And Keys",
    img: key,
    desc:
      "Application mobile pour le jeu Isla Obscura, conçue pendant un stage intensif.",
    stack: "React • Node • MongoDB",
    impact: "Expérience terrain sur 2 mois",
  },
];

const otherProjects = [
  {
    name: "Portfolio",
    img: portfolio,
    desc: "Portfolio fait sous React avec Tailwind pour m'y tester.",
  },
  {
    name: "DayRead",
    img: dayread,
    desc:
      "Site de streaming pour sous-titrages, développé avec WordPress et équipe trad.",
  },
];

export default function Projects(){
    return (
        <div id="top-projects" className="mt-4 text-white scanlines">
            <h1 className="text-2xl font-bold">Top Projects</h1>
            <p className="font-light text-gray-400">Mes 3 projets signature, en mode terminal.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center mt-6 gap-6">
              {topProjects.map((project) => (
                <ProjectCard
                  key={project.name}
                  {...project}
                  variant="terminal"
                />
              ))}
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-bold">All Projects</h2>
              <p className="font-light text-gray-400">
                Le reste de mes expériences, pour compléter la mission.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 justify-center mt-6 gap-6">
                {otherProjects.map((project) => (
                  <ProjectCard key={project.name} {...project} />
                ))}
              </div>
            </div>

            <img src={hr} className="w-full mt-8 md:h-2" alt="hr" />
        </div>
    )
}

