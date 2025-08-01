import React from "react";
import { Calendar, MapPin } from "lucide-react";

const Experience = ({ data }) => {
  return (
    <section id="experience" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-light mb-12 md:mb-16 text-center">
            Experience
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-0.5"></div>
            
            {data.map((experience, index) => (
              <div 
                key={experience.id}
                className={`relative flex items-start mb-12 md:mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-black rounded-full transform md:-translate-x-2 z-10 mt-2"></div>
                
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 lg:pr-12' : 'md:pl-8 lg:pl-12'}`}>
                  <div className="ml-12 md:ml-0">
                    <div className="bg-white border border-gray-100 rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 hover:transform hover:scale-105">
                      <div className="mb-4">
                        <h3 className="text-xl md:text-2xl font-light mb-2 leading-tight">{experience.role}</h3>
                        <h4 className="text-lg md:text-xl text-blue-600 mb-2">{experience.company}</h4>
                        
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-1">
                            <Calendar size={16} className="flex-shrink-0" />
                            <span>{experience.period}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin size={16} className="flex-shrink-0" />
                            <span>{experience.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <ul className="space-y-3">
                        {experience.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700 leading-relaxed text-sm md:text-base">{achievement}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Empty space for the other side */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;