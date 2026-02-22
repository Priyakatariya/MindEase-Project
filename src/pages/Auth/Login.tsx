import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { Mail, Lock, Chrome } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 📧 Email/Password Login Logic
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error: any) {
      console.error(error.code);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        alert("password wrong");
      } else {
        alert("Kuch galat hua: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // 🌐 Google Login Logic
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error: any) {
      alert("Google Sign-In failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e3a8a] px-4 py-10 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-[100px]"></div>

      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2 text-sm">Sign in to continue your wellness journey</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="email" 
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-blue-100 transition-all" 
              required 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="password" 
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-blue-100 transition-all" 
              required 
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#1e3a8a] text-white py-4 rounded-2xl font-bold hover:shadow-lg transition transform active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* OR Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
        </div>

        {/* Google Login Button */}
        <button 
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-200 py-4 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition active:scale-95"
        >
          <Chrome className="text-red-500" size={20} /> Google
        </button>

        <p className="text-center mt-8 text-sm text-gray-500">
          New here? <Link to="/signup" className="font-bold text-[#1e3a8a] hover:underline">Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;