import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -32px 0px' }
    );
    const apply = () =>
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
        .forEach(el => obs.observe(el));
    apply();
    const t = setTimeout(apply, 400);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);
}

export default function App() {
  useScrollReveal();
  return (
    <div className="App">
      <Header />
      <Hero />
      <Services />
      <About />
      <ContactSection />
      <Footer />
    </div>
  );
}
