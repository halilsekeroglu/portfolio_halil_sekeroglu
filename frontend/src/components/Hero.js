import React, { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

const Hero = ({ data }) => {
  const geometryRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (geometryRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xRotation = (clientY / innerHeight - 0.5) * 10;
        const yRotation = (clientX / innerWidth - 0.5) * 10;
        
        geometryRef.current.style.transform = 
          `rotateX(${xRotation}deg) rotateY(${yRotation}deg) rotateZ(45deg)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Animated Geometry */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={geometryRef}
          className="w-96 h-96 opacity-5 transition-transform duration-300 ease-out"
          style={{
            background: `linear-gradient(45deg, transparent 40%, #000 40%, #000 60%, transparent 60%),
                        linear-gradient(-45deg, transparent 40%, #000 40%, #000 60%, transparent 60%)`,
            transform: "rotateX(0deg) rotateY(0deg) rotateZ(45deg)"
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-tight">
            {data.name}
          </h1>
          
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {data.title}
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>

          <button
            onClick={scrollToAbout}
            className="inline-flex items-center space-x-2 px-8 py-3 border border-black hover:bg-black hover:text-white transition-all duration-300 hover:transform hover:scale-105"
          >
            <span>Explore My Work</span>
            <ArrowDown size={16} />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown size={24} className="text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;