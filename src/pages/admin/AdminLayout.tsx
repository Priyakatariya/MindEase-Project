import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Calendar, LogOut, Home, ShieldCheck } from 'lucide-react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20}/>, label: 'Overview' },
    { path: '/admin/approve', icon: <CheckSquare size={20}/>, label: 'Approve Posts' },
    { path: '/admin/events', icon: <Calendar size={20}/>, label: 'Manage Events' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e3a8a] text-white hidden md:flex flex-col sticky top-0 h-screen shadow-2xl">
        <div className="p-6 border-b border-blue-800 flex items-center gap-3">
          <ShieldCheck className="text-blue-300" size={28} />
          <span className="font-bold text-xl tracking-wider">ADMIN</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                location.pathname === item.path ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-800 opacity-80'
              }`}
            >
              {item.icon} <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800 space-y-2">
          <Link to="/" className="flex items-center gap-3 p-3 text-sm opacity-70 hover:opacity-100 hover:bg-blue-800 rounded-xl transition">
            <Home size={18}/> Back to Website
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-sm text-red-300 hover:bg-red-900/30 rounded-xl transition">
            <LogOut size={18}/> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet /> {/* Yahan Approve ya Events wale pages dikhenge */}
      </main>
    </div>
  );
};

export default AdminLayout;