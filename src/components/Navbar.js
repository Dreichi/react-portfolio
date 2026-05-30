import { useState } from "react";
import resume from "../assets/CV.pdf";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
      { href: "#home", label: "A propos" },
      { href: "#top-projects", label: "Projets" },
      { href: "#skills", label: "Compétences" },
      { href: "#certs", label: "Timeline" },
      { href: "#contact", label: "Me contacter" },
    ];

    return (
    <div className='fixed z-50 bg-black w-full top-0 left-0 px-8 py-4 lg:px-20 xl:px-36'>
        <div className="flex justify-between items-center text-white">
            <button
                className="md:hidden text-white text-2xl focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
            >
                {menuOpen ? "✕" : "☰"}
            </button>

            <ul className="hidden md:flex">
            {navLinks.map((link) => (
              <li key={link.href} className="p-4">
                <a href={link.href} className="hover:underline">{link.label}</a>
              </li>
            ))}
            </ul>

            <a href={resume} rel="noreferrer" target="_blank" className="cyber-button rounded-full px-4 py-1">CV</a>
        </div>

        {menuOpen && (
          <div className="md:hidden fixed top-[72px] left-0 right-0 bg-black py-4 px-8 z-40 border-t border-gray-800">
            <ul className="flex flex-col items-center gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:underline text-white text-lg"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
    )
}
