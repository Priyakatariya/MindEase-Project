import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Check, Trash2, User, Clock, AlertCircle, Loader2 } from 'lucide-react';

const Approve: React.FC = () => {
  const [pending, setPending] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    // 🔥 FIX: Sirf 'pending' posts hi fetch honge
    const q = query(
      collection(db, "articles"), 
      where("status", "==", "pending") 
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const pendingPosts = snap.docs.map(d => ({ 
        id: d.id, 
        ...d.data() 
      }));
      setPending(pendingPosts);
    });

    return () => unsubscribe();
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'delete') => {
    setLoadingId(id); // Show loading for specific card
    try {
      if (action === 'approve') {
        // Status change hote hi 'where' filter ise list se hata dega
        await updateDoc(doc(db, "articles", id), { 
          status: 'approved',
          approvedAt: new Date() 
        });
      } else {
        if (window.confirm("Are you sure you want to reject/delete this post?")) {
          await deleteDoc(doc(db, "articles", id));
        }
      }
    } catch (error) {
      console.error("Action failed", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Moderation Queue</h1>
        <p className="text-gray-500 mt-1">Review student posts to maintain a healthy community.</p>
      </div>

      <div className="grid gap-6">
        {pending.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-100 shadow-sm">
            <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Everything is Approved!</h3>
            <p className="text-gray-400 mt-2">No pending posts to review at the moment.</p>
          </div>
        ) : (
          pending.map((post) => (
            <div 
              key={post.id} 
              className={`bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 transition-all transform ${
                loadingId === post.id ? 'opacity-50 scale-95' : 'hover:shadow-md'
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                      <User size={16} />
                    </div>
                    <span className="font-bold text-gray-800 text-sm">
                      {post.author || 'Anonymous'}
                    </span>
                    <span className="text-gray-300 text-xs">•</span>
                    <span className="text-gray-400 text-[10px] font-bold uppercase flex items-center gap-1">
                      <Clock size={12}/> {post.createdAt?.toDate().toLocaleDateString() || 'Today'}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    "{post.content}"
                  </p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <button 
                    disabled={loadingId === post.id}
                    onClick={() => handleAction(post.id, 'approve')}
                    className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-green-100 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loadingId === post.id ? <Loader2 className="animate-spin" /> : <Check size={20}/>}
                    Approve
                  </button>
                  
                  <button 
                    disabled={loadingId === post.id}
                    onClick={() => handleAction(post.id, 'delete')}
                    className="p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-colors flex items-center justify-center"
                    title="Reject Post"
                  >
                    <Trash2 size={20}/>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Approve;