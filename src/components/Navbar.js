import logo from '../assets/logo.svg';
import resume from "../assets/CV.pdf"

export default function Navbar() {
    return (
    <div className='fixed z-50 bg-dark-500 w-full top-0 left-0 px-8 py-4 lg:px-20 xl:px-36'>
        <div className="flex justify-between items-center text-white">
            <img src={logo} className="App-logo w-10 rounded-full" alt="logo" />
            <ul className="hidden md:flex">
            <li className="p-4"><a href="#home" className="hover:underline">A propos</a></li>
            <li className="p-4"><a href="#skills" className="hover:underline">Compétences</a></li>
            <li className="p-4"><a href="#contact" className="hover:underline">Me contacter</a></li>
            <li className="p-4"><a href="#certs" className="hover:underline">Diplômes</a></li>
            </ul>
            <a href={resume} rel="noreferrer" target="_blank" className=" bg-teal-500 rounded-full px-4 py-1 border border-teal-800 border border-4">CV</a>
        </div>
    </div>
    )
}
