import CertCard from "./CertCard.js";

import hr from "../assets/curve-hr.svg";
import bac from "../assets/certs/BAC.svg";
import popschool from "../assets/certs/WEB.jpg";
import CDA from "../assets/certs/CDA.jpg";

const timeline = [
  {
    id: "2024",
    title: "Bac +3 Concepteur et développeur d'applications",
    org: "EPSI",
    desc: "Montée en puissance sur le fullstack et la production.",
  },
  {
    id: "2023",
    title: "Certification développeur web",
    org: "Pop'School",
    desc: "Spécialisation front/back et mise en prod de projets web.",
  },
  {
    id: "2020",
    title: "BAC STL",
    org: "Académie de Grenoble",
    desc: "Bases scientifiques et curiosité technique solide.",
  },
];

export default function Certs() {
  return (
    <div id="certs" className="mt-4 text-white">
      <h1 className="text-2xl font-bold">Timeline</h1>
      <p className="font-light text-gray-400">Mon parcours en mode git log.</p>

      <div className="mt-6 space-y-4">
        {timeline.map((item, index) => (
          <div
            key={item.id}
            className="terminal-block p-4 rounded-lg border border-gray-800"
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-delay={index * 100}
          >
            <p className="text-green-400 font-mono">commit {item.id}</p>
            <h2 className="text-lg font-semibold glitch-hover">{item.title}</h2>
            <p className="text-sm text-blue-300">{item.org}</p>
            <p className="text-sm text-gray-300 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-10">Diplômes</h2>
      <p className="font-light text-gray-400">Visuels des certifications.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center mt-4 gap-5">
        <CertCard
          name="BAC STL"
          img={bac}
          issued="l'Académie de grenoble"
          date="2020"
        />
        <CertCard
          name="Certification de développeur web"
          img={popschool}
          issued="Pop'School"
          date="2023"
        />
        <CertCard
          name="Bac +3 Concepteur et développeur d'applications"
          img={CDA}
          issued="l'EPSI"
          date="2024"
        />
      </div>
      <img src={hr} className="w-full mt-8 md:h-2" alt="hr" />
    </div>
  );
}

