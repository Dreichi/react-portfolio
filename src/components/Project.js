import ProjectCard from "./ProjectCard.js"

import hr from "../assets/curve-hr.svg"
import thow from "../assets/projects/throw.gif"
import fluff from "../assets/projects/fluff.jpg"
import portfolio from "../assets/projects/portfolio.png"
import dayread from "../assets/projects/dayread.jpg"
import key from "../assets/projects/key.webp"


export default function Projects(){
    return (
        <div id="Projects" className="mt-4 text-white">
            <h1 className="text-2xl font-bold">Projets</h1>
            <p className="font-light text-gray-400">Voici mes projets</p>

            <div className="grid grid-cols-1 md:grid-cols-3 justify-center mt-4 gap-5">
                <ProjectCard name="Fluff Event" img={fluff} desc="Evement caritatif en 2023 réunissant 16 000€ pour la fondation Abbé Pierre,
                j'ai pu faire le site et gérer la boutique et créer une réplique du r/Place pour l'évenement." />
                <ProjectCard name="Tales And Keys" img={key} desc="Application web mobile pour le jeux Isla Obscura sur Lille, fait pendant un stage de deux mois avec React, Node JS et Mongo DB."/>
                <ProjectCard name="Portfolio" img={portfolio} desc="Portfolio fait sous React avec Tailwind pour m'y tester." />
                <ProjectCard name="Throwing System for OBS" img={thow} desc="Système de lancer d'objet pour avatar sur OBS pour le streaming, utilisation du moteur matter.js sous React pour permettre une physique sans trop de charge serveur. C'est surtout une proposition
                gratuite sans logiciel, une alternative plus accessible."/>
                <ProjectCard name="DayRead" img={dayread} desc="Site de streaming permettant de visionner les sous-titrages fait par mon équipe de traduction, fait avec Wordpress."/>

            </div>
            <img src={hr} className="w-full mt-8 md:h-2" alt="hr" />
        </div>
    )
}
