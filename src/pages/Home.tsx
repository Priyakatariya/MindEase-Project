import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, BarChart3, Users, Play, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#1e3a8a] pt-20 pb-32 px-6 overflow-hidden">
        {/* Decorative Blur Backgrounds */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-blue-400 rounded-full opacity-10 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-500 rounded-full opacity-10 blur-[80px]"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-blue-100 text-sm mb-8 animate-fade-in">
            <Heart size={16} className="text-pink-400 fill-current" />
            <span className="font-medium">Wellness Hub for NIT Kurukshetra</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
            Find Your Calm in <br /> 
            <span className="text-blue-300">Campus Chaos</span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            A safe, anonymous space for students to manage stress, track emotions, and find support without judgment.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button 
              onClick={() => navigate('/chatbot')}
              className="px-10 py-4 bg-white text-[#1e3a8a] font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Start AI Chat
            </button>
            <button 
              onClick={() => navigate('/sessions')}
              className="px-10 py-4 bg-blue-700/40 text-white font-semibold rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-blue-700/60 transition-all flex items-center justify-center gap-3"
            >
              <Play size={18} fill="currentColor" /> Guided Sessions
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-10">
            <Stat label="Support Availability" value="24/7" />
            <Stat label="Student Community" value="1.2k+" />
            <Stat label="Peer Mentors" value="25+" />
            <Stat label="Anonymity Guaranteed" value="100%" />
          </div>
        </div>
      </section>

      {/* --- FEATURE SECTION --- */}
      <section className="py-24 px-6 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<MessageCircle size={32} />}
            title="AI Support"
            desc="Our bot understands exam stress and campus blues. Get instant emotional guidance anytime."
            color="bg-blue-600"
            link="/chatbot"
          />
          <FeatureCard 
            icon={<BarChart3 size={32} />}
            title="Mood Trends"
            desc="Visualize your emotional progress with interactive charts and private journaling."
            color="bg-emerald-500"
            link="/mood"
          />
          <FeatureCard 
            icon={<Users size={32} />}
            title="Student Stories"
            desc="Read healing experiences or share your journey anonymously with the NITK community."
            color="bg-purple-600"
            link="/stories"
          />
        </div>
      </section>

      {/* --- INFO SECTION --- */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto bg-gray-50 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-gray-100">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-50 flex flex-col items-center text-center gap-4">
                <ShieldCheck size={56} className="text-blue-600" />
                <h3 className="font-bold text-xl text-gray-900">Privacy First</h3>
                <p className="text-gray-500 text-sm">Your data is encrypted and your identity remains hidden.</p>
            </div>
            <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-snug">"It's okay to not be okay. Let's talk about it."</h2>
                <p className="text-gray-600 text-lg mb-8">Our peer mentors and psychologists are available for private one-on-one sessions.</p>
                <button 
                  onClick={() => navigate('/booking')}
                  className="group flex items-center gap-2 text-[#1e3a8a] font-bold text-lg hover:gap-4 transition-all"
                >
                  Book a free mentor session <ArrowRight size={20} className="transition-transform" />
                </button>
            </div>
        </div>
      </section>
    </div>
  );
};

// Reusable Helper Components
const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="group">
    <p className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors">{value}</p>
    <p className="text-blue-200/60 text-sm mt-1 uppercase tracking-wider">{label}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc, color, link }: any) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(link)}
      className="group bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-gray-50 cursor-pointer relative overflow-hidden"
    >
      <div className={`w-16 h-16 ${color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-500 leading-relaxed mb-8">{desc}</p>
      <div className="flex items-center gap-2 text-[#1e3a8a] font-bold group-hover:gap-4 transition-all">
        Explore Feature <ArrowRight size={18} />
      </div>
    </div>
  );
};

export default Home;