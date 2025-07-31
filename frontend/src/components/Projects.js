import React from "react";
import { ExternalLink, Code, CheckCircle } from "lucide-react";

const Projects = ({ data }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Production":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Conversational AI": "border-purple-200 bg-purple-50",
      "Healthcare AI": "border-green-200 bg-green-50",
      "Enterprise AI": "border-blue-200 bg-blue-50",
      "Healthcare Integration": "border-red-200 bg-red-50"
    };
    return colors[category] || "border-gray-200 bg-gray-50";
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-light mb-12 md:mb-16 text-center">
            Projects
          </h2>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {data.map((project) => (
              <div 
                key={project.id}
                className={`rounded-lg border-2 p-6 md:p-8 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg ${getCategoryColor(project.category)} relative`}
              >
                <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <Code size={20} className="text-gray-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-600">{project.category}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-light mb-4 leading-tight">{project.title}</h3>
                
                <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
                  {project.description}
                </p>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-white text-gray-700 text-xs md:text-sm rounded-full border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {project.impact && (
                  <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                    <span>{project.impact}</span>
                  </div>
                )}
                
                {/* 3D Geometric Accent */}
                <div className="absolute top-4 right-4 w-8 h-8 opacity-10 transform rotate-45 border border-gray-400"></div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 md:mt-16">
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              Worked on 10+ Google projects as extended workforce
            </p>
            <div className="inline-flex items-center space-x-2 px-6 md:px-8 py-3 border border-black hover:bg-black hover:text-white transition-all duration-300 text-sm md:text-base">
              <span>View All Projects</span>
              <ExternalLink size={16} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;