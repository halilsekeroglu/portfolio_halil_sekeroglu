import React from "react";
import { Code2, Zap, Award, TrendingUp } from "lucide-react";

const TechnicalExpertise = ({ data }) => {
  const getExperienceColor = (level) => {
    switch (level) {
      case "Expert":
        return "bg-green-100 text-green-800 border-green-200";
      case "Advanced":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "conversational ai architecture":
        return <Code2 size={24} className="text-purple-600" />;
      case "telephony & voice integration":
        return <Zap size={24} className="text-blue-600" />;
      case "api architecture & integration":
        return <TrendingUp size={24} className="text-green-600" />;
      case "devops & deployment":
        return <Award size={24} className="text-orange-600" />;
      default:
        return <Code2 size={24} className="text-gray-600" />;
    }
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section id="technical-expertise" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light mb-16 text-center">
            Technical Expertise
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {data.map((expertise) => (
              <div 
                key={expertise.id}
                className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-105 relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5 transform rotate-12">
                  <div className="w-full h-full border-4 border-gray-400 transform rotate-45"></div>
                </div>
                
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    {getCategoryIcon(expertise.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-light">{expertise.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getExperienceColor(expertise.experience_level)}`}>
                        {expertise.experience_level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{expertise.category}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {expertise.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {expertise.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {expertise.years_experience && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Award size={16} />
                    <span>{expertise.years_experience} years experience</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Summary Section */}
          <div className="mt-16 text-center">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-light mb-4">Core Specialization</h3>
              <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
                4+ years of focused expertise in Google Cloud AI technologies, with particular strength in 
                Dialogflow CX architecture, telephony integration, and enterprise-scale conversational AI solutions. 
                Proven track record of leading technical teams and delivering complex CCAI implementations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                  <div className="text-2xl font-light text-black">10+</div>
                  <div className="text-sm text-gray-600">Google Projects</div>
                </div>
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                  <div className="text-2xl font-light text-black">4+</div>
                  <div className="text-sm text-gray-600">Years CCAI</div>
                </div>
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                  <div className="text-2xl font-light text-black">25+</div>
                  <div className="text-sm text-gray-600">Flows Managed</div>
                </div>
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                  <div className="text-2xl font-light text-black">6</div>
                  <div className="text-sm text-gray-600">Certifications</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalExpertise;