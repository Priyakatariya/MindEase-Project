import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, BookOpen, GraduationCap, Building2, UserCheck } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('student'); // Default role

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    department: '',
    yearOrBatch: '', // Year for students, Batch for alumni
    designation: '', // Only for Professors
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.name });

      // 🗂 Save customized data based on userType
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        ...formData,
        userType: userType,
        role: 'user', // Basic role, 'admin' is separate
        createdAt: new Date(),
      });

      alert(`Welcome to MindEase, ${formData.name}!`);
      navigate('/dashboard');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e3a8a] px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Join Community</h2>
          <p className="text-gray-500 text-sm mt-2">Connect with NITK Mentors & Peers</p>
        </div>

        {/* 🔘 User Type Selector */}
        <div className="flex bg-gray-100 p-1 rounded-2xl mb-8 gap-1">
          {['student', 'professor', 'alumni'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setUserType(type)}
              className={`flex-1 py-2 text-sm font-bold rounded-xl capitalize transition-all ${
                userType === type ? 'bg-white text-[#1e3a8a] shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input icon={<UserPlus size={18}/>} placeholder="Full Name" 
              onChange={(e: any) => setFormData({...formData, name: e.target.value})} />
            <Input icon={<Mail size={18}/>} type="email" placeholder="Email ID" 
              onChange={(e: any) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select 
                required className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none appearance-none text-sm"
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              >
                <option value="">Department</option>
                <option value="CSE">Computer Science</option>
                <option value="IT">Information Technology</option>
                <option value="ECE">Electronics</option>
                <option value="MECH">Mechanical</option>
              </select>
            </div>

            {/* 🆕 Dynamic Field: Changes based on User Type */}
            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              {userType === 'professor' ? (
                <input 
                  placeholder="Designation (e.g. HOD, AP)"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none text-sm"
                  onChange={(e) => setFormData({...formData, designation: e.target.value})}
                  required
                />
              ) : (
                <input 
                  placeholder={userType === 'student' ? "Year (1st, 2nd...)" : "Batch (e.g. 2018)"}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none text-sm"
                  onChange={(e) => setFormData({...formData, yearOrBatch: e.target.value})}
                  required
                />
              )}
            </div>
          </div>

          {userType === 'student' && (
            <Input icon={<BookOpen size={18}/>} placeholder="Roll Number" 
              onChange={(e: any) => setFormData({...formData, rollNo: e.target.value})} />
          )}

          <Input icon={<Lock size={18}/>} type="password" placeholder="Password" 
            onChange={(e: any) => setFormData({...formData, password: e.target.value})} />

          <button disabled={loading} className="w-full bg-[#1e3a8a] text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95 disabled:opacity-50">
            {loading ? 'Creating Profile...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

const Input = ({ icon, ...props }: any) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">{icon}</div>
    <input {...props} required className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-blue-100 text-sm transition-all" />
  </div>
);

export default Signup;