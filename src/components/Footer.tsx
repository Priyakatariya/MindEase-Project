import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-12 px-10 mt-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-bold text-xl mb-4 text-[#1e3a8a]">MindWell</h3>
          <p className="text-gray-500">Student Mental Health Support Club. Helping you navigate campus life with peace and resilience.</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <h4 className="font-bold mb-2">Quick Links</h4>
          <Link to="/about" className="text-gray-500 hover:text-blue-600">About Us</Link>
          <Link to="/faq" className="text-gray-500 hover:text-blue-600">Help & FAQs</Link>
          <Link to="/privacy" className="text-gray-500 hover:text-blue-600">Privacy Policy</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-bold mb-2">Emergency</h4>
          <p className="text-gray-500">Student Helpline: +91 0000 0000</p>
          <p className="text-gray-500">Counselor Office: NIT Kurukshetra</p>
        </div>
      </div>
      <div className="text-center mt-10 pt-6 border-t border-gray-200 text-gray-400 text-sm">
        © 2026 MindWell Platform. Dedicated to Student Wellness.
      </div>
    </footer>
  );
};

export default Footer;