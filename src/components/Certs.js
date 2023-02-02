import CertCard from "./CertCard.js"

import hr from "../assets/curve-hr.svg"
import bac from "../assets/certs/BAC.svg"
import popschool from "../assets/certs/popschool.svg"


export default function Certs(){
    return (
        <div id="certs" className="mt-4 text-white">
            <h1 className="text-2xl font-bold">Diplômes</h1>
            <p className="font-light text-gray-400">Voici mes diplômes</p>

            <div className="grid grid-cols-1 md:grid-cols-3 justify-center mt-4 gap-5">
                <CertCard name="BAC STL" img={bac} issued="l'Académie de grenoble" date="2020" />
                <CertCard name="Certification de développeur web (en cours)" img={popschool} issued="Pop'School" date="2023" />

            </div>
            <img src={hr} className="w-full mt-8 md:h-2" alt="hr" />
        </div>
    )
}
