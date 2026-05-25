export default function SkillCard(props){
    return (
        <div data-aos="fade-up" data-aos-duration="500" data-aos-offset="100" className="w-11/12 p-4 text-center justify-center border border-gray-800 bg-black/60 rounded-md flex flex-col h-48 neon-card">
            <img src={props.img} className="w-20 max-h-20 mx-auto" alt={props.name}></img>
            <div className="mt-2">
                <h1 className="font-bold md:text-xl glitch-hover">{props.name}</h1>
                <p className="font-light md:text-lg">{props.experience} d'expérience</p>
            </div>
        </div>
    )
}

