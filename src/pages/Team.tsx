import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Crown, Star, ArrowLeft, Github, Linkedin, Mail } from 'lucide-react';

const TEAM = [
    {
        id: 1,
        name: 'Priya Katariya',
        role: 'Team Leader & Full Stack Developer',
        desc: 'Visionary behind MindEase. Leads the product strategy, UI architecture, and backend integration. Passionate about mental health tech and student wellbeing.',
        avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Priya&backgroundColor=b6e3f4',
        tags: ['React', 'TypeScript', 'Firebase', 'UI/UX'],
        github: '#', linkedin: '#', email: 'priya@mindease.edu',
        isLeader: true,
        color: '#D4617A',
        light: '#FFE8ED',
    },
    {
        id: 2,
        name: 'Arjun Sharma',
        role: 'AI & Backend Engineer',
        desc: 'Builds the AI chatbot pipeline and server logic. Specializes in NLP models and emotional intelligence systems.',
        avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Arjun&backgroundColor=c0aede',
        tags: ['Python', 'OpenAI API', 'Node.js'],
        github: '#', linkedin: '#', email: 'arjun@mindease.edu',
        isLeader: false,
        color: '#C44A6A',
        light: '#FFE0E6',
    },
    {
        id: 3,
        name: 'Meera Nair',
        role: 'UI/UX Designer',
        desc: 'Crafts the calming, accessible interfaces that make MindEase feel warm and safe. Expert in design systems and emotional UX.',
        avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Meera&backgroundColor=ffd5dc',
        tags: ['Figma', 'Design Systems', 'Accessibility'],
        github: '#', linkedin: '#', email: 'meera@mindease.edu',
        isLeader: false,
        color: '#EC4899',
        light: '#FCE7F3',
    },
    {
        id: 4,
        name: 'Rohan Verma',
        role: 'Database & DevOps',
        desc: 'Manages Firebase configuration, authentication flows, and deployment pipelines. Keeps the platform secure and performant.',
        avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rohan&backgroundColor=d1fae5',
        tags: ['Firebase', 'CI/CD', 'Security'],
        github: '#', linkedin: '#', email: 'rohan@mindease.edu',
        isLeader: false,
        color: '#10B981',
        light: '#D1FAE5',
    },
    {
        id: 5,
        name: 'Kavya Reddy',
        role: 'Content & Mental Health Advisor',
        desc: 'Psychology graduate who ensures all content, resources, and bot responses are clinically informed and empathetic.',
        avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kavya&backgroundColor=fde68a',
        tags: ['Psychology', 'Content', 'Wellbeing'],
        github: '#', linkedin: '#', email: 'kavya@mindease.edu',
        isLeader: false,
        color: '#F59E0B',
        light: '#FEF3C7',
    },
];

const Team: React.FC = () => {
    const navigate = useNavigate();
    const leader = TEAM.find(m => m.isLeader)!;
    const members = TEAM.filter(m => !m.isLeader);

    return (
        <div className="min-h-screen" style={{ background: '#FFF5F7' }}>
            {/* Fixed blobs */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute rounded-full" style={{ width: 500, height: 500, top: '-10%', left: '-5%', background: 'radial-gradient(circle, rgba(232,133,154,0.30) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: '-10%', right: '-5%', background: 'radial-gradient(circle, rgba(236,72,153,0.20) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
                {/* Back */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 mb-12 text-sm font-bold transition-all"
                    style={{ color: '#D4617A' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                    <ArrowLeft size={16} /> Back to Home
                </motion.button>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
                        style={{ background: 'rgba(212,97,122,0.08)', border: '1.5px solid #F4A0B0', color: '#D4617A' }}>
                        <Star size={13} className="fill-current" /> The People Behind MindEase
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-5" style={{ color: '#3D1520' }}>
                        Meet Our{' '}
                        <span style={{ background: 'linear-gradient(135deg, #D4617A, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            Team
                        </span>
                    </h1>
                    <p className="text-lg font-medium max-w-2xl mx-auto" style={{ color: '#7A3545', opacity: 0.75 }}>
                        A passionate group of students from NIT Kurukshetra committed to making mental health support accessible, anonymous, and empathetic for everyone.
                    </p>
                </motion.div>

                {/* Leader card — full width */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.1 }}
                    className="relative rounded-[2.5rem] p-10 md:p-14 mb-10 overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.70)', border: '2px solid rgba(212,97,122,0.30)', backdropFilter: 'blur(20px)', boxShadow: '0 24px 80px rgba(212,97,122,0.18)' }}
                >
                    {/* Crown badge */}
                    <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #D4617A, #C44A6A)', boxShadow: '0 4px 20px rgba(212,97,122,0.40)' }}>
                        <Crown size={14} className="text-white fill-current" />
                        <span className="text-white text-xs font-black uppercase tracking-widest">Team Leader</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                        <div className="relative flex-shrink-0">
                            <div className="w-44 h-44 rounded-[2rem] overflow-hidden"
                                style={{ border: '4px solid rgba(212,97,122,0.40)', boxShadow: '0 12px 40px rgba(212,97,122,0.25)' }}>
                                <img src={leader.avatar} alt={leader.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-lg"
                                style={{ background: '#D4617A', boxShadow: '0 4px 16px rgba(212,97,122,0.50)' }}>
                                👑
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black mb-1" style={{ color: '#3D1520' }}>{leader.name}</h2>
                            <p className="text-base font-black mb-4" style={{ color: '#D4617A' }}>{leader.role}</p>
                            <p className="text-base leading-relaxed mb-6 max-w-2xl" style={{ color: '#7A3545' }}>{leader.desc}</p>
                            <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                                {leader.tags.map(t => (
                                    <span key={t} className="px-3 py-1 rounded-full text-xs font-black"
                                        style={{ background: leader.light, color: leader.color, border: `1px solid ${leader.color}30` }}>{t}</span>
                                ))}
                            </div>
                            <div className="flex gap-3 justify-center md:justify-start">
                                {[{ icon: <Github size={16} />, href: leader.github }, { icon: <Linkedin size={16} />, href: leader.linkedin }, { icon: <Mail size={16} />, href: `mailto:${leader.email}` }].map((s, i) => (
                                    <a key={i} href={s.href}
                                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                                        style={{ background: 'rgba(212,97,122,0.08)', border: '1.5px solid #F9C5CC', color: '#D4617A' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#D4617A'; e.currentTarget.style.color = 'white'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,97,122,0.08)'; e.currentTarget.style.color = '#D4617A'; }}
                                    >{s.icon}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 4 member cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {members.map((m, i) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.2 + i * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="relative rounded-[2rem] p-7 cursor-default overflow-hidden group"
                            style={{ background: 'rgba(255,255,255,0.70)', border: '1.5px solid #F9C5CC', backdropFilter: 'blur(14px)', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = m.color + '60'; e.currentTarget.style.boxShadow = `0 20px 60px ${m.color}22`; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#F9C5CC'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.05)'; }}
                        >
                            {/* Bottom accent bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: `linear-gradient(90deg, ${m.color}, #F4A0B0)` }} />

                            <div className="w-20 h-20 rounded-2xl overflow-hidden mb-5 mx-auto"
                                style={{ border: `3px solid ${m.color}40`, boxShadow: `0 6px 20px ${m.color}30` }}>
                                <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-lg font-black text-center mb-1" style={{ color: '#3D1520' }}>{m.name}</h3>
                            <p className="text-xs font-black text-center mb-3" style={{ color: m.color }}>{m.role}</p>
                            <p className="text-xs leading-relaxed text-center mb-4" style={{ color: '#7A3545', opacity: 0.80 }}>{m.desc}</p>
                            <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                                {m.tags.map(t => (
                                    <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-black"
                                        style={{ background: m.light, color: m.color }}>{t}</span>
                                ))}
                            </div>
                            <div className="flex gap-2 justify-center">
                                {[{ icon: <Github size={13} />, href: m.github }, { icon: <Linkedin size={13} />, href: m.linkedin }, { icon: <Mail size={13} />, href: `mailto:${m.email}` }].map((s, j) => (
                                    <a key={j} href={s.href}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all text-xs"
                                        style={{ background: `${m.color}10`, border: `1px solid ${m.color}30`, color: m.color }}
                                        onMouseEnter={e => { e.currentTarget.style.background = m.color; e.currentTarget.style.color = 'white'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = `${m.color}10`; e.currentTarget.style.color = m.color; }}
                                    >{s.icon}</a>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                    className="text-center mt-20 p-10 rounded-[2.5rem]"
                    style={{ background: 'rgba(255,255,255,0.60)', border: '1.5px solid rgba(249,197,204,0.60)', backdropFilter: 'blur(16px)' }}
                >
                    <p className="text-2xl font-black mb-3" style={{ color: '#3D1520' }}>Built with 💜 for Student Wellbeing</p>
                    <p style={{ color: '#7A3545', opacity: 0.7 }}>NIT Kurukshetra • 2026 • MindEase</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Team;
