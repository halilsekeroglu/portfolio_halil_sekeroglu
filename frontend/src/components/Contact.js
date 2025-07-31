import React, { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { apiService } from "../services/api";

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Submitting contact form with data:', formData);
      const response = await apiService.submitContactForm(formData);
      console.log('Contact form submission successful:', response);
      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Auto-hide success message after 10 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 10000);
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      
      // Auto-hide error message after 10 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 10000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubmissionMessage = () => {
    if (submitStatus === 'success') {
      return {
        icon: <CheckCircle size={20} className="text-green-600" />,
        text: "Thank you for your message! I'll get back to you soon.",
        className: "bg-green-50 text-green-800 border-green-200"
      };
    } else if (submitStatus === 'error') {
      return {
        icon: <AlertCircle size={20} className="text-red-600" />,
        text: "Sorry, there was an error sending your message. Please try again or contact me directly.",
        className: "bg-red-50 text-red-800 border-red-200"
      };
    }
    return null;
  };

  const submissionMessage = getSubmissionMessage();

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light mb-16 text-center">
            Let's Connect
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-light mb-8">Get in Touch</h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {data.availability}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <Mail size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{data.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <Phone size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{data.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <MapPin size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{data.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <Linkedin size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-gray-600">Connect with me</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-light mb-8">Send a Message</h3>
              
              {/* Submission Status Message */}
              {submissionMessage && (
                <div className={`mb-6 p-4 border rounded-lg flex items-center space-x-3 ${submissionMessage.className}`}>
                  {submissionMessage.icon}
                  <span>{submissionMessage.text}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 disabled:bg-gray-100"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 disabled:bg-gray-100"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 disabled:bg-gray-100"
                    placeholder="Project discussion, consultation, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none disabled:bg-gray-100"
                    placeholder="Tell me about your project or how I can help..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center space-x-2 hover:transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;