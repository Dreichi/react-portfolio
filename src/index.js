import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const updateScrollProgress = () => {
  const progress = document.getElementById("scroll-progress");
  if (!progress) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progress.style.width = `${percent}%`;
};

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

