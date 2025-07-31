import React from "react";
import { MapPin, Mail, Phone, Award, Users, Target } from "lucide-react";

const About = ({ data }) => {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light mb-16 text-center">
            About
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                {data.description}
              </p>
              
              <div className="space-y-4 mb-8">
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

              {/* Key Highlights */}
              {data.highlights && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-light mb-4 flex items-center space-x-2">
                    <Target size={20} />
                    <span>Key Highlights</span>
                  </h3>
                  <ul className="space-y-3">
                    {data.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">{highlight}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg relative overflow-hidden">
                {/* Professional Stats Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="text-3xl font-light mb-2">4+</div>
                        <div className="text-sm opacity-90">Years CCAI</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-light mb-2">10+</div>
                        <div className="text-sm opacity-90">Google Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-light mb-2">25+</div>
                        <div className="text-sm opacity-90">Flows Built</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-light mb-2">6</div>
                        <div className="text-sm opacity-90">Certifications</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 3D Geometric Pattern Background */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-20 h-20 border border-white transform rotate-45"
                      style={{
                        top: `${20 + (i % 3) * 30}%`,
                        left: `${20 + Math.floor(i / 3) * 40}%`,
                        animation: `float ${3 + (i * 0.5)}s ease-in-out infinite alternate`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Leadership & Collaboration Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-black">Team Leader</div>
                    <div className="text-sm text-gray-600">Cross-functional</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Philosophy */}
          <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-light mb-6 text-center">Professional Philosophy</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award size={24} className="text-gray-600" />
                </div>
                <h4 className="font-medium mb-2">Excellence</h4>
                <p className="text-sm text-gray-600">
                  Committed to delivering high-quality solutions that exceed expectations
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users size={24} className="text-gray-600" />
                </div>
                <h4 className="font-medium mb-2">Collaboration</h4>
                <p className="text-sm text-gray-600">
                  Fostering teamwork and knowledge sharing across all projects
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target size={24} className="text-gray-600" />
                </div>
                <h4 className="font-medium mb-2">Innovation</h4>
                <p className="text-sm text-gray-600">
                  Continuously exploring new technologies and methodologies
                </p>
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