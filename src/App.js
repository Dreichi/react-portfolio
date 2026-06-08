import './App.css';
import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hiro from './components/Hiro';
import Skills from './components/Skills';
import Certs from './components/Certs';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import Projects from './components/Project';
import Cv from './components/Cv';
import AOS from 'aos';
import 'aos/dist/aos.css';

function HomePage() {
  useEffect(() => {
    document.title = 'Louana Jenger';
    AOS.init();
  }, []);
  return (
    <div className="bg-dark-500">
      <Navbar />
      <div className="px-6 lg:px-20 xl:px-36">
        <Hiro />
        <Skills />
        <Projects />
        <Certs />
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}

function CvPage() {
  useEffect(() => {
    document.title = 'CV – Louana Jenger';
  }, []);
  return (
    <div className="bg-dark-500">
      <Navbar />
      <Cv />
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cv" element={<CvPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
