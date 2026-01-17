import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { 
  User, Send, BookOpen, Clock, PenTool, 
  CheckCircle, Hourglass, Plus, Sparkles, Layout, MessageSquare 
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const [postText, setPostText] = useState("");
  const [myArticles, setMyArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      // Logic: Indexing issues se bachne ke liye pehle simple query
      const q = query(
        collection(db, "articles"),
        where("uid", "==", auth.currentUser.uid)
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Manual Sort for better performance
        const sorted = posts.sort((a: any, b: any) => 
          (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        );
        setMyArticles(sorted);
      });
      return () => unsubscribe();
    }
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim() || !auth.currentUser) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "articles"), {
        uid: auth.currentUser.uid,
        author: auth.currentUser.displayName,
        content: postText,
        createdAt: serverTimestamp(),
        status: 'pending',
        college: "NIT Kurukshetra"
      });
      setPostText("");
    } catch (error) { 
      console.error(error); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] pb-12">
      {/* 🚀 Header Banner */}
      <div className="bg-[#1e3a8a] h-48 w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" fill="currentColor"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
        </div>
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center">
          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
              <Layout size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Student Hub</h1>
              <p className="text-blue-200 text-sm">Manage your mental wellness & contributions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: Stats & Profile --- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border border-white relative overflow-hidden">
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-3xl mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg ring-4 ring-blue-50">
                {auth.currentUser?.displayName?.charAt(0)}
              </div>
              <h2 className="font-bold text-2xl text-gray-800">{auth.currentUser?.displayName}</h2>
              <p className="text-blue-600 text-sm font-bold mt-1 uppercase tracking-widest">NIT Kurukshetra</p>
              
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-2xl font-black text-blue-700">{myArticles.length}</p>
                  <p className="text-[10px] uppercase font-bold text-blue-400 tracking-tighter">Total Posts</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl">
                  <p className="text-2xl font-black text-emerald-700">
                    {myArticles.filter(a => a.status === 'approved').length}
                  </p>
                  <p className="text-[10px] uppercase font-bold text-emerald-400 tracking-tighter">Live Now</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-900 rounded-[2rem] p-6 text-white shadow-lg shadow-indigo-200">
             <div className="flex items-center gap-2 mb-2"><Sparkles className="text-yellow-400" size={20}/> <span className="font-bold">Daily Tip</span></div>
             <p className="text-indigo-100 text-xs leading-relaxed">Consistency is key. Try logging your mood everyday to see a clear pattern of your mental health journey!</p>
          </div>
        </div>

        {/* --- RIGHT: Content Area --- */}
        <div className="lg:col-span-8 space-y-8">
          {/* Post Box */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><PenTool size={20}/></div>
              <h3 className="font-bold text-gray-800 text-lg">Post an Article</h3>
            </div>
            <textarea 
              value={postText} onChange={(e) => setPostText(e.target.value)}
              className="w-full h-40 p-6 bg-gray-50 rounded-[1.5rem] outline-none focus:ring-4 ring-blue-50 transition-all resize-none text-gray-700 border-none placeholder:text-gray-300"
              placeholder="What's your story today? Tips for juniors? Exam stress hacks?"
            />
            <button 
              disabled={loading || !postText.trim()} 
              onClick={handlePost} 
              className="mt-4 w-full bg-[#1e3a8a] hover:bg-[#162a63] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-blue-100 disabled:opacity-50"
            >
              <Send size={20}/> {loading ? 'Sending to Admin...' : 'Share with Community'}
            </button>
          </div>

          {/* Activity Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <MessageSquare size={20} className="text-blue-600"/> My Recent Activity
              </h3>
            </div>

            {myArticles.length === 0 ? (
              <div className="bg-white p-12 rounded-[2.5rem] text-center border-2 border-dashed border-gray-100">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300"><Plus size={32}/></div>
                <p className="text-gray-400 font-medium italic">No articles yet. Your voice matters, start writing!</p>
              </div>
            ) : (
              myArticles.map((article) => (
                <div key={article.id} className="group bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-blue-200 shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-6">
                      <p className="text-gray-700 leading-relaxed font-medium">"{article.content}"</p>
                      <div className="mt-4 flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                         <span className="flex items-center gap-1"><Clock size={12}/> {article.createdAt?.toDate().toLocaleDateString() || 'Just now'}</span>
                         <span>•</span>
                         <span className="text-blue-500">{article.college}</span>
                      </div>
                    </div>
                    {article.status === 'approved' ? (
                      <div className="flex flex-col items-center gap-1 min-w-[80px]">
                        <div className="bg-emerald-50 text-emerald-600 p-2 rounded-full ring-4 ring-emerald-50"><CheckCircle size={20}/></div>
                        <span className="text-[10px] font-black text-emerald-600">LIVE</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 min-w-[80px]">
                        <div className="bg-orange-50 text-orange-600 p-2 rounded-full animate-pulse ring-4 ring-orange-50"><Hourglass size={20}/></div>
                        <span className="text-[10px] font-black text-orange-600">PENDING</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;