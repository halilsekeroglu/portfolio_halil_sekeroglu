import React from "react";
import { Code, Cloud, Award } from "lucide-react";

const Skills = ({ data }) => {
  const skillCategories = [
    {
      title: "Technical Skills",
      icon: <Code size={24} />,
      skills: data.technical,
      color: "border-blue-200 bg-blue-50"
    },
    {
      title: "Platforms & Tools",
      icon: <Cloud size={24} />,
      skills: data.platforms,
      color: "border-green-200 bg-green-50"
    },
    {
      title: "Certifications",
      icon: <Award size={24} />,
      skills: data.certifications,
      color: "border-purple-200 bg-purple-50"
    }
  ];

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light mb-16 text-center">
            Skills & Expertise
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div 
                key={index}
                className={`rounded-lg border-2 p-8 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg ${category.color} relative overflow-hidden`}
              >
                {/* 3D Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5 transform rotate-12">
                  <div className="w-full h-full border-4 border-gray-400 transform rotate-45"></div>
                </div>
                
                <div className="flex items-center space-x-3 mb-6">
                  {category.icon}
                  <h3 className="text-xl font-light">{category.title}</h3>
                </div>
                
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="flex items-center space-x-3 group cursor-default"
                    >
                      <div className="w-2 h-2 bg-black rounded-full transition-transform duration-300 group-hover:scale-150"></div>
                      <span className="text-gray-700 transition-colors duration-300 group-hover:text-black">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Expertise Highlight */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-black text-white px-8 py-4 rounded-lg transform hover:scale-105 transition-transform duration-300">
              <p className="text-lg font-light">
                Specialized in <span className="font-medium">Google Cloud AI</span> & <span className="font-medium">Conversational Platforms</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;