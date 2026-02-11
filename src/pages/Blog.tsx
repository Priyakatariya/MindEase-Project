import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Path check kar lena
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import {
  MessageSquare, Heart, Share2, Clock,
  Sparkles, Quote, Bookmark
} from 'lucide-react';

const Blog: React.FC = () => {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simplified query - orderBy with where requires composite index
    // First try with just where clause
    const q = query(
      collection(db, "articles"),
      where("status", "==", "approved")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveStories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Sort by createdAt in JavaScript instead of Firestore
      const sortedStories = liveStories.sort((a: any, b: any) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return b.createdAt.toMillis() - a.createdAt.toMillis();
      });

      setStories(sortedStories);
      setLoading(false);
      console.log("Fetched stories:", sortedStories.length);
    }, (error) => {
      console.error("Firestore Error:", error);
      console.error("Error details:", error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* --- Attractive Hero Section --- */}
      <div className="bg-[#1e3a8a] py-16 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-blue-200 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-md border border-white/10">
            <Sparkles size={14} /> NITK Student Voice
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Community <span className="text-blue-300">Stories</span>
          </h1>
          <p className="text-blue-100/80 text-lg max-w-xl mx-auto font-medium">
            Verified experiences and mental wellness insights from your peers at NIT Kurukshetra.
          </p>
        </div>
      </div>

      {/* --- Main Blog Feed --- */}
      <div className="max-w-3xl mx-auto px-6 -mt-10">
        {loading ? (
          <div className="bg-white p-20 rounded-[3rem] text-center shadow-xl border border-gray-50">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 font-bold italic">Loading latest stories...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] text-center shadow-xl border-2 border-dashed border-gray-100">
            <Bookmark className="mx-auto text-gray-200 mb-4" size={50} />
            <h3 className="text-xl font-bold text-gray-800">No Stories Yet</h3>
            <p className="text-gray-400 mt-2">Approved stories will appear here.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {stories.map((story) => (
              <article
                key={story.id}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white hover:border-blue-100 transition-all"
              >
                {/* Header: Author & Time */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1e3a8a] font-black text-xl border border-blue-100">
                      {story.author?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-none mb-1">{story.author}</h4>
                      <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase">
                        <Clock size={12} className="text-blue-500" />
                        {story.createdAt?.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-full tracking-tighter border border-emerald-100">
                    VERIFIED POST
                  </span>
                </div>

                {/* Content */}
                <div className="relative mb-8">
                  <Quote className="absolute -top-2 -left-2 text-gray-50" size={40} />
                  <p className="relative z-10 text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                    {story.content}
                  </p>
                </div>

                {/* Footer: Interactions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-rose-500 transition-colors font-bold text-xs uppercase tracking-widest">
                      <Heart size={18} /> Like
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors font-bold text-xs uppercase tracking-widest">
                      <MessageSquare size={18} /> Support
                    </button>
                  </div>
                  <button className="text-gray-300 hover:text-[#1e3a8a] transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;