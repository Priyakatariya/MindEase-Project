import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import {
    collection, addDoc, query, where, onSnapshot,
    serverTimestamp, doc, updateDoc, deleteDoc,
} from 'firebase/firestore';
import {
    Send, Clock, FileText, Heart, Calendar,
    CheckCircle, Hourglass, Plus, GraduationCap,
    Pencil, Trash2, X, Save,
} from 'lucide-react';

interface Props { role: 'alumni' | 'professor'; }
type PostType = 'story' | 'feedback' | 'event';

interface Article {
    id: string;
    uid: string;
    author: string;
    content: string;
    type: PostType;
    status: string;
    eventTitle?: string;
    eventDate?: string;
    createdAt?: any;
}

// ─── Generic PostBox ─────────────────────────────────────────────────
const PostBox = ({
    type, label, icon, badge, placeholder, extra, onPosted,
}: {
    type: PostType; label: string; icon: React.ReactNode;
    badge: string; placeholder: string;
    extra?: React.ReactNode;
    onPosted: () => void;
}) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [evTitle, setEvTitle] = useState('');
    const [evDate, setEvDate] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || !auth.currentUser) return;
        setLoading(true);
        try {
            await addDoc(collection(db, 'articles'), {
                uid: auth.currentUser.uid,
                author: auth.currentUser.displayName || 'Anonymous',
                content: text.trim(),
                type,
                userRole: (auth.currentUser as any)._role || 'alumni', // will be overridden by prop via extra
                college: 'NIT Kurukshetra',
                status: 'pending',
                createdAt: serverTimestamp(),
                ...(type === 'event' ? { eventTitle: evTitle, eventDate: evDate } : {}),
            });
            setText(''); setEvTitle(''); setEvDate('');
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3500);
            onPosted();
        } finally { setLoading(false); }
    };

    return (
        <div className="rounded-[2rem] overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.90)', border: '1.5px solid #F9C5CC', boxShadow: '0 6px 24px rgba(212,97,122,0.07)' }}>
            <div className="flex items-center gap-3 px-6 py-4 border-b" style={{ borderColor: '#F9C5CC', background: 'linear-gradient(135deg,#FFF5F7,#FFE8ED)' }}>
                {icon}
                <h3 className="font-black text-base" style={{ color: '#3D1520' }}>{label}</h3>
                <span className="ml-auto text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: '#FFE8ED', color: '#D4617A' }}>{badge}</span>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {extra}
                <textarea
                    value={text} onChange={e => setText(e.target.value)}
                    rows={4} placeholder={placeholder}
                    className="w-full p-4 rounded-[1.5rem] outline-none resize-none text-sm transition-all"
                    style={{ background: '#FFF5F7', border: '1.5px solid #F9C5CC', color: '#3D1520' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#D4617A'}
                    onBlur={e => e.currentTarget.style.borderColor = '#F9C5CC'}
                />
                {type === 'event' && (
                    <div className="grid grid-cols-2 gap-3 hidden" id="event-extra-internal">
                        {/* Title/date injected via extra prop below */}
                    </div>
                )}
                {success && (
                    <div className="py-3 px-4 rounded-xl text-sm font-bold" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' }}>
                        ✅ Submitted! Waiting for admin approval.
                    </div>
                )}
                <button type="submit" disabled={loading || !text.trim()}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-white text-sm disabled:opacity-50 transition-all"
                    style={{ background: 'linear-gradient(135deg,#D4617A,#C44A6A)', boxShadow: '0 6px 20px rgba(212,97,122,0.28)' }}>
                    <Send size={15} /> {loading ? 'Sending…' : 'Submit for Review'}
                </button>
            </form>
        </div>
    );
};

// ─── PostBox specialised for Events ─────────────────────────────────
const EventPostBox = ({ role, onPosted }: { role: string; onPosted: () => void }) => {
    const [content, setContent] = useState('');
    const [evTitle, setEvTitle] = useState('');
    const [evDate, setEvDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !auth.currentUser) return;
        setLoading(true);
        try {
            await addDoc(collection(db, 'articles'), {
                uid: auth.currentUser.uid,
                author: auth.currentUser.displayName || 'Anonymous',
                content: content.trim(),
                type: 'event',
                userRole: role,
                college: 'NIT Kurukshetra',
                status: 'pending',
                createdAt: serverTimestamp(),
                eventTitle: evTitle,
                eventDate: evDate,
            });
            setContent(''); setEvTitle(''); setEvDate('');
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3500);
            onPosted();
        } finally { setLoading(false); }
    };

    return (
        <div className="rounded-[2rem] overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.90)', border: '1.5px solid #F9C5CC', boxShadow: '0 6px 24px rgba(212,97,122,0.07)' }}>
            <div className="flex items-center gap-3 px-6 py-4 border-b" style={{ borderColor: '#F9C5CC', background: 'linear-gradient(135deg,#FFF5F7,#FFE8ED)' }}>
                <Calendar size={18} style={{ color: '#D4617A' }} />
                <h3 className="font-black text-base" style={{ color: '#3D1520' }}>Post an Event</h3>
                <span className="ml-auto text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: '#FFE8ED', color: '#D4617A' }}>Visible to Students</span>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <input value={evTitle} onChange={e => setEvTitle(e.target.value)} placeholder="Event Title *"
                        className="p-3.5 rounded-2xl text-sm outline-none"
                        style={{ background: '#FFF5F7', border: '1.5px solid #F9C5CC', color: '#3D1520' }} />
                    <input type="date" value={evDate} onChange={e => setEvDate(e.target.value)}
                        className="p-3.5 rounded-2xl text-sm outline-none"
                        style={{ background: '#FFF5F7', border: '1.5px solid #F9C5CC', color: '#3D1520' }} />
                </div>
                <textarea value={content} onChange={e => setContent(e.target.value)} rows={4}
                    placeholder="Describe the event — agenda, who should attend, what participants will learn…"
                    className="w-full p-4 rounded-[1.5rem] outline-none resize-none text-sm"
                    style={{ background: '#FFF5F7', border: '1.5px solid #F9C5CC', color: '#3D1520' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#D4617A'}
                    onBlur={e => e.currentTarget.style.borderColor = '#F9C5CC'}
                />
                {success && (
                    <div className="py-3 px-4 rounded-xl text-sm font-bold" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' }}>
                        ✅ Event submitted! Admin will review it.
                    </div>
                )}
                <button type="submit" disabled={loading || !content.trim()}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-white text-sm disabled:opacity-50 transition-all"
                    style={{ background: 'linear-gradient(135deg,#D4617A,#C44A6A)', boxShadow: '0 6px 20px rgba(212,97,122,0.28)' }}>
                    <Send size={15} /> {loading ? 'Posting…' : 'Post Event'}
                </button>
            </form>
        </div>
    );
};

// ─── PostList (inline edit & delete) ─────────────────────────────────
const PostList = ({ title, icon, posts, editId, editText, setEditId, setEditText, onDelete, onEditSave }: any) => (
    <div className="space-y-3">
        <h3 className="font-black text-base flex items-center gap-2" style={{ color: '#3D1520' }}>{icon} {title}</h3>
        {posts.length === 0 ? (
            <div className="p-8 rounded-[2rem] text-center" style={{ background: 'rgba(255,255,255,0.60)', border: '2px dashed #F9C5CC' }}>
                <Plus size={24} style={{ color: '#F9C5CC', margin: 'auto' }} />
                <p className="mt-2 text-sm" style={{ color: '#D4617A', opacity: 0.65 }}>Nothing yet.</p>
            </div>
        ) : posts.map((a: Article) => (
            <div key={a.id} className="p-5 rounded-[1.8rem]"
                style={{ background: 'rgba(255,255,255,0.88)', border: '1.5px solid #F9C5CC', boxShadow: '0 3px 12px rgba(212,97,122,0.05)' }}>
                {editId === a.id ? (
                    <div className="space-y-3">
                        <textarea value={editText} onChange={e => setEditText(e.target.value)} rows={3}
                            className="w-full p-3 rounded-xl outline-none resize-none text-sm"
                            style={{ background: '#FFF5F7', border: '1.5px solid #F9C5CC', color: '#3D1520' }} />
                        <p className="text-xs font-bold" style={{ color: '#D4617A', opacity: 0.7 }}>* Editing resets to Pending.</p>
                        <div className="flex gap-3">
                            <button onClick={() => onEditSave(a.id)} className="flex gap-1.5 px-5 py-2 rounded-xl text-xs font-black text-white items-center" style={{ background: '#D4617A' }}><Save size={12} /> Save</button>
                            <button onClick={() => setEditId(null)} className="flex gap-1.5 px-4 py-2 rounded-xl text-xs font-bold items-center" style={{ background: '#FFF5F7', border: '1px solid #F9C5CC', color: '#7A3545' }}><X size={12} /> Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-4 items-start">
                        <div className="flex-1">
                            {a.eventTitle && <h4 className="font-black text-sm mb-0.5" style={{ color: '#3D1520' }}>{a.eventTitle}</h4>}
                            {a.eventDate && <p className="text-[11px] font-bold mb-1" style={{ color: '#D4617A' }}>{a.eventDate}</p>}
                            <p className="text-sm leading-relaxed" style={{ color: '#3D1520' }}>"{a.content}"</p>
                            <p className="text-[10px] uppercase font-bold mt-2 flex items-center gap-1" style={{ color: '#D4617A', opacity: 0.55 }}>
                                <Clock size={9} /> {a.createdAt?.toDate?.()?.toLocaleDateString() || 'Just now'}
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                            {a.status === 'approved'
                                ? <><CheckCircle size={15} className="text-emerald-500" /><span className="text-[9px] font-black text-emerald-500">LIVE</span></>
                                : <><Hourglass size={15} className="text-orange-400 animate-pulse" /><span className="text-[9px] font-black text-orange-400">PENDING</span></>
                            }
                            <button onClick={() => { setEditId(a.id); setEditText(a.content); }} className="p-1 rounded-lg hover:bg-pink-50"><Pencil size={13} style={{ color: '#D4617A' }} /></button>
                            <button onClick={() => onDelete(a.id)} className="p-1 rounded-lg hover:bg-red-50"><Trash2 size={13} className="text-red-400" /></button>
                        </div>
                    </div>
                )}
            </div>
        ))}
    </div>
);

// ─── Main ─────────────────────────────────────────────────────────────
const AlumniProfessorDashboard: React.FC<Props> = ({ role }) => {
    const [myPosts, setMyPosts] = useState<Article[]>([]);
    const [editId, setEditId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');
    const [refresh, setRefresh] = useState(0);
    const label = role === 'professor' ? 'Professor' : 'Alumni';

    useEffect(() => {
        if (!auth.currentUser) return;
        const q = query(collection(db, 'articles'), where('uid', '==', auth.currentUser.uid));
        const unsub = onSnapshot(q, snap => {
            const docs = snap.docs.map(d => ({ id: d.id, ...d.data() } as Article));
            setMyPosts(docs.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
        });
        return () => unsub();
    }, [refresh]);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this post permanently?')) return;
        await deleteDoc(doc(db, 'articles', id));
    };

    const handleEditSave = async (id: string) => {
        if (!editText.trim()) return;
        await updateDoc(doc(db, 'articles', id), { content: editText, status: 'pending' });
        setEditId(null);
    };

    const storyPosts = myPosts.filter(p => p.type === 'story');
    const feedbackPosts = myPosts.filter(p => p.type === 'feedback');
    const eventPosts = myPosts.filter(p => p.type === 'event');
    const onPosted = () => setRefresh(r => r + 1);

    const stats = [
        { n: myPosts.length, l: 'Total' },
        { n: myPosts.filter(p => p.status === 'approved').length, l: 'Live' },
        { n: myPosts.filter(p => p.status === 'pending').length, l: 'Pending' },
    ];

    return (
        <div className="min-h-screen pb-20" style={{ background: '#FFF5F7' }}>
            {/* Header */}
            <div className="relative overflow-hidden pt-16 pb-24 px-6"
                style={{ background: 'linear-gradient(135deg,#D4617A 0%,#C44A6A 50%,#b83060 100%)' }}>
                <div className="relative max-w-5xl mx-auto flex items-center gap-5 text-white">
                    <div className="bg-white/15 p-4 rounded-3xl backdrop-blur-md"><GraduationCap size={30} /></div>
                    <div>
                        <p className="text-pink-200 text-xs font-black uppercase tracking-widest mb-0.5">{label}</p>
                        <h1 className="text-3xl font-black">My Dashboard</h1>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-lg font-black"
                            style={{ background: 'rgba(255,255,255,0.18)' }}>
                            {auth.currentUser?.displayName?.charAt(0) || '?'}
                        </div>
                        <div className="hidden sm:block">
                            <p className="font-black text-sm">{auth.currentUser?.displayName}</p>
                            <p className="text-pink-200 text-xs">{label} • NIT Kurukshetra</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 -mt-12 space-y-8">

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    {stats.map((s, i) => (
                        <div key={i} className="p-5 rounded-[2rem] text-center"
                            style={{ background: 'rgba(255,255,255,0.90)', border: '1.5px solid #F9C5CC', boxShadow: '0 4px 16px rgba(212,97,122,0.08)' }}>
                            <p className="text-3xl font-black" style={{ color: i === 1 ? '#059669' : '#D4617A' }}>{s.n}</p>
                            <p className="text-[10px] uppercase font-bold mt-1" style={{ color: '#7A3545', opacity: 0.65 }}>{s.l}</p>
                        </div>
                    ))}
                </div>

                {/* ── Create: Feedback ── */}
                <div className="rounded-[2rem] overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.90)', border: '1.5px solid #F9C5CC', boxShadow: '0 6px 24px rgba(212,97,122,0.07)' }}>
                    <div className="flex items-center gap-3 px-6 py-4 border-b" style={{ borderColor: '#F9C5CC', background: 'linear-gradient(135deg,#FFF5F7,#FFE8ED)' }}>
                        <Heart size={18} style={{ color: '#D4617A' }} />
                        <h3 className="font-black text-base" style={{ color: '#3D1520' }}>Share Feedback</h3>
                        <span className="ml-auto text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: '#FFE8ED', color: '#D4617A' }}>Appears on Home Page</span>
                    </div>
                    <FeedbackPostForm role={role} onPosted={onPosted} />
                </div>

                {/* ── Create: Story ── */}
                <div className="rounded-[2rem] overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.90)', border: '1.5px solid #F9C5CC', boxShadow: '0 6px 24px rgba(212,97,122,0.07)' }}>
                    <div className="flex items-center gap-3 px-6 py-4 border-b" style={{ borderColor: '#F9C5CC', background: 'linear-gradient(135deg,#FFF5F7,#FFE8ED)' }}>
                        <FileText size={18} style={{ color: '#D4617A' }} />
                        <h3 className="font-black text-base" style={{ color: '#3D1520' }}>Share Your Story</h3>
                        <span className="ml-auto text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: '#FFE8ED', color: '#D4617A' }}>Appears on Stories Page</span>
                    </div>
                    <StoryPostForm role={role} onPosted={onPosted} />
                </div>

                {/* ── Create: Event ── */}
                <EventPostBox role={role} onPosted={onPosted} />

                {/* ── My Feedback list ── */}
                <PostList title="My Feedback" icon={<Heart size={16} style={{ color: '#D4617A' }} />}
                    posts={feedbackPosts} editId={editId} editText={editText}
                    setEditId={setEditId} setEditText={setEditText}
                    onDelete={handleDelete} onEditSave={handleEditSave} />

                {/* ── My Stories list ── */}
                <PostList title="My Stories" icon={<FileText size={16} style={{ color: '#D4617A' }} />}
                    posts={storyPosts} editId={editId} editText={editText}
                    setEditId={setEditId} setEditText={setEditText}
                    onDelete={handleDelete} onEditSave={handleEditSave} />

                {/* ── My Events list ── */}
                <PostList title="My Events" icon={<Calendar size={16} style={{ color: '#D4617A' }} />}
                    posts={eventPosts} editId={editId} editText={editText}
                    setEditId={setEditId} setEditText={setEditText}
                    onDelete={handleDelete} onEditSave={handleEditSave} />

            </div>
        </div>
    );
};

// ─── Inline form helpers (role-aware) ────────────────────────────────
const FeedbackPostForm = ({ role, onPosted }: { role: string; onPosted: () => void }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || !auth.currentUser) return;
        setLoading(true);
        try {
            await addDoc(collection(db, 'articles'), {
                uid: auth.currentUser.uid, author: auth.currentUser.displayName || 'Anonymous',
                content: text.trim(), type: 'feedback', userRole: role,
                college: 'NIT Kurukshetra', status: 'pending', createdAt: serverTimestamp(),
            });
            setText(''); setSuccess(true); setTimeout(() => setSuccess(false), 3500); onPosted();
        } finally { setLoading(false); }
    };
    return (
        <form onSubmit={submit} className="p-6 space-y-4">
            <textarea value={text} onChange={e => setText(e.target.value)} rows={4}
                placeholder="A short testimonial or encouraging message for students — may appear on the home page."
                className="w-full p-4 rounded-[1.5rem] outline-none resize-none text-sm"
                style={{ background: '#FFF5F7', border: '1.5px solid #F9C5CC', color: '#3D1520' }}
                onFocus={e => e.currentTarget.style.borderColor = '#D4617A'}
                onBlur={e => e.currentTarget.style.borderColor = '#F9C5CC'} />
            {success && <div className="py-3 px-4 rounded-xl text-sm font-bold" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' }}>✅ Submitted!</div>}
            <button type="submit" disabled={loading || !text.trim()}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-white text-sm disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg,#D4617A,#C44A6A)', boxShadow: '0 6px 20px rgba(212,97,122,0.28)' }}>
                <Send size={14} /> {loading ? 'Sending…' : 'Submit for Review'}
            </button>
        </form>
    );
};

const StoryPostForm = ({ role, onPosted }: { role: string; onPosted: () => void }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || !auth.currentUser) return;
        setLoading(true);
        try {
            await addDoc(collection(db, 'articles'), {
                uid: auth.currentUser.uid, author: auth.currentUser.displayName || 'Anonymous',
                content: text.trim(), type: 'story', userRole: role,
                college: 'NIT Kurukshetra', status: 'pending', createdAt: serverTimestamp(),
            });
            setText(''); setSuccess(true); setTimeout(() => setSuccess(false), 3500); onPosted();
        } finally { setLoading(false); }
    };
    return (
        <form onSubmit={submit} className="p-6 space-y-4">
            <textarea value={text} onChange={e => setText(e.target.value)} rows={4}
                placeholder="Share your experience at NIT Kurukshetra, a lesson learned, or how MindEase impacted your journey…"
                className="w-full p-4 rounded-[1.5rem] outline-none resize-none text-sm"
                style={{ background: '#FFF5F7', border: '1.5px solid #F9C5CC', color: '#3D1520' }}
                onFocus={e => e.currentTarget.style.borderColor = '#D4617A'}
                onBlur={e => e.currentTarget.style.borderColor = '#F9C5CC'} />
            {success && <div className="py-3 px-4 rounded-xl text-sm font-bold" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' }}>✅ Submitted!</div>}
            <button type="submit" disabled={loading || !text.trim()}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-white text-sm disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg,#D4617A,#C44A6A)', boxShadow: '0 6px 20px rgba(212,97,122,0.28)' }}>
                <Send size={14} /> {loading ? 'Sending…' : 'Submit for Review'}
            </button>
        </form>
    );
};

export default AlumniProfessorDashboard;
