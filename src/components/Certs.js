import CertCard from "./CertCard.js";

import hr from "../assets/curve-hr.svg";
import bac from "../assets/certs/BAC.svg";
import popschool from "../assets/certs/WEB.jpg";
import CDA from "../assets/certs/CDA.jpg";

const timeline = [
  {
    hash: "a4f3b2c",
    year: "2024",
    title: "Licence CDA – EPSI",
    org: "Concepteur Développeur d'Applications",
    desc: "Montée en puissance sur le fullstack et la production.",
    tag: "diploma",
  },
  {
    hash: "8e1d9f7",
    year: "2023",
    title: "Alternance DevOps & Fullstack",
    org: "Ici La Prod SAS",
    desc: "CRM sur mesure, automatisations, contribution à Azenda (React, Node, PostgreSQL, Docker).",
    tag: "work",
  },
  {
    hash: "f2a8c1e",
    year: "2023",
    title: "Stage Développeur Web",
    org: "TalesAndKeys",
    desc: "App mobile-first React, API Node.js/MongoDB, dev front/back.",
    tag: "work",
  },
  {
    hash: "3c7a0b5",
    year: "2023",
    title: "Certification Développeur Web",
    org: "Pop'School",
    desc: "Spécialisation front/back et mise en prod de projets web.",
    tag: "diploma",
  },
  {
    hash: "d2e6f91",
    year: "2020",
    title: "BAC STL",
    org: "Académie de Grenoble",
    desc: "Bases scientifiques et curiosité technique solide.",
    tag: "diploma",
  },
];

export default function Certs() {
  return (
    <div id="certs" className="mt-4 text-white">
      <h1 className="text-2xl font-bold">Timeline</h1>
      <p className="font-light text-gray-400">Mon parcours des premiers commits à aujourd'hui.</p>

      <div className="mt-8 relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-800" />

        <div className="space-y-8">
          {timeline.map((item, index) => (
            <div
              key={item.hash}
              className={`relative flex flex-col md:flex-row gap-4 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={index * 100}
            >
              <div className="absolute left-4 md:left-1/2 w-2.5 h-2.5 bg-green-400 rounded-full -translate-x-1/2 mt-6 z-10 ring-4 ring-black" />

              <div className="flex-1 md:w-1/2" />

              <div className="flex-1 md:w-1/2">
                <div className="terminal-block p-4 rounded-lg ml-8 md:ml-0 md:mx-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded font-mono ${
                        item.tag === "work"
                          ? "bg-green-400/15 text-green-400 border border-green-400/20"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {item.tag === "work" ? "merge" : "commit"}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{item.hash}</span>
                    <span className="text-xs text-gray-600 ml-auto">{item.year}</span>
                  </div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-400">{item.org}</p>
                  <p className="text-sm text-gray-300 mt-2">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold mt-12">Diplômes</h2>
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

