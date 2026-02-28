import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Brain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative overflow-hidden pt-20 pb-8 px-6"
      style={{ background: 'linear-gradient(135deg, #3D1520 0%, #1E1B3A 50%, #16133A 100%)' }}>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,97,122,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #D4617A, #C44A6A)', boxShadow: '0 4px 20px rgba(212,97,122,0.40)' }}>
                <Brain size={22} className="text-white" />
              </div>
              <span className="text-2xl font-black text-white">Mind<span style={{ color: '#F4A0B0' }}>Ease</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Your safe, anonymous mental wellness companion — built with love for NITK students. 💜
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={16} />, color: '#3B82F6' },
                { icon: <Twitter size={16} />, color: '#06B6D4' },
                { icon: <Instagram size={16} />, color: '#EC4899' },
                { icon: <Linkedin size={16} />, color: '#C44A6A' },
              ].map((s, i) => (
                <motion.a key={i} href="#"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.55)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = s.color + '60'; e.currentTarget.style.background = s.color + '18'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black mb-6 flex items-center gap-2">
              <Sparkles size={14} style={{ color: '#F4A0B0' }} /> Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { text: 'About Us', path: '/about' },
                { text: 'AI Chatbot', path: '/chatbot' },
                { text: 'Mood Tracker', path: '/mood' },
                { text: 'Guided Sessions', path: '/sessions' },
                { text: 'Events', path: '/events' },
                { text: 'Community', path: '/community' },
              ].map((l, i) => (
                <li key={i}>
                  <button onClick={() => navigate(l.path)}
                    className="group flex items-center gap-1.5 text-sm transition-all"
                    style={{ color: 'rgba(255,255,255,0.50)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F4A0B0')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.50)')}
                  >
                    <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                    {l.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-black mb-6 flex items-center gap-2">
              <Heart size={14} className="fill-current" style={{ color: '#F472B6' }} /> Resources
            </h4>
            <ul className="space-y-3">
              {[
                { text: 'Mental Health Tips', path: '/resources' },
                { text: 'Emergency Help', path: '/emergency' },
                { text: 'FAQs', path: '/#faq' },
                { text: 'Meet Our Mentors', path: '/mentor' },
                { text: 'Privacy Policy', path: '/privacy' },
              ].map((l, i) => (
                <li key={i}>
                  <button onClick={() => navigate(l.path)}
                    className="group flex items-center gap-1.5 text-sm transition-all"
                    style={{ color: 'rgba(255,255,255,0.50)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F472B6')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.50)')}
                  >
                    <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                    {l.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-black mb-6 flex items-center gap-2">
              <Mail size={14} style={{ color: '#34D399' }} /> Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(212,97,122,0.18)', color: '#818CF8' }}>
                  <Mail size={14} />
                </div>
                <span className="text-sm pt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>support@mindease.nitkkr.ac.in</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(52,211,153,0.18)', color: '#34D399' }}>
                  <Phone size={14} />
                </div>
                <span className="text-sm pt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(244,114,182,0.18)', color: '#F472B6' }}>
                  <MapPin size={14} />
                </div>
                <span className="text-sm pt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>NIT Kurukshetra, Haryana, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Shimmer divider */}
        <div className="h-px mb-8 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(232,133,154,0.50), rgba(236,72,153,0.35), transparent)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            © 2026 MindEase. All rights reserved. Made with{' '}
            <Heart size={11} className="inline text-pink-400 fill-current" /> for NITKKR students.
          </p>
          <div className="flex gap-6 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {['Privacy', 'Terms', 'Cookies'].map(t => (
              <a key={t} href="#"
                className="hover:text-white transition-colors"
                onMouseEnter={e => (e.currentTarget.style.color = '#F4A0B0')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;