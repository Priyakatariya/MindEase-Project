import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="text-pink-500 fill-current" size={28} />
              <h3 className="text-2xl font-bold text-white">MindEase</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Your trusted mental wellness companion at NIT Kurukshetra.
            </p>
            <div className="flex gap-3">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink text="AI Chatbot" link="/chatbot" navigate={navigate} />
              <FooterLink text="Mood Tracker" link="/mood" navigate={navigate} />
              <FooterLink text="Sessions" link="/sessions" navigate={navigate} />
              <FooterLink text="Events" link="/events" navigate={navigate} />
              <FooterLink text="Community" link="/community" navigate={navigate} />
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <FooterLink text="Mental Health Tips" link="/resources" navigate={navigate} />
              <FooterLink text="Emergency Help" link="/emergency" navigate={navigate} />
              <FooterLink text="FAQs" link="/#faq" navigate={navigate} />
              <FooterLink text="Privacy Policy" link="/privacy" navigate={navigate} />
              <FooterLink text="Terms of Service" link="/terms" navigate={navigate} />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-sm">support@mindease.nitkkr.ac.in</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-green-400 mt-1 flex-shrink-0" />
                <span className="text-sm">+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-red-400 mt-1 flex-shrink-0" />
                <span className="text-sm">NIT Kurukshetra, Haryana, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 MindEase. All rights reserved. Made with <Heart size={14} className="inline text-pink-500 fill-current" /> for NITKKR students.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: any) => (
  <a
    href="#"
    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
  >
    {icon}
  </a>
);

const FooterLink = ({ text, link, navigate }: any) => {
  return (
    <li>
      <a
        onClick={() => navigate(link)}
        className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
      >
        {text}
      </a>
    </li>
  );
};

export default Footer;