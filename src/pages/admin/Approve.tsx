import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Check, Trash2, User, Clock, Loader2, Filter, BookOpen, Heart, Calendar } from 'lucide-react';

type FilterType = 'all' | 'story' | 'feedback' | 'event';
const FILTERS: { key: FilterType; label: string; icon: React.ReactNode }[] = [
  { key: 'all', label: 'All', icon: <Filter size={14} /> },
  { key: 'story', label: 'Stories', icon: <BookOpen size={14} /> },
  { key: 'feedback', label: 'Feedback', icon: <Heart size={14} /> },
  { key: 'event', label: 'Events', icon: <Calendar size={14} /> },
];

const ROLE_COLORS: Record<string, string> = {
  student: '#6366F1',
  alumni: '#D4617A',
  professor: '#059669',
};

const Approve: React.FC = () => {
  const [pending, setPending] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const q = query(collection(db, 'articles'), where('status', '==', 'pending'));
    const unsub = onSnapshot(q, snap => {
      setPending(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'delete') => {
    setLoadingId(id);
    try {
      if (action === 'approve') {
        await updateDoc(doc(db, 'articles', id), { status: 'approved', approvedAt: new Date() });
      } else {
        if (window.confirm('Reject and delete this submission?')) {
          await deleteDoc(doc(db, 'articles', id));
        }
      }
    } catch (err) { console.error(err); }
    finally { setLoadingId(null); }
  };

  const filtered = filter === 'all' ? pending : pending.filter(p => p.type === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Moderation Queue</h1>
        <p className="text-gray-500 mt-1">Review submissions from students, alumni, and professors.</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-3">
        {FILTERS.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
            style={filter === f.key
              ? { background: '#D4617A', color: 'white', boxShadow: '0 4px 16px rgba(212,97,122,0.30)' }
              : { background: 'white', border: '1.5px solid #E5E7EB', color: '#374151' }}>
            {f.icon} {f.label}
            <span className="ml-1 text-xs px-2 py-0.5 rounded-full"
              style={{ background: filter === f.key ? 'rgba(255,255,255,0.25)' : '#F3F4F6', color: filter === f.key ? 'white' : '#6B7280' }}>
              {f.key === 'all' ? pending.length : pending.filter(p => p.type === f.key).length}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-5">
        {filtered.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-100 shadow-sm">
            <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">All clear!</h3>
            <p className="text-gray-400 mt-2">No {filter !== 'all' ? filter : ''} submissions pending review.</p>
          </div>
        ) : filtered.map(post => (
          <div key={post.id}
            className={`bg-white p-8 rounded-[2.5rem] border border-gray-100 transition-all ${loadingId === post.id ? 'opacity-50 scale-95' : 'hover:shadow-md'}`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1 space-y-3">
                {/* Header row */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-lg text-gray-500">
                    <User size={15} />
                  </div>
                  <span className="font-black text-gray-800 text-sm">{post.author || 'Anonymous'}</span>
                  {/* Role badge */}
                  <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full text-white"
                    style={{ background: ROLE_COLORS[post.userRole] || '#6B7280' }}>
                    {post.userRole || 'student'}
                  </span>
                  {/* Type badge */}
                  <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full"
                    style={{ background: '#FFF5F7', color: '#D4617A', border: '1px solid #F9C5CC' }}>
                    {post.type || 'story'}
                  </span>
                  <span className="text-gray-400 text-[10px] font-bold uppercase flex items-center gap-1">
                    <Clock size={11} /> {post.createdAt?.toDate().toLocaleDateString() || 'Today'}
                  </span>
                </div>

                {/* Event info */}
                {post.type === 'event' && post.eventTitle && (
                  <div className="flex items-center gap-3 text-sm font-bold" style={{ color: '#374151' }}>
                    <Calendar size={15} className="text-pink-500" />
                    {post.eventTitle} {post.eventDate && <span className="text-gray-400 font-normal">• {post.eventDate}</span>}
                  </div>
                )}

                <p className="text-gray-700 text-base leading-relaxed font-medium">"{post.content}"</p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 w-full md:w-auto">
                <button disabled={loadingId === post.id} onClick={() => handleAction(post.id, 'approve')}
                  className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-green-100 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50">
                  {loadingId === post.id ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
                  Approve
                </button>
                <button disabled={loadingId === post.id} onClick={() => handleAction(post.id, 'delete')}
                  className="p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-colors flex items-center justify-center" title="Reject">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approve;