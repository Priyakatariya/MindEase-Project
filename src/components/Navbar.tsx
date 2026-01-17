import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; 
import { 
  ChevronDown, HeartPulse, MessageSquare, Activity, 
  Headphones, Users, Calendar, PhoneCall, 
  UserCircle, LogOut, LayoutDashboard, BookOpen
} from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut(auth);
      setShowProfileMenu(false);
      setIsAdmin(false);
      navigate('/login');
    } catch (error) {
      alert("Logout failed!");
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-[1000] px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-[#1e3a8a] p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <HeartPulse className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            MindEase <span className="text-[#1e3a8a] font-light">| Wellness</span>
          </span>
        </Link>

        {/* MAIN MENU */}
        <ul className="hidden lg:flex items-center gap-2 font-medium text-gray-600">
          <li><Link to="/" className="px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-[#1e3a8a] transition">Home</Link></li>

          <li className="relative group">
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg group-hover:bg-blue-50 group-hover:text-[#1e3a8a] transition">
              Support <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-2xl p-2 border border-gray-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
              <DropdownLink to="/chatbot" icon={<MessageSquare size={18}/>} title="AI Chatbot" subtitle="Instant help" />
              <DropdownLink to="/mood" icon={<Activity size={18}/>} title="Mood Tracker" subtitle="Track your vibes" />
              <DropdownLink to="/sessions" icon={<Headphones size={18}/>} title="Guided Sessions" subtitle="Meditation" />
            </div>
          </li>

          <li className="relative group">
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg group-hover:bg-purple-50 group-hover:text-purple-600 transition">
              Community <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-2xl p-2 border border-gray-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
              <DropdownLink to="/stories" icon={<Users size={18}/>} title="Student Stories" subtitle="You are not alone" />
              <DropdownLink to="/events" icon={<Calendar size={18}/>} title="Workshops" subtitle="Join events" />
            </div>
          </li>

          <li><Link to="/mentors" className="px-4 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition">Mentors</Link></li>
          <li><Link to="/about" className="px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition">About Us</Link></li>
        </ul>

        {/* AUTH SECTION */}
        <div className="flex items-center gap-4">
          <button onClick={() => alert("Connecting to NITK Helplines...")} className="hidden sm:flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold animate-pulse text-xs">
             <PhoneCall size={14} /> SOS
          </button>

          {!user ? (
            <div className="flex items-center gap-2 border-l pl-4 border-gray-100">
              <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-[#1e3a8a] px-3 py-2">Login</Link>
              <Link to="/signup" className="text-sm font-bold text-[#1e3a8a] bg-blue-50 px-4 py-2 rounded-xl hover:bg-[#1e3a8a] hover:text-white transition-all">Signup</Link>
            </div>
          ) : (
            <div className="relative border-l pl-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileMenu(!showProfileMenu);
                }}
                className="flex items-center gap-2 focus:outline-none hover:bg-gray-50 p-1 rounded-xl transition"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">
                    {isAdmin ? 'Administrator' : 'Student Member'}
                  </p>
                  <p className="text-sm font-bold text-gray-900">{user.displayName || 'Student'}</p>
                </div>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white shadow-md ${isAdmin ? 'bg-indigo-600' : 'bg-blue-600'}`}>
                  <UserCircle size={24} />
                </div>
              </button>

              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-[1001]" onClick={() => setShowProfileMenu(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-2xl rounded-2xl p-2 border border-gray-100 z-[1002] animate-in fade-in zoom-in-95 duration-200">
                    
                    {/* 🟢 DASHBOARD LOGIC UPDATED */}
                    {isAdmin ? (
                      <button 
                        onClick={() => { navigate('/admin'); setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-sm font-bold text-gray-700 transition"
                      >
                        <LayoutDashboard size={18} className="text-blue-600" /> Admin Panel
                      </button>
                    ) : (
                      <button 
                        onClick={() => { navigate('/dashboard'); setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 text-sm font-bold text-gray-700 transition"
                      >
                        <LayoutDashboard size={18} className="text-emerald-600" /> My Dashboard
                      </button>
                    )}

                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-600 text-sm font-bold transition mt-1 border-t pt-1"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const DropdownLink = ({ to, icon, title, subtitle }: any) => (
  <Link to={to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white text-gray-500 group-hover:text-[#1e3a8a]">{icon}</div>
    <div>
      <div className="text-sm font-bold text-gray-900">{title}</div>
      <div className="text-[10px] text-gray-400 uppercase tracking-wide">{subtitle}</div>
    </div>
  </Link>
);

export default Navbar;