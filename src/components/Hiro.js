import { useState, useRef, useEffect } from "react";

import profile from "../assets/image.png";
import resume from "../assets/CV.pdf";
import hr from "../assets/curve-hr.svg";

export default function Hiro() {
  const [loaded, setLoaded] = useState(true);
  const [command, setCommand] = useState("");
  const [showCV, setShowCV] = useState(false);
  const [history, setHistory] = useState([
    '[louana@portfolio]$ echo "Chargement du profil terminé."',
    "[system] Bienvenue dans l'environnement shell personnel de Louana.",
    '[system] Tapez "help" pour découvrir les options disponibles.',
  ]);

  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = command.trim().toLowerCase();
      let output = "";
      switch (cmd) {
        case "help":
          output =
            "Commandes : whoami, uptime, github, linkedin, cv, clear, sudo, sayhello, ascii, eject, weather, motivation";
          break;
        case "whoami":
          output =
            "Louana Jenger (aka louanyaa) – Développeuse Fullstack & DevOps";
          break;
        case "uptime":
          output =
            "Système actif depuis 2021, prêt à être déployé en production.";
          break;
        case "github":
          output =
            '<a href="https://github.com/Dreichi" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">🔗 github.com/Dreichi</a>';
          break;
        case "linkedin":
          output =
            '<a href="https://www.linkedin.com/in/louana-jenger-a46391209/" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">🔗 linkedin.com/in/louana-jenger</a>';
          break;
        case "cv":
          setShowCV(true);
          output = "📄 Ouverture du CV...";
          break;
        case "sayhello":
          output = "👋 Hello, world! Bienvenue dans mon terminal personnel.";
          break;
        case "sudo":
          output =
            "⛔️ Permission refusée. Vous n'avez pas les droits administrateur ici.";
          break;
        case "ascii":
          output = `   /\\_/\\\n  ( o.o )\n   > ^ <   ← Un p'tit chat ASCII te souhaite la bienvenue !`;
          break;
        case "eject":
          output =
            "💥 Éjection impossible. Ce terminal est sécurisé contre les intrusions.";
          break;
        case "weather":
          output =
            "☁️ Lens, France : 18°C – Nuageux, idéal pour coder tranquille.";
          break;
        case "motivation":
          output =
            '🚀 "Code is like humor. When you have to explain it, it’s bad." – Cory House';
          break;
        case "clear":
          setHistory([]);
          setCommand("");
          return;
        default:
          output = `Commande inconnue : ${cmd}`;
      }

  setHistory((prev) => [...prev, `[louana@portfolio]$ ${command}`, ""]);

      const lines = output.split("\n");
      let delay = 0;
      lines.forEach((line) => {
        const chars = line.split("");
        let typedLine = "";
        chars.forEach((char, index) => {
          delay += 10;
          setTimeout(() => {
            typedLine += char;
            setHistory((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = typedLine;
              return updated;
            });
          }, delay);
        });
        delay += 50;
        setTimeout(() => {
          setHistory((prev) => [...prev, ""]);
        }, delay);
      });

      setTimeout(() => {
        setCommand("");
      }, delay + 100);
    }
  };

  return (
    <>
      {loaded ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-black flex flex-col items-start justify-center px-8 text-green-400 font-mono text-sm">
          <p> Initialisation du portfolio...</p>
          <p> Lancement de ./hiro.sh --profile louanyaa</p>
          <p className="animate-pulse">_</p>
        </div>
      ) : null}

      <div
        id="home"
        className="flex w-full h-screen flex-col md:flex-row gap-5 items-center justify-center text-white relative bg-[#0f0f0f]"
      >
        <div className="md:w-3/6 md:p-4">
          <img
            data-aos="flip-right"
            data-aos-duration="1500"
            data-aos-offset="200"
            src={profile}
            alt="profile"
            onLoad={() => setLoaded(false)}
            className="rounded-3xl shadow-lg"
          />
        </div>

        <div
          className="md:w-3/6 px-6"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-offset="100"
        >
          <div className="flex flex-col w-full mt-8">
            <p className="text-md font-mono text-purple-400"> whoami</p>
            <h1 className="text-3xl font-bold text-white">
              Louana Jenger (aka louanyaa)
            </h1>

            <p className="text-xl font-semibold text-green-400 mt-1">
              Développeuse Fullstack & DevOps
            </p>

            <p className="text-md text-gray-300 mt-3">
              Passionnée par les environnements techniques complexes et les défis
              concrets, je conçois des outils utiles, durables, et souvent
              sur-mesure. <br />
              En alternance chez{" "}
              <span className="text-blue-400 font-semibold">Ici La Prod</span>,
              j’ai développé un CRM complet, automatisé des tâches internes et
              contribué à la plateforme Azenda. <br />
              J’aime résoudre des problèmes, apprendre vite, et rendre la tech
              plus fluide pour les autres.
            </p>
          </div>

          <div
            ref={terminalRef}
            className=" no-scrollbar mt-6 bg-black/50 p-4 rounded shadow-inner border border-gray-700 font-mono text-sm text-gray-300 max-h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
          >
            {history.map((line, i) => (
              <p
                key={i}
                className={
                  line.startsWith("[") ? "text-green-400" : "text-gray-300"
                }
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
            <div className="flex items-center">
              <span className="text-green-400">[louana@portfolio]$</span>
              <input
                className="bg-transparent outline-none text-white ml-2 w-full"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleCommand}
                autoFocus
              />
              <span className="ml-1 animate-pulse">_</span>
            </div>
          </div>
        </div>

        <img src={hr} className="w-full md:h-2 absolute bottom-0" alt="hr" />
      </div>

      {showCV && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="w-[90vw] h-[90vh] bg-white p-4 rounded shadow-xl relative">
            <button
              onClick={() => setShowCV(false)}
              className="absolute top-2 right-2 text-black text-sm"
            >
              Fermer ✖
            </button>
            <iframe
              src={resume}
              className="w-full h-full"
              title="CV PDF"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
