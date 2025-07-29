import React from 'react';
import { Heart, Code, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-50 via-white to-blue-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Excel Mock Interviewer
            </h3>
            <p className="text-sm text-gray-600 font-light">
              AI-powered Excel skills assessment platform helping candidates 
              prepare for their dream jobs with personalized interviews.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-gray-600 font-light">
              <li className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span>AI-Generated Questions</span>
              </li>
              <li className="flex items-center space-x-2">
                <Code className="h-4 w-4 text-blue-500" />
                <span>Personalized Assessment</span>
              </li>
              <li className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Detailed Feedback</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600 font-light">
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
       <div className="mt-10 pt-8 border-t border-gray-200">
  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <p className="text-sm text-gray-500 font-light">
      © 2025 <span className="font-semibold" style={{ color: '#fbbc04' }}>Ritesh Raj Tiwari</span>'s Excel Mock Interviewer. All rights reserved.
    </p>
    <p className="text-sm mt-2 md:mt-0 font-light">
      <span className="font-semibold" style={{ color: '#fbbc04' }}>Ritesh Raj Tiwari</span>
      <span className="mx-1 text-gray-400">|</span>
      <span className="text-blue-700 font-medium">AI Product Engineer</span>
      <span className="mx-1 text-gray-400">&amp;</span>
      <span className="text-blue-700 font-medium">Full Stack Developer</span>
    </p>
    <p className="text-sm text-gray-500 mt-2 md:mt-0 font-light">
      Built with <span className="text-green-600 font-semibold">React</span>, <span className="text-blue-600 font-semibold">FastAPI</span> &amp; <span className="text-yellow-600 font-semibold">Google Gemini AI</span>
    </p>
  </div>
</div>

      </div>
    </footer>
  );
};

export default Footer;
