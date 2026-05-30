import { useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const C = {
  gold: "#fdbe04",
  coral: "#fd5f51",
  cyan: "#59e8ff",
  bgDark: "#141414",
  bgPanel: "#1c1c1f",
  bgHeader: "#242427",
  text: "#f0f0f0",
  textDim: "#a0a0a0",
  textMuted: "#787878",
  border: "rgba(255,255,255,0.06)",
};

const mono = { fontFamily: "'Fira Code', 'Source Code Pro', 'Courier New', monospace" };
const sans = { fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" };

export default function Cv() {
  const cvRef = useRef(null);

  const exportPDF = useCallback(async () => {
    if (!cvRef.current) return;
    const canvas = await html2canvas(cvRef.current, { scale: 2, backgroundColor: C.bgDark, logging: false });
    const pdfW = 210;
    const pdfH = (canvas.height * pdfW) / canvas.width;
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdfW, pdfH);
    pdf.save("CV_Louana_Jenger.pdf");
  }, []);

  const SectionTitle = ({ children, align }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, justifyContent: align === "right" ? "flex-end" : "flex-start", flexDirection: align === "right" ? "row-reverse" : "row" }}>
      <span style={{ width: 16, height: 1, background: C.coral, opacity: 0.5, flexShrink: 0 }} />
      <span style={{ ...mono, fontSize: 9, color: C.coral, textTransform: "uppercase", letterSpacing: "0.15em" }}>
        {children}
      </span>
    </div>
  );

  return (
    <div id="cv" style={{ padding: "64px 16px", background: "#0d0d0f" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        <div style={{ textAlign: "right", marginBottom: 16 }}>
          <button
            onClick={exportPDF}
            className="cyber-button"
            style={{ borderRadius: 9999, padding: "6px 20px", fontSize: 12, cursor: "pointer" }}
          >
            Télécharger PDF
          </button>
        </div>

        <div
          ref={cvRef}
          style={{
            display: "flex",
            flexDirection: "row",
            maxWidth: 794,
            margin: "0 auto",
            minHeight: 1123,
            background: C.bgDark,
            border: `1px solid ${C.border}`,
            overflow: "hidden",
          }}
        >
          {/* SIDEBAR */}
          <div style={{
            width: "32%",
            minWidth: 230,
            background: `linear-gradient(180deg, ${C.bgHeader} 0%, ${C.bgDark} 100%)`,
            borderRight: `1px solid ${C.border}`,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            textAlign: "right",
          }}>
            <div>
              <div style={{ ...mono, fontSize: 10, color: C.gold, marginBottom: 14, letterSpacing: "0.05em" }}>
                Informations<span style={{ color: C.cyan }}>@LouPC</span>~
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Louana Jenger</div>
              <div style={{ fontSize: 10, color: C.gold, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Développeuse Fullstack &amp; DevOps
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["📍", "Lens, France"],
                ["✉️", "louana.jenger@gmail.com"],
                ["📞", "07 81 16 27 23"],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, fontSize: 10, color: C.textDim }}>
                  <span>{text}</span>
                  <span style={{ fontSize: 11, color: C.coral, width: 18, textAlign: "center", flexShrink: 0 }}>{icon}</span>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, fontSize: 10 }}>
                <a href="https://dreichi.github.io/react-portfolio" target="_blank" rel="noreferrer" style={{ color: C.cyan, textDecoration: "none", fontSize: 9 }}>
                  Portfolio
                </a>
                <span style={{ fontSize: 11, color: C.coral, width: 18, textAlign: "center", flexShrink: 0 }}>🔗</span>
              </div>
            </div>

            <div>
              <SectionTitle align="right">🧠 Stack</SectionTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "flex-end" }}>
                {["ReactJS","Node.js","TailwindCSS","Docker","AWS","MongoDB","MariaDB","Supabase","Python","TypeScript","Git","Linux"].map(t => (
                  <span key={t} style={{ ...mono, fontSize: 8, padding: "2px 6px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 2, color: C.textDim }}>{t}</span>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle align="right">🗣️ Langues</SectionTitle>
              {[
                ["Français", "Natif"],
                ["Anglais", "B1 (intermédiaire)"],
              ].map(([name, level]) => (
                <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10, padding: "3px 0", borderBottom: `1px solid ${C.border}`, flexDirection: "row-reverse" }}>
                  <span style={{ color: C.textMuted, fontSize: 8 }}>{level}</span>
                  <span style={{ color: C.text }}>{name}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 10, color: C.textDim, lineHeight: 1.5 }}>
              🎯 <strong style={{ color: "#fff" }}>Objectif</strong><br />
              poste <span style={{ color: C.gold }}>Dev/DevOps</span>
            </div>

            <div style={{ fontSize: 9, color: C.textMuted, lineHeight: 1.5, fontStyle: "italic" }}>
              🌸 <strong style={{ color: "#fff", fontStyle: "normal" }}>Profil</strong><br />
              Curieuse, Résiliente, Axée solutions
            </div>

            <div style={{ flex: 1 }} />

            <div>
              <SectionTitle align="right">💼 Formation</SectionTitle>
              <div style={{ fontSize: 9, color: C.textDim, lineHeight: 1.6 }}>
                {[
                  ["2026-2025", "EPSI Arras — Licence DevOPS"],
                  ["2023", "Pop'School — Développeur Web"],
                  ["2021-2022", "IUT Lens — BUT Informatique"],
                  ["2018-2020", "BAC STL — Grenoble"],
                ].map(([yr, txt]) => (
                  <div key={yr}>
                    <span style={{ color: C.gold }}>{yr}</span> {txt}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN */}
          <div style={{ flex: 1, padding: 28, display: "flex", flexDirection: "column", gap: 16, ...sans }}>
            {/* Header divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ flex: 1, height: 1, background: C.border }} />
              <span style={{ ...mono, fontSize: 11, whiteSpace: "nowrap" }}>
                <span style={{ color: C.cyan }}>Projets</span>
                <span style={{ color: C.coral }}>@</span>
                <span style={{ color: C.text }}>Expérience</span>
                <span style={{ color: C.coral }}>~</span>
              </span>
              <span style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <p style={{ fontSize: 10.5, color: C.textDim, lineHeight: 1.65, margin: 0 }}>
              <strong style={{ color: C.text }}>Développeuse spécialisée en DevOps,</strong> je suis passionnée par la création de solutions concrètes à des problèmes complexes. J'aime comprendre comment les systèmes interagissent pour pouvoir <strong style={{ color: C.text }}>automatiser, fiabiliser et fluidifier</strong> les processus de développement.
            </p>
            <p style={{ fontSize: 10, color: C.textDim, lineHeight: 1.65, margin: 0 }}>
              En constante montée en compétences, je recherche aujourd'hui une <strong style={{ color: C.text }}>alternance</strong> dans un environnement stimulant tout en restant ouverte à des opportunités professionnelles dans le monde du <strong style={{ color: C.text }}>développement ou de la cybersécurité.</strong> Curieuse, autonome et investie, j'apprécie particulièrement les projets où je peux apprendre tout en apportant de la valeur rapidement.
            </p>

            {[
              {
                cmd: "cat ~/snap/IciLaProd/experience.txt",
                date: "Octobre 2023 – Avril 2025",
                title: "🏢 Alternance – Développeur DevOps & Fullstack",
                company: "Ici La Prod SAS",
                desc: "Création d'un CRM sur mesure pour les commerciaux. Automatisations via scripts internes pour faciliter le quotidien des équipes. Participation active au développement d'Azenda (plateforme de planification de RDV).",
                tags: ["React", "NodeJS", "PostgreSQL", "Docker"],
              },
              {
                cmd: "cat ~/snap/TalesAndKeys/devlog.txt",
                date: "Mars 2023 – Juin 2023",
                title: "🛠️ Stage – Développeur Web",
                company: "TalesAndKeys",
                desc: "App mobile-first en ReactJS. API NodeJS avec MongoDB. Participation à toutes les étapes : dev front/back, tests, intégration.",
                tags: ["ReactJS", "NodeJS", "MongoDB"],
              },
              {
                cmd: "cat ~/Downloads/DAYREAD/fansub.txt",
                date: "2021 – 2023",
                title: "🌍 Projet personnel – Équipe de fansub",
                company: "DAYREAD",
                desc: "Création et gestion d'un site WordPress pour héberger des épisodes traduits. Gestion de contenu multilingue, SEO, maintenance technique. Coordination d'équipe & publication régulière.",
                tags: ["WordPress", "SEO", "Gestion d'équipe"],
              },
            ].map((exp) => (
              <div key={exp.cmd} style={{ position: "relative", paddingLeft: 14, borderLeft: `1px solid rgba(255,255,255,0.08)`, marginBottom: 2 }}>
                <div style={{ position: "absolute", left: -3, top: 4, width: 5, height: 5, borderRadius: "50%", background: C.gold }} />
                <div style={{ ...mono, fontSize: 9, color: C.cyan, marginBottom: 1 }}>
                  <span style={{ color: C.gold }}>$</span> {exp.cmd}
                </div>
                <div style={{ fontSize: 9.5, color: C.coral, fontWeight: 500, marginBottom: 1 }}>{exp.date}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{exp.title}</div>
                <div style={{ fontSize: 10, color: C.gold, fontWeight: 500, marginBottom: 4 }}>{exp.company}</div>
                <div style={{ fontSize: 9, color: C.textDim, lineHeight: 1.55 }}>{exp.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 5 }}>
                  {exp.tags.map(t => (
                    <span key={t} style={{ ...mono, fontSize: 7.5, padding: "1px 5px", background: "rgba(253,190,4,0.08)", border: "1px solid rgba(253,190,4,0.15)", borderRadius: 2, color: C.gold }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 15 }}>📘</span>
              <span style={{ ...mono, fontSize: 11, color: C.gold }}>Diplômes</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 20px" }}>
              {[
                ["2024", "Licence Concepteur & Développeur d'Applications", "EPSI"],
                ["2023", "Certification Développeur Web", "Pop'School"],
                ["2020", "BAC Sciences et Techniques de Laboratoires", "Grenoble"],
              ].map(([year, name, school]) => (
                <div key={year} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ ...mono, fontSize: 10.5, fontWeight: 600, color: C.gold, whiteSpace: "nowrap", minWidth: 34 }}>{year}</span>
                  <div>
                    <div style={{ fontSize: 9.5, color: C.text, fontWeight: 500 }}>{name}</div>
                    <div style={{ fontSize: 8.5, color: C.textMuted }}>{school}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <span style={{ fontSize: 15 }}>💼</span>
                <span style={{ ...mono, fontSize: 11, color: C.gold }}>Formation</span>
                <span style={{ flex: 1, height: 1, background: C.border }} />
              </div>
              <div style={{ position: "relative", paddingTop: 8 }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: C.border, transform: "translateY(-50%)" }} />
                <div style={{ display: "flex", justifyContent: "space-between", position: "relative", gap: 6 }}>
                  {[
                    { years: "2026 → 2025", title: "EPSI Arras", sub: "Licence DevOPS", active: true },
                    { years: "2023 → 2023", title: "Pop'School", sub: "Développeur Web/Web mobile" },
                    { years: "2021 → 2022", title: "IUT Lens", sub: "BUT informatique" },
                    { years: "2018 → 2020", title: "BAC STL", sub: "Sciences et Techniques de Laboratoires" },
                  ].map((entry) => (
                    <div key={entry.title} style={{ textAlign: "center", flex: 1, paddingTop: 18, position: "relative", minWidth: 0 }}>
                      <div style={{
                        position: "absolute",
                        top: "calc(50% + 9px)",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        zIndex: 1,
                        background: entry.active ? C.cyan : C.gold,
                        boxShadow: entry.active ? `0 0 6px ${C.cyan}66` : "none",
                      }} />
                      <div style={{ ...mono, fontSize: 7.5, color: C.coral, marginBottom: 4, letterSpacing: "0.04em" }}>{entry.years}</div>
                      <div style={{ fontSize: 8.5, fontWeight: 600, color: entry.active ? C.cyan : C.text, lineHeight: 1.25, marginBottom: 1 }}>{entry.title}</div>
                      <div style={{ fontSize: 7, color: C.textMuted, lineHeight: 1.25 }}>{entry.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
