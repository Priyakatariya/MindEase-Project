import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, BarChart3, Users, Play, Heart, ShieldCheck, ArrowRight, Brain, Calendar, Video, BookOpen, Star, ChevronDown } from 'lucide-react';

type Faq = { question: string; answer: string };
type FaqCategory = { title: string; faqs: Faq[] };

const FAQ_DATA: FaqCategory[] = [
  {
    title: "GENERAL",
    faqs: [
  { question: "Is my information really anonymous?", answer: "Yes. You are never required to share personal identity. All chats are private and encrypted." },
  { question: "How do I book a counseling session?", answer: "Go to Appointment page → choose slot → confirmation email is sent instantly." },
  { question: "Is the AI chatbot available 24/7?", answer: "Yes. The AI support is available anytime you need help." },
  { question: "Do I need an account?", answer: "No, most features work anonymously." },
  { question: "Can I use this on mobile?", answer: "Yes, it works on phone, tablet and laptop." },
  { question: "Who is this platform for?", answer: "Primarily students, but anyone needing emotional support can use it." },
  { question: "What if I don’t know what I feel?", answer: "The chatbot helps identify emotions step-by-step." }
],
  },
  {
    title: "MEDITATION & MINDFULNESS",
    faqs: [
  { question: "I’ve never meditated before. Is that okay?", answer: "Yes! Guided sessions are beginner-friendly." },
  { question: "How long should I meditate?", answer: "Start 3-5 minutes and slowly increase." },
  { question: "Do I need silence?", answer: "No. Normal room environment works fine." },
  { question: "What if my mind keeps wandering?", answer: "That’s normal — gently return to breathing." },
  { question: "Best time to meditate?", answer: "Morning or before sleep works best." },
  { question: "Can meditation improve focus?", answer: "Yes, regular practice boosts concentration." },
  { question: "Guided or silent meditation?", answer: "Guided is best for beginners." }
],
  },
  {
    title: "STRESS & ANXIETY",
    faqs: [
  { question: "Can this help with panic attacks?", answer: "Yes. Grounding exercises calm your nervous system." },
  { question: "Does mood tracking really help?", answer: "Yes. Recognizing patterns improves emotional control." },
  { question: "What to do during anxiety spike?", answer: "Use breathing and grounding tools immediately." },
  { question: "Why am I stressed for no reason?", answer: "Academic pressure and overthinking often cause hidden stress." },
  { question: "Does sleep affect anxiety?", answer: "Yes — poor sleep increases anxiety significantly." },
  { question: "How often track mood?", answer: "2–3 times daily works best." },
  { question: "Is college overwhelm normal?", answer: "Yes — many students experience it." }
],
  },
  {
    title: "PRIVACY & SAFETY",
    faqs: [
  { question: "Are my conversations stored?", answer: "Encrypted and anonymized only." },
  { question: "Can others see my stories?", answer: "Only if you choose to share anonymously." },
  { question: "Do counselors know my identity?", answer: "No unless you share it yourself." },
  { question: "Is my data sold?", answer: "Never." },
  { question: "Can admins read chats?", answer: "No human reads private conversations." },
  { question: "Can I delete my data?", answer: "Yes anytime." },
  { question: "Safe for sensitive topics?", answer: "Yes — designed as a safe space." }
],
  },
];


const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6] pt-20 pb-32 px-6 overflow-hidden">
        {/* Decorative Blur Backgrounds */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-blue-400 rounded-full opacity-20 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-500 rounded-full opacity-20 blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500 rounded-full opacity-10 blur-[150px]"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-blue-100 text-sm mb-8 shadow-lg">
            <Heart size={16} className="text-pink-400 fill-current animate-pulse" />
            <span className="font-semibold">Wellness Hub for NIT Kurukshetra</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
            Find Your Calm in <br />
            <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">Campus Chaos</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            A safe, anonymous space for students to manage stress, track emotions, and find support without judgment.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button
              onClick={() => navigate('/chatbot')}
              className="group px-10 py-4 bg-white text-[#1e3a8a] font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
            >
              <Brain size={20} />
              Start AI Chat
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/sessions')}
              className="px-10 py-4 bg-blue-700/40 text-white font-semibold rounded-2xl border-2 border-white/30 backdrop-blur-sm hover:bg-blue-700/60 hover:border-white/50 transition-all flex items-center justify-center gap-3"
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

      {/* --- FEATURE CARDS --- */}
      <section className="py-24 px-6 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MessageCircle size={32} />}
            title="AI Support"
            desc="Our bot understands exam stress and campus blues. Get instant emotional guidance anytime."
            color="bg-gradient-to-br from-blue-600 to-blue-700"
            link="/chatbot"
          />
          <FeatureCard
            icon={<BarChart3 size={32} />}
            title="Mood Trends"
            desc="Visualize your emotional progress with interactive charts and private journaling."
            color="bg-gradient-to-br from-emerald-500 to-emerald-600"
            link="/mood"
          />
          <FeatureCard
            icon={<Users size={32} />}
            title="Student Stories"
            desc="Read healing experiences or share your journey anonymously with the NITK community."
            color="bg-gradient-to-br from-purple-600 to-purple-700"
            link="/stories"
          />
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Star size={16} className="fill-current" />
              Our Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need for <span className="text-blue-600">Mental Wellness</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive support designed specifically for student life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Video className="text-purple-600" size={28} />}
              title="Video Sessions"
              desc="Watch therapy videos and meditation guides"
              link="/sessions"
            />
            <ServiceCard
              icon={<Calendar className="text-green-600" size={28} />}
              title="Book Appointments"
              desc="Schedule sessions with counselors"
              link="/appointment"
            />
            <ServiceCard
              icon={<BookOpen className="text-blue-600" size={28} />}
              title="Events & Workshops"
              desc="Join wellness events and activities"
              link="/events"
            />
            <ServiceCard
              icon={<Users className="text-orange-600" size={28} />}
              title="Community"
              desc="Connect with peers and share stories"
              link="/community"
            />
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Heart size={16} className="fill-current animate-pulse" />
              Student Voices
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
            <p className="text-gray-600 text-lg">Real experiences from our community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The AI chatbot helped me through my exam anxiety. It's like having a friend who's always there."
              author="Priya S."
              role="3rd Year, CSE"
              rating={5}
              avatar="https://ui-avatars.com/api/?name=Priya+S&background=6366f1&color=fff&size=128"
            />
            <TestimonialCard
              quote="Booking a session with a counselor was so easy. The privacy and support I received was amazing."
              author="Rahul K."
              role="2nd Year, ECE"
              rating={5}
              avatar="https://ui-avatars.com/api/?name=Rahul+K&background=8b5cf6&color=fff&size=128"
            />
            <TestimonialCard
              quote="The mood tracker helped me understand my patterns. I feel more in control of my emotions now."
              author="Ananya M."
              role="4th Year, ME"
              rating={5}
              avatar="https://ui-avatars.com/api/?name=Ananya+M&background=ec4899&color=fff&size=128"
            />
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
<section className="py-20 px-6 bg-violet-50">
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
        <MessageCircle size={16} />
        FAQ
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Frequently Asked Questions
      </h2>

      <p className="text-gray-600 text-lg">
        Everything you need to know about MindEase
      </p>
    </div>

    {/* Category Tabs */}
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {FAQ_DATA.map((category, index) => (
        <button
          key={index}
          onClick={() => {
            setActiveCategory(index);
            setOpenFaq(null);
          }}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition
          ${
            activeCategory === index
              ? "bg-violet-600 text-white shadow-md"
              : "bg-white text-gray-700 border hover:bg-violet-50"
          }`}
        >
          {category.title}
        </button>
      ))}
    </div>

    {/* Section Title */}
    <div className="mb-6">
      <h3 className="text-xl font-bold text-gray-800 tracking-wide">
        {FAQ_DATA[activeCategory].title}
      </h3>
      <div className="h-px bg-gray-300 mt-3"></div>
    </div>

    {/* Questions */}
    <div className="space-y-4">
      {FAQ_DATA[activeCategory].faqs.map((faq, index) => (
        <FaqItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openFaq === index}
          onClick={() => setOpenFaq(openFaq === index ? null : index)}
        />
      ))}
    </div>
  </div>
</section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full inline-block mb-6">
            <ShieldCheck size={48} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-snug">
            "It's okay to not be okay. <br />Let's talk about it."
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Our peer mentors and psychologists are available for private one-on-one sessions. Take the first step towards better mental health.
          </p>
          <button
            onClick={() => navigate('/appointment')}
            className="group px-10 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto"
          >
            Book a Free Session
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

// Reusable Helper Components
const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="group">
    <p className="text-4xl font-extrabold text-white group-hover:text-blue-200 transition-colors">{value}</p>
    <p className="text-blue-200/70 text-sm mt-1 uppercase tracking-wider font-medium">{label}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc, color, link }: any) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(link)}
      className="group bg-white p-10 rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-gray-100 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
      <div className={`w-16 h-16 ${color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all relative z-10`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-8 relative z-10">{desc}</p>
      <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all relative z-10">
        Explore Feature <ArrowRight size={18} />
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, desc, link }: any) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(link)}
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 group"
    >
      <div className="bg-gray-50 p-4 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
};

const TestimonialCard = ({ quote, author, role, rating, avatar }: any) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
    <div className="flex gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={18} className="text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-700 leading-relaxed mb-6 italic text-lg">"{quote}"</p>
    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
      <img
        src={avatar}
        alt={author}
        className="w-12 h-12 rounded-full ring-2 ring-purple-100 group-hover:ring-purple-300 transition-all"
      />
      <div>
        <p className="font-bold text-gray-900">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  </div>
);

const FaqItem = ({ question, answer, isOpen, onClick }: any) => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors">
    <button
      onClick={onClick}
      className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
    >
      <span className="font-bold text-gray-900 pr-4">{question}</span>
      <ChevronDown
        size={20}
        className={`text-blue-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    {isOpen && (
      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
        {answer}
      </div>
    )}
  </div>
);

export default Home;