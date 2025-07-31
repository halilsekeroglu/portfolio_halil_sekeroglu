import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const About = ({ data }) => {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light mb-16 text-center">
            About
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                {data.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin size={20} />
                  <span>{data.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail size={20} />
                  <span>{data.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone size={20} />
                  <span>{data.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg relative overflow-hidden">
                {/* 3D Geometric Pattern */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-20 h-20 border border-black transform rotate-45"
                      style={{
                        top: `${20 + (i % 3) * 30}%`,
                        left: `${20 + Math.floor(i / 3) * 40}%`,
                        animation: `float ${3 + (i * 0.5)}s ease-in-out infinite alternate`
                      }}
                    />
                  ))}
                </div>
                
                {/* Professional placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-light text-gray-400">HS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          from { transform: rotate(45deg) translateY(0px); }
          to { transform: rotate(45deg) translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default About;