import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Search, ChevronRight, Sparkles } from 'lucide-react';
import { MENTORS } from '../data/mentorData';

export default function Mentor() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filtered = MENTORS.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.specialty.toLowerCase().includes(query.toLowerCase()) ||
      m.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative overflow-hidden" style={{ background: '#F4F1FF' }}>

      {/* Ambient background orbs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[550px] h-[550px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(205,193,255,0.45) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.28) 0%, transparent 70%)' }} />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-14">
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-5"
          style={{ background: 'rgba(124,58,237,0.08)', border: '1.5px solid #CDC1FF', color: '#7C3AED' }}>
          <Sparkles size={13} className="animate-pulse" />
          Expert Guidance
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black mt-2 mb-4 tracking-tight" style={{ color: '#2D264B' }}>
          Find Your{' '}
          <span style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #9F67FF 50%, #6366F1 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Perfect Mentor
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          className="max-w-xl mx-auto text-base mb-10" style={{ color: '#4A4365' }}>
          Connect with certified professionals who specialize in student mental health and wellbeing.
        </motion.p>

        {/* Search bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
          className="max-w-xl mx-auto flex items-center gap-3 p-3 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.70)', border: '1.5px solid #DDD6FE', backdropFilter: 'blur(12px)' }}>
          <Search size={18} className="ml-2 shrink-0" style={{ color: '#9F67FF' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, role, or specialty..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: '#2D264B', caretColor: '#7C3AED' }}
          />
          <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #6366F1)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.35)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            Search
          </button>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((mentor, i) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/mentor/${mentor.id}`)}
            className="relative rounded-[2rem] p-6 cursor-pointer group overflow-hidden transition-all"
            style={{ background: 'rgba(255,255,255,0.65)', border: '1.5px solid #DDD6FE', backdropFilter: 'blur(14px)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.90)';
              e.currentTarget.style.borderColor = '#CDC1FF';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(124,58,237,0.14), 0 4px 16px rgba(0,0,0,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.65)';
              e.currentTarget.style.borderColor = '#DDD6FE';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Glow on hover */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, rgba(205,193,255,0.50), transparent)' }} />

            {/* Image */}
            <div className="relative mb-5 rounded-[1.5rem] overflow-hidden aspect-square">
              <img src={mentor.image} alt={mentor.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(45,38,75,0.45) 0%, transparent 55%)' }} />
              {/* Experience badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black"
                style={{ background: 'rgba(244,241,255,0.90)', backdropFilter: 'blur(6px)', color: '#7C3AED', border: '1px solid #CDC1FF' }}>
                {mentor.experience} Exp
              </div>
              {/* Rating badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(254,240,138,0.55)', border: '1px solid rgba(234,179,8,0.30)', backdropFilter: 'blur(6px)' }}>
                <Star size={11} className="text-yellow-500 fill-yellow-500" />
                <span className="text-yellow-700 text-xs font-black">{mentor.rating}</span>
              </div>
            </div>

            {/* Info */}
            <h3 className="font-black text-lg leading-tight mb-1 transition-colors group-hover:text-[#7C3AED]"
              style={{ color: '#2D264B' }}>{mentor.name}</h3>
            <p className="text-sm font-bold mb-3" style={{ color: '#7C3AED' }}>{mentor.role}</p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {mentor.tags.slice(0, 2).map((tag, ti) => (
                <span key={ti} className="px-2.5 py-1 rounded-lg text-xs font-bold"
                  style={{ background: 'rgba(124,58,237,0.08)', color: '#7C3AED', border: '1px solid #DDD6FE' }}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4"
              style={{ borderTop: '1.5px solid #EDE9FF' }}>
              <span className="text-xs" style={{ color: '#4A4365', opacity: 0.65 }}>{mentor.sessions}+ sessions</span>
              <div className="flex items-center gap-1.5 text-sm font-black transition-all group-hover:gap-2.5"
                style={{ color: '#7C3AED' }}>
                View Profile <ChevronRight size={15} />
              </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20" style={{ color: '#4A4365' }}>
            <p className="text-xl font-bold">No mentors found for "{query}"</p>
            <p className="text-sm mt-2 opacity-60">Try searching by specialty, name, or role.</p>
          </div>
        )}
      </div>
    </div>
  );
}