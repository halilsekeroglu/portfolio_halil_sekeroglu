import React from "react";
import { Heart, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-light mb-4">Halil Sekeroglu</h3>
              <p className="text-gray-400 leading-relaxed">
                Principal CCAI Developer, Engineer & Architect specializing in 
                Google Cloud AI and conversational platforms.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => {
                        const element = document.getElementById(item.toLowerCase());
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:transform hover:translate-x-1"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-medium mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail size={16} />
                  <span>halil.sekeroglu@gmail.com</span>
                </div>
                <div className="text-gray-400">
                  Los Angeles, CA
                </div>
                <div className="flex space-x-4 mt-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                    <Linkedin size={18} />
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                    <Github size={18} />
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                    <Mail size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} Halil Sekeroglu. All rights reserved.
              </p>
              
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Built with</span>
                <Heart size={14} className="text-red-500" />
                <span>using React & Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 3D Geometric Accent */}
      <div className="absolute bottom-8 right-8 w-16 h-16 opacity-5">
        <div className="w-full h-full border-2 border-white transform rotate-45 animate-pulse"></div>
      </div>
    </footer>
  );
};

export default Footer;