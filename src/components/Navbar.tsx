import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import {
  Menu, X, HeartPulse, LogOut,
  LayoutDashboard, Home as HomeIcon,
  Info, HelpCircle, Phone, AlertCircle, Users, MessageSquare,
  Activity, BookOpen, UserCircle, Calendar, Bot
} from 'lucide-react';

interface UserData {
  email: string;
  role: 'student' | 'admin';
  displayName?: string;
}

interface NavLink {
  to: string;
  label: string;
  icon: React.ReactElement;
  highlight?: boolean;
}

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<UserData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check Firebase authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Get user role from Firestore
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          let userRole: 'student' | 'admin' = 'student';

          if (userDoc.exists()) {
            const userData = userDoc.data();
            userRole = userData.role === 'admin' ? 'admin' : 'student';
          }

          setUser({
            email: currentUser.email || '',
            role: userRole,
            displayName: currentUser.displayName || undefined
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({
            email: currentUser.email || '',
            role: 'student'
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsMobileMenuOpen(false);
      setIsProfileDropdownOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const handleDashboardClick = () => {
    const dashboardRoute = user?.role === 'admin' ? '/admin' : '/dashboard';
    navigate(dashboardRoute);
    setIsProfileDropdownOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  // Navigation links based on authentication state
  const guestLinks: NavLink[] = [
    { to: '/', label: 'Home', icon: <HomeIcon size={18} /> },
    { to: '/about', label: 'About', icon: <Info size={18} /> },
    { to: '/faq', label: 'FAQ', icon: <HelpCircle size={18} /> },
    { to: '/contact', label: 'Contact', icon: <Phone size={18} /> },
    { to: '/emergency', label: 'Emergency', icon: <AlertCircle size={18} />, highlight: true },
  ];

  const loggedInLinks: NavLink[] = [
    { to: '/', label: 'Home', icon: <HomeIcon size={18} /> },
    { to: '/mentor', label: 'Mentor', icon: <Users size={18} /> },
    { to: '/resources', label: 'Resources', icon: <BookOpen size={18} /> },
    { to: '/mood', label: 'Mood Tracker', icon: <Activity size={18} /> },
    { to: '/community', label: 'Community', icon: <MessageSquare size={18} /> },
    { to: '/appointment', label: 'Appointment', icon: <Calendar size={18} /> },
    { to: '/chatbot', label: 'Chatbot', icon: <Bot size={18} /> },
  ];

  const navigationLinks = user ? loggedInLinks : guestLinks;

  // Show loading state briefly
  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-xl shadow-md">
                <HeartPulse className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                MindEase
              </span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-white border-b border-gray-100'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
              <HeartPulse className="text-white" size={24} />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                MindEase
              </span>
              <span className="text-xs text-gray-500 block -mt-1">Mental Wellness</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${link.highlight
                  ? 'bg-red-50 text-red-600 hover:bg-red-100 animate-pulse'
                  : isActive(link.to)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
              >
                {link.icon}
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons / Profile Dropdown */}
          <div className="hidden lg:flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Signup
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-3 pl-3 border-l border-gray-200 hover:opacity-80 transition-opacity"
                >
                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      {user.role === 'admin' ? 'Administrator' : 'Student'}
                    </p>
                    <p className="text-sm font-bold text-gray-800">
                      {user.displayName || user.email.split('@')[0]}
                    </p>
                  </div>
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white shadow-md ${user.role === 'admin' ? 'bg-gradient-to-br from-purple-600 to-purple-800' : 'bg-gradient-to-br from-blue-600 to-blue-800'
                    }`}>
                    <UserCircle size={24} />
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={handleDashboardClick}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <LayoutDashboard size={18} />
                      <span className="font-medium">Dashboard</span>
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 pt-2 pb-4 bg-gray-50 border-t border-gray-200 shadow-inner">
          {/* Mobile Navigation Links */}
          <div className="space-y-1 mb-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${link.highlight
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : isActive(link.to)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-white hover:shadow-sm'
                  }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Auth Section */}
          {!user ? (
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
              <Link
                to="/login"
                className="w-full px-4 py-3 text-center font-semibold text-gray-700 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="w-full px-4 py-3 text-center font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white shadow-md ${user.role === 'admin' ? 'bg-gradient-to-br from-purple-600 to-purple-800' : 'bg-gradient-to-br from-blue-600 to-blue-800'
                  }`}>
                  <UserCircle size={28} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    {user.role === 'admin' ? 'Administrator' : 'Student'}
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {user.displayName || user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleDashboardClick}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 font-semibold transition-colors"
              >
                <LayoutDashboard size={20} />
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 font-semibold transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;