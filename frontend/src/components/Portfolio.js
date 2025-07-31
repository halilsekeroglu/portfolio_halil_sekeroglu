import React, { useState, useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";
import Footer from "./Footer";
import { mockData } from "../data/mock";

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    // Simulate API call with mock data
    setPortfolioData(mockData);
  }, []);

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />
      <Hero data={portfolioData.hero} />
      <About data={portfolioData.about} />
      <Experience data={portfolioData.experience} />
      <Projects data={portfolioData.projects} />
      <Skills data={portfolioData.skills} />
      <Contact data={portfolioData.contact} />
      <Footer />
    </div>
  );
};

export default Portfolio;