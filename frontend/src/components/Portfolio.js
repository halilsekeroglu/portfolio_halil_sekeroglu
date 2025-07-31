import React, { useState, useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import TechnicalExpertise from "./TechnicalExpertise";
import Contact from "./Contact";
import Footer from "./Footer";
import { enhancedMockData } from "../data/enhanced-mock";
import { apiService, checkBackendAvailability } from "../services/api";

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [isBackendAvailable, setIsBackendAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        
        // Check if backend is available
        const backendAvailable = await checkBackendAvailability();
        setIsBackendAvailable(backendAvailable);
        
        if (backendAvailable) {
          // Try to load data from backend
          try {
            const [projects, experience, expertise, stats] = await Promise.all([
              apiService.getProjects(),
              apiService.getExperience(),
              apiService.getTechnicalExpertise(),
              apiService.getPortfolioStats()
            ]);
            
            // If backend data is available, use it; otherwise fall back to mock
            const backendData = {
              ...enhancedMockData,
              projects: projects.length > 0 ? projects : enhancedMockData.projects,
              experience: experience.length > 0 ? experience : enhancedMockData.experience,
              technicalExpertise: expertise.length > 0 ? expertise : enhancedMockData.technicalExpertise,
              stats: { ...enhancedMockData.stats, ...stats }
            };
            
            setPortfolioData(backendData);
          } catch (apiError) {
            console.warn('API error, falling back to mock data:', apiError);
            setPortfolioData(enhancedMockData);
          }
        } else {
          // Use mock data if backend is not available
          setPortfolioData(enhancedMockData);
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
        setError('Failed to load portfolio data');
        setPortfolioData(enhancedMockData); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black mb-4"></div>
          <p className="text-lg text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error && !portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Backend Status Indicator (for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className={`fixed top-4 right-4 z-50 px-3 py-1 rounded-full text-xs ${
          isBackendAvailable 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {isBackendAvailable ? 'Backend Connected' : 'Using Mock Data'}
        </div>
      )}

      <Header />
      <Hero data={portfolioData.hero} />
      <About data={portfolioData.about} />
      <Experience data={portfolioData.experience} />
      <Projects data={portfolioData.projects} />
      <Skills data={portfolioData.skills} />
      <TechnicalExpertise data={portfolioData.technicalExpertise} />
      <Contact data={portfolioData.contact} />
      <Footer />
    </div>
  );
};

export default Portfolio;