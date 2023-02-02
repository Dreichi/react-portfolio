import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SkillCard from "./SkillCard.js"

import javascript from "../assets/skills/javascript.svg"
import angular from "../assets/skills/angular.svg"
import linux from "../assets/skills/linux.svg"
import python from "../assets/skills/python.svg"
import reactIcon from "../assets/skills/react.svg"
import git from "../assets/skills/git.svg"
import html from "../assets/skills/html.svg"
import css from "../assets/skills/css.svg"
import java from "../assets/skills/java.svg"
import sass from "../assets/skills/sass.svg"
import tailwindcss from "../assets/skills/tailwindcss.svg"

import hr from "../assets/curve-hr.svg"

export default function Skills() {
    const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1
      };

    return (
        <div id="skills" className="mt-4 text-white">
            <h1 className="text-2xl font-bold">Compétences</h1>
            <p className="font-light text-gray-400">Voici quelques une de mes compétences</p>

            <div className="mt-4">
                <Slider {...settings}>
                <SkillCard name="linux" experience="5 ans" img={linux} />
                <SkillCard name="python" experience="3 ans " img={python} />
                <SkillCard name="javascript" experience="1 an" img={javascript} />
                <SkillCard name="react" experience="1 an" img={reactIcon} />
                <SkillCard name="Angular" experience="2 ans" img={angular} />
                <SkillCard name="git" experience="2 ans" img={git} />
                <SkillCard name="HTML" experience="2 ans" img={html} />
                <SkillCard name="CSS" experience="2 ans" img={css} />
                <SkillCard name="Java" experience="1 an" img={java} />
                <SkillCard name="Sass" experience="1 an" img={sass} />
                <SkillCard name="TailwindCSS" experience="1 an" img={tailwindcss} />
                </Slider>
            </div>
            <img src={hr} className="w-full mt-8 md:h-3" alt="hr" />
        </div>
    )
}