import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SkillCard from "./SkillCard.js";

import linux from "../assets/skills/linux.svg";
import python from "../assets/skills/python.svg";
import reactIcon from "../assets/skills/react.svg";
import git from "../assets/skills/git.svg";
import html from "../assets/skills/html.svg";
import css from "../assets/skills/css.svg";
import java from "../assets/skills/java.svg";
import sass from "../assets/skills/sass.svg";
import tailwindcss from "../assets/skills/tailwindcss.svg";

import node from "../assets/skills/node.svg";
import mongo from "../assets/skills/mongodb.svg";
import docker from "../assets/skills/docker.svg";
import bash from "../assets/skills/bash.svg";
import nginx from "../assets/skills/nginx.svg";
import typescript from "../assets/skills/typescript.svg";
import postgresql from "../assets/skills/postgresql.svg?url";
import remix from "../assets/skills/remix.svg";
import supabase from "../assets/skills/supabase.svg";

import hr from "../assets/curve-hr.svg";

export default function Skills() {
  const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div id="skills" className="mt-4 text-white">
      <h1 className="text-2xl font-bold">Compétences</h1>
      <p className="font-light text-gray-400">
        Voici quelques unes de mes compétences
      </p>

      <div className="mt-4">
        <Slider {...settings}>
          <SkillCard name="Linux" experience="7 ans" img={linux} />
          <SkillCard name="Python" experience="5 ans" img={python} />
          <SkillCard name="React" experience="3 ans" img={reactIcon} />
          <SkillCard name="Git" experience="4 ans" img={git} />
          <SkillCard name="HTML" experience="4 ans" img={html} />
          <SkillCard name="CSS" experience="4 ans" img={css} />
          <SkillCard name="Java" experience="3 ans" img={java} />
          <SkillCard name="Sass" experience="3 ans" img={sass} />
          <SkillCard name="TailwindCSS" experience="3 ans" img={tailwindcss} />
          <SkillCard name="Node.js" experience="2 ans" img={node} />
          <SkillCard name="MongoDB" experience="2 ans" img={mongo} />
          <SkillCard name="Docker" experience="2 ans" img={docker} />
          <SkillCard name="Bash" experience="2 ans" img={bash} />
          <SkillCard name="Nginx" experience="2 ans" img={nginx} />
          <SkillCard name="TypeScript" experience="2 ans" img={typescript} />
          <SkillCard name="PostgreSQL" experience="2 ans" img={postgresql} />
          <SkillCard name="Remix" experience="2 ans" img={remix} />
          <SkillCard name="Supabase" experience="2 ans" img={supabase} />
        </Slider>
      </div>
      <img src={hr} className="w-full mt-8 md:h-3" alt="hr" />
    </div>
  );
}
