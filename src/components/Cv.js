import { useRef, useState, useEffect, useLayoutEffect, useCallback, Fragment } from "react";
import { toCanvas } from "html-to-image";
import { jsPDF } from "jspdf";
import portrait from "../assets/cv-portrait.png";
import qr from "../assets/cv-qr.png";

const C = {
  green:  "#8ae234",
  blue:   "#729fcf",
  yellow: "#e9b96e",
  white:  "#eeeeec",
  text:   "#cfcfcf",
  body:   "#9a9a9a",
  dim:    "#606060",
  dotY:   "#fdbe04",
  dotR:   "#fd5f51",
  bgDark:   "#141414",
  bgPanel:  "#1c1c1f",
  bgHeader: "#2a2a2d",
  bgNano:   "#252528",
  bgTerm:   "#161618",
  border:   "rgba(255,255,255,0.08)",
  folderBlue: "#5b8cc8",
};

const mono = { fontFamily: "'Fira Code', 'Source Code Pro', monospace" };
const sans = { fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" };

const identity = {
  name: "Louana Jenger",
  title: "Data / AI Engineer · Fullstack & DevOps",
};

const contact = [
  ["Localisation", "Lens, France",                      C.text],
  ["Email",        "louana.jenger@gmail.com",           C.text],
  ["Téléphone",    "07 81 16 27 23",                    C.text],
  ["Portfolio",    "dreichi.github.io/react-portfolio", C.blue],
  ["Permis",       "B (en cours)",                      C.text],
];

const stack = [
  "Python, FastAPI, SQL (PostgreSQL, MariaDB)",
  "Qdrant, Ollama, RAG, embeddings, LoRA/QLoRA",
  "Docker, Linux, Git, systemd, AWS",
  "React, Node.js, TypeScript (web)",
];

const langues = [
  ["Français", "Natif"],
  ["Anglais", "B1 (intermédiaire)"],
];

const objectif = "Alternance Data / AI Engineer";
const profil = "Curieuse · Résiliente · Axée solutions";

const bioText = [
  "Développeuse orientée Data & IA, j'aime résoudre des problèmes complexes en prenant le temps d'en considérer les différents aspects — technique, métier et usage. Je cherche à construire des choses fiables, qui ont du sens et une utilité concrète.",
  "Je recherche une alternance de Data / AI Engineer dans un environnement stimulant, où je peux apprendre vite tout en apportant de la valeur. Curieuse, rigoureuse et à l'écoute.",
];

const projets = [
  {
    file: "~/projects/erp-rag/README.md",
    date: "Début 2026",
    role: "💼 Projet personnel – Data / AI Engineer",
    company: "ERP Script Finder (RAG local + LLM fine-tuné)",
    lines: [
      "🔎 Recherche en langage naturel sur 23 094 scripts ERP (Delphi/WinDev), 100% local",
      "🧬 Qdrant · recherche hybride BM25 + dense · HyDE · reranking Jina v2",
      "🎯 Fine-tuning Qwen3.5-35B quantifié (LoRA/QLoRA, Unsloth) · 33k exemples · GPU RunPod",
      "🚀 API FastAPI en production (systemd) · 89/100 aux tests · ~7 ms/requête",
    ],
  },
  {
    file: "~/Downloads/DAYREAD/fansub.txt",
    date: "2021 – 2023",
    role: "💼 Projet personnel – Équipe de fansub",
    company: "DAYREAD",
    lines: [
      "🗂 Site WordPress hébergeant des épisodes traduits",
      "💬 Sous-titrage anglais → français (traduction & adaptation)",
      "🌍 Contenu multilingue, SEO, maintenance technique",
      "🤝 Coordination d'équipe & publication régulière",
    ],
  },
];

const experiencesPro = [
  {
    file: "~/snap/IciLaProd/experience.txt",
    date: "Octobre 2023 – Avril 2025",
    role: "💼 Alternance – Développeur DevOps & Fullstack",
    company: "Ici La Prod SAS",
    lines: [
      "🧠 CRM sur mesure centralisant les données de l'équipe commerciale (~5 users)",
      "🔁 Itérations rapides avec retours directs des utilisateurs pour corriger & améliorer",
      "🛠 Automatisations internes pour fluidifier le travail des équipes",
      "🗓 Dév. d'Azenda (planification de RDV) · React, NodeJS, PostgreSQL, Docker",
    ],
  },
  {
    file: "~/snap/TalesAndKeys/devlog.txt",
    date: "Mars 2023 – Juin 2023",
    role: "💼 Stage – Développeur Web",
    company: "TalesAndKeys",
    lines: [
      "🛠 App mobile-first en ReactJS",
      "🔗 API NodeJS avec MongoDB",
      "🧩 Toutes les étapes : front/back, tests, intégration",
    ],
  },
];

const diplomas = [
  { perms: "-rw-r--r--", year: "2024", icon: "📘", name: "Licence Concepteur & Dév. d'Applications", school: "EPSI Arras" },
  { perms: "-rw-r--r--", year: "2023", icon: "💻", name: "Certification Développeur Web",             school: "Pop'School" },
  { perms: "-rw-r--r--", year: "2020", icon: "🔬", name: "BAC Sciences et Techniques de Labo.",       school: "Grenoble" },
];

const formationFolders = [
  { years: "2026...", label: "" },
  { years: "2023\n-\n2025", label: "EPSI Arras - Licence DevOPS" },
  { years: "2022\n-\n2023", label: "Popschool - Dév. Web/mobile" },
  { years: "2021\n-\n2022", label: "IUT Lens - BUT informatique" },
  { years: "2018\n-\n2020", label: "BAC STL - Sciences Labo." },
];

const SHEET_W = 794;

const asciiPdf = (s) => s
  .replace(/→/g, "->")
  .replace(/[–—]/g, "-")
  .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}️‍]/gu, "")
  .replace(/\s+/g, " ")
  .trim();

const buildAtsLines = () => {
  const out = [];
  out.push(identity.name);
  out.push(identity.title);
  out.push("");
  contact.forEach(([k, v]) => out.push(`${k}: ${v}`));
  out.push("");
  out.push("Profil");
  bioText.forEach((p) => out.push(p));
  out.push("");
  out.push("Competences");
  out.push("Stack: " + stack.join(", "));
  out.push("Langues: " + langues.map(([k, v]) => `${k} (${v})`).join(", "));
  out.push("");
  out.push("Projets Personnels");
  projets.forEach((p) => {
    out.push(`${p.role} - ${p.company} (${p.date})`);
    p.lines.forEach((ln) => out.push(ln));
    out.push("");
  });
  out.push("Experience Professionnelle");
  experiencesPro.forEach((p) => {
    out.push(`${p.role} - ${p.company} (${p.date})`);
    p.lines.forEach((ln) => out.push(ln));
    out.push("");
  });
  out.push("Diplomes");
  diplomas.forEach((d) => out.push(`${d.year} - ${d.name} (${d.school})`));
  return out;
};

function WinDots() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      <span style={{ width: 11, height: 11, borderRadius: "50%", background: C.dotY }} />
      <span style={{ width: 11, height: 11, borderRadius: "50%", background: C.dotR }} />
    </div>
  );
}

function WinBar({ title }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: C.bgHeader, padding: "0 14px", height: 30,
      borderBottom: `1px solid ${C.border}`, gap: 8,
    }}>
      <span style={{ ...mono, fontSize: 11, color: C.dim }}>🔍</span>
      <span style={{ flex: 1, textAlign: "center", ...mono, fontSize: 11 }}>{title}</span>
      <WinDots />
    </div>
  );
}

function Win({ title, children, style, bodyBg }) {
  return (
    <div style={{
      background: bodyBg || C.bgPanel,
      border: `1px solid ${C.border}`,
      borderRadius: 8, overflow: "hidden",
      display: "flex", flexDirection: "column",
      ...style,
    }}>
      <WinBar title={title} />
      {children}
    </div>
  );
}

function PromptTitle({ topic, host }) {
  return (
    <span style={mono}>
      <span style={{ color: C.green }}>{topic}</span>
      <span style={{ color: C.green }}>@</span>
      <span style={{ color: C.green }}>{host}</span>
      <span style={{ color: C.blue }}>~</span>
    </span>
  );
}

function Prompt({ children }) {
  return (
    <>
      <span style={{ color: C.green }}>louana@portfolio</span>
      <span style={{ color: C.body }}>:</span>
      <span style={{ color: C.blue }}>~</span>
      <span style={{ color: C.body }}>$ </span>
      {children}
    </>
  );
}

function TerminalPanel({ topic, host, entries, style }) {
  return (
    <Win bodyBg={C.bgTerm} style={style} title={<PromptTitle topic={topic} host={host} />}>
      <div style={{ flex: 1, padding: "13px 15px", ...mono, fontSize: 9, lineHeight: 1.6, display: "flex", flexDirection: "column" }}>
        <div>
          {entries.map((exp, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 4 }}>
                <Prompt>
                  <span style={{ color: C.white }}>cat </span>
                  <span style={{ color: C.blue }}>{exp.file}</span>
                </Prompt>
              </div>
              <div style={{ color: C.white, fontWeight: 700, fontSize: 10 }}>{exp.role}</div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                <span style={{ color: C.blue, fontWeight: 600 }}>🏢 {exp.company}</span>
                <span style={{ color: C.green, fontWeight: 600, flexShrink: 0 }}>{exp.date}</span>
              </div>
              {exp.lines.map((line, j) => (
                <div key={j} style={{ color: C.body }}>{line}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto" }}>
          <Prompt>
            <span style={{ color: C.green }}>▊</span>
          </Prompt>
        </div>
      </div>
    </Win>
  );
}

function Folder({ years, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative", width: 72, height: 56 }}>
        <div style={{
          position: "absolute", top: 0, left: 0, width: 26, height: 8,
          background: C.folderBlue, borderRadius: "3px 3px 0 0", filter: "brightness(0.8)",
        }} />
        <div style={{
          position: "absolute", top: 7, left: 0, right: 0, bottom: 0,
          background: C.folderBlue, borderRadius: "1px 6px 6px 6px",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px",
        }}>
          <span style={{ ...mono, fontSize: 8.5, color: "#fff", fontWeight: 700, textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.2 }}>
            {years}
          </span>
        </div>
      </div>
      {label && (
        <span style={{ ...mono, fontSize: 7, color: C.body, textAlign: "center", lineHeight: 1.3, maxWidth: 92 }}>
          {label}
        </span>
      )}
    </div>
  );
}

export default function Cv() {
  const cvRef = useRef(null);
  const scrollRef = useRef(null);
  const zoomLayerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [navH, setNavH] = useState(64);
  const zoomIn = () => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(0.4, +(z - 0.1).toFixed(2)));
  const resetZoom = () => setZoom(1);
  const fitWidth = useCallback(() => {
    const cont = scrollRef.current;
    if (!cont) return;
    const avail = cont.clientWidth - 48;
    setZoom(Math.max(0.4, Math.min(1, +(avail / SHEET_W).toFixed(2))));
  }, []);

  useEffect(() => {
    const update = () => {
      const nav = document.querySelector(".fixed.z-50");
      if (nav) setNavH(Math.round(nav.getBoundingClientRect().height));
      const cont = scrollRef.current;
      if (cont && cont.clientWidth < SHEET_W + 48) fitWidth();
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, [fitWidth]);

  const zoomRef = useRef(1);
  zoomRef.current = zoom;
  const prevZoomRef = useRef(1);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const k = zoom / prevZoomRef.current;
    if (k !== 1) {
      el.scrollLeft = (el.scrollLeft + el.clientWidth / 2) * k - el.clientWidth / 2;
      el.scrollTop = (el.scrollTop + el.clientHeight / 2) * k - el.clientHeight / 2;
    }
    prevZoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let startDist = 0;
    let startZoom = 1;
    const dist = (t) =>
      Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const onStart = (e) => {
      if (e.touches.length === 2) {
        startDist = dist(e.touches);
        startZoom = zoomRef.current;
      }
    };
    const onMove = (e) => {
      if (e.touches.length === 2 && startDist > 0) {
        e.preventDefault();
        const ratio = dist(e.touches) / startDist;
        setZoom(Math.max(0.4, Math.min(2, +(startZoom * ratio).toFixed(2))));
      }
    };
    const onEnd = (e) => {
      if (e.touches.length < 2) startDist = 0;
    };
    el.addEventListener("touchstart", onStart, { passive: false });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  const exportPDF = useCallback(async () => {
    if (!cvRef.current) return;
    const zl = zoomLayerRef.current;
    const prevZoom = zl ? zl.style.zoom : "";
    if (zl) zl.style.zoom = "1";
    let canvas;
    try {
      canvas = await toCanvas(cvRef.current, {
        pixelRatio: 3, backgroundColor: C.bgDark, cacheBust: true,
      });
    } finally {
      if (zl) zl.style.zoom = prevZoom;
    }

    const pageW = 210;
    const pageH = +(pageW * canvas.height / canvas.width).toFixed(1);
    const pdf = new jsPDF({ orientation: "p", unit: "mm", format: [pageW, pageH] });

    const targetBytes = 2.7 * 1024 * 1024;
    let img = canvas.toDataURL("image/jpeg", 0.95);
    for (const q of [0.9, 0.86, 0.82, 0.78, 0.72]) {
      if ((img.length * 3) / 4 <= targetBytes) break;
      img = canvas.toDataURL("image/jpeg", q);
    }

    pdf.addImage(img, "JPEG", 0, 0, pageW, pageH);

    const tm = 8;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    const wrapped = [];
    buildAtsLines().forEach((ln) => {
      const s = asciiPdf(ln || "");
      if (!s) { wrapped.push(""); return; }
      pdf.splitTextToSize(s, pageW - tm * 2).forEach((w) => wrapped.push(w));
    });
    const lh = Math.min(3.2, (pageH - tm * 2) / Math.max(wrapped.length, 1));
    let ty = tm + lh;
    wrapped.forEach((ln) => {
      if (ln) pdf.text(ln, tm, ty, { renderingMode: "invisible" });
      ty += lh;
    });

    pdf.save("CV_Louana_Jenger.pdf");
  }, []);


  const zbtn = {
    borderRadius: 6, minWidth: 30, height: 28, padding: "0 8px",
    fontSize: 13, cursor: "pointer", display: "inline-flex",
    alignItems: "center", justifyContent: "center",
  };

  return (
    <div style={{
      height: "100dvh", paddingTop: navH, boxSizing: "border-box",
      background: "#0d0d0f", display: "flex", flexDirection: "column",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 14, flexWrap: "wrap",
        padding: "10px 24px", borderBottom: `1px solid ${C.border}`,
        background: "rgba(13,13,15,0.92)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button onClick={zoomOut} className="cyber-button" style={zbtn} aria-label="Dézoomer">−</button>
          <button onClick={resetZoom} className="cyber-button" style={{ ...zbtn, minWidth: 54 }}>{Math.round(zoom * 100)}%</button>
          <button onClick={zoomIn} className="cyber-button" style={zbtn} aria-label="Zoomer">+</button>
          <button onClick={fitWidth} className="cyber-button" style={{ ...zbtn, padding: "0 12px" }}>Ajuster</button>
        </div>
        <button onClick={exportPDF} className="cyber-button"
          style={{ ...zbtn, padding: "0 14px" }}>
          ⬇ Télécharger
        </button>
      </div>

      <div ref={scrollRef} style={{
        flex: 1, overflow: "auto", padding: "16px 24px",
        background: C.bgDark,
        WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y",
        overscrollBehavior: "contain",
      }}>
        <div ref={zoomLayerRef} style={{ width: SHEET_W, margin: "0 auto", zoom }}>
          <div ref={cvRef} style={{
            display: "flex", flexDirection: "column", gap: 7,
            background: C.bgDark, padding: 7, borderRadius: 12,
          }}>

          <div style={{ display: "flex", gap: 7, alignItems: "stretch" }}>

            <Win style={{ flex: 7 }} title={<PromptTitle topic="Informations" host="LouPC" />}>
              <div style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", gap: 16, marginBottom: 12, alignItems: "flex-start" }}>
                  <img src={portrait} alt="Louana Jenger"
                    style={{ width: 86, flexShrink: 0, display: "block", borderRadius: 4 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ ...sans, fontSize: 18, fontWeight: 700, color: C.white, lineHeight: 1.1, marginBottom: 3 }}>
                      {identity.name}
                    </div>
                    <div style={{ ...mono, fontSize: 9.5, color: C.blue, marginBottom: 9 }}>
                      Data / AI Engineer · Fullstack &amp; DevOps
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      {contact.map(([lbl, val, col]) => (
                        <div key={lbl} style={{ ...mono, fontSize: 9, display: "flex", gap: 8 }}>
                          <span style={{ color: C.yellow, minWidth: 72, flexShrink: 0 }}>{lbl}</span>
                          <span style={{ color: col }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <img src={qr} alt="QR"
                    style={{ width: 54, flexShrink: 0, background: "#fff", padding: 2, borderRadius: 2 }} />
                </div>

                <div style={{ marginBottom: 7 }}>
                  <div style={{ ...mono, fontSize: 9.5, color: C.yellow, marginBottom: 4 }}>🧠 Stack</div>
                  <div style={{ ...mono, fontSize: 9, color: C.body, lineHeight: 1.7 }}>
                    {stack.map((s) => (
                      <Fragment key={s}>- {s}<br /></Fragment>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 7 }}>
                  <div style={{ ...mono, fontSize: 9.5, color: C.yellow, marginBottom: 4 }}>🗣 Langues</div>
                  <div style={{ ...mono, fontSize: 9, color: C.body }}>
                    {langues.map(([k, v], i) => (
                      <Fragment key={k}>
                        {i > 0 ? "   " : ""}{k} : <span style={{ color: C.white }}>{v}</span>
                      </Fragment>
                    ))}
                  </div>
                </div>

                <div style={{ ...mono, fontSize: 9, display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <span>
                    <span style={{ color: C.yellow }}>🎯 Objectif </span>
                    <span style={{ color: C.white, fontWeight: 600 }}>{objectif}</span>
                  </span>
                  <span>
                    <span style={{ color: C.yellow }}>🌸 Profil </span>
                    <span style={{ color: C.body }}>{profil}</span>
                  </span>
                </div>
              </div>
            </Win>

            <div style={{
              flex: 3, background: C.bgPanel, border: `1px solid ${C.border}`,
              borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column",
            }}>
              <WinBar title={<span style={{ ...mono, fontSize: 11, color: C.text }}>nano</span>} />
              <div style={{
                background: C.bgNano, padding: "4px 12px", borderBottom: `1px solid ${C.border}`,
                display: "flex", justifyContent: "space-between", alignItems: "center", lineHeight: 1, ...mono, fontSize: 8, color: C.body,
              }}>
                <span>GNU nano 8.3</span>
                <span style={{ color: C.white }}>New Buffer</span>
                <span>Modified</span>
              </div>
              <div style={{ flex: 1, padding: "12px", ...sans, fontSize: 10, color: C.body, lineHeight: 1.7 }}>
                <p style={{ margin: "0 0 10px 0" }}>
                  Développeuse orientée <strong style={{ color: C.text }}>Data &amp; IA</strong>,
                  j'aime résoudre des problèmes complexes en prenant le temps d'en considérer
                  les différents aspects — technique, métier et usage. Je cherche à construire
                  des choses fiables, qui ont du sens et une utilité concrète.
                </p>
                <p style={{ margin: 0 }}>
                  Je recherche une <strong style={{ color: C.text }}>alternance de Data / AI
                  Engineer</strong> dans un environnement stimulant, où je peux apprendre vite
                  tout en apportant de la valeur. Curieuse, rigoureuse et à l'écoute.
                </p>
              </div>
              <div style={{ background: C.bgNano, borderTop: `1px solid ${C.border}`, display: "flex", flexWrap: "wrap", padding: "2px 4px" }}>
                {[["^G","Help"],["^X","Exit"],["^O","Write Out"],["^R","Read Fil"],["^W","Where Is"],["^K","Cut"],["^U","Paste"]].map(([k, l]) => (
                  <span key={k} style={{ ...mono, fontSize: 7, padding: "2px 4px", color: C.body }}>
                    <span style={{ background: C.body, color: "#111", padding: "0 2px" }}>{k}</span> {l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 7, alignItems: "stretch" }}>
            <TerminalPanel topic="Projets" host="perso" entries={projets} style={{ flex: 1 }} />
            <TerminalPanel topic="Expérience" host="pro" entries={experiencesPro} style={{ flex: 1 }} />
          </div>

          <div style={{ display: "flex", gap: 7, alignItems: "stretch" }}>

            <Win style={{ width: "36%", flexShrink: 0 }} title={<span style={{ ...mono, fontSize: 11, color: C.text }}>Diplômes</span>}>
              <div style={{ padding: "11px 14px", ...mono, fontSize: 9 }}>
                <div style={{ marginBottom: 5 }}>
                  <span style={{ color: C.green }}>louana@portfolio</span>
                  <span style={{ color: C.body }}>:</span>
                  <span style={{ color: C.blue }}>~</span>
                  <span style={{ color: C.body }}>$ </span>
                  <span style={{ color: C.white }}>ls -l </span>
                  <span style={{ color: C.blue }}>~/.diplomas/</span>
                </div>
                <div style={{ color: C.dim, marginBottom: 8 }}>total 3</div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "max-content max-content 1fr",
                  columnGap: 10, rowGap: 9, alignItems: "start",
                }}>
                  {diplomas.map((d) => (
                    <Fragment key={d.year}>
                      <span style={{ color: C.dim }}>{d.perms}</span>
                      <span style={{ color: C.text }}>{d.year}</span>
                      <span style={{ lineHeight: 1.4 }}>
                        <span style={{ color: C.white }}>{d.icon} {d.name}</span>
                        <span style={{ color: C.dim }}> · {d.school}</span>
                      </span>
                    </Fragment>
                  ))}
                </div>
              </div>
            </Win>

            <div style={{ flex: 1, background: C.bgPanel, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
              <div style={{
                display: "flex", alignItems: "center", background: C.bgHeader,
                borderBottom: `1px solid ${C.border}`, padding: "0 14px", height: 30, gap: 10,
              }}>
                <span style={{ ...mono, fontSize: 11, color: C.white, fontWeight: 600 }}>Files</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                  <span style={{ color: C.dim, fontSize: 13 }}>‹</span>
                  <span style={{ color: C.dim, fontSize: 13 }}>›</span>
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, padding: "3px 8px", display: "flex", alignItems: "center" }}>
                    <span style={{ ...mono, fontSize: 9.5, color: C.body, lineHeight: 1 }}>📁 Formation</span>
                  </div>
                </div>
                <WinDots />
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ width: 96, borderRight: `1px solid ${C.border}`, padding: "8px 0", flexShrink: 0 }}>
                  {[
                    ["📁 Formation", true],
                    ["🕘 Recent",    false],
                    ["⭐ Starred",   false],
                    ["🗑 Trash",     false],
                    ["📄 Documents", false],
                    ["🖼 Pictures",  false],
                  ].map(([item, active]) => (
                    <div key={item} style={{
                      ...mono, fontSize: 8.5, padding: "5px 10px",
                      color: active ? C.white : C.dim,
                      background: active ? "rgba(114,159,207,0.16)" : "transparent",
                      borderLeft: active ? `2px solid ${C.blue}` : "2px solid transparent",
                    }}>
                      {item}
                    </div>
                  ))}
                </div>

                <div style={{
                  flex: 1, padding: "14px 18px",
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px 8px", justifyItems: "center", alignItems: "start",
                }}>
                  {formationFolders.map((f) => <Folder key={f.years} years={f.years} label={f.label} />)}
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}
