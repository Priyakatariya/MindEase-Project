import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../../firebase';
import {
    collection, addDoc, query, where, onSnapshot,
    serverTimestamp, doc, updateDoc, deleteDoc,
} from 'firebase/firestore';
import {
    Send, Clock, FileText, Heart, Calendar,
    CheckCircle, Hourglass, Plus, GraduationCap,
    Pencil, Trash2, X, Save, Phone, Link as LinkIcon,
    CreditCard, Image as ImageIcon, MapPin, UserCircle,
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
    eventEndDate?: string;
    meetingLink?: string;
    paymentLink?: string;
    contactNumber?: string;
    imageUrl?: string;
    createdAt?: any;
}

// ─── Glassmorphism Card Wrapper ──────────────────────────────────────
const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div
        className={`rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}
        style={{
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(249,197,204,0.6)',
            boxShadow: '0 8px 32px rgba(212,97,122,0.08)',
        }}
    >
        {children}
    </div>
);

// ─── PostList with enhanced cards ────────────────────────────────────
const PostList = ({ title, icon, posts, editId, editText, setEditId, setEditText, onDelete, onEditSave }: any) => (
    <div className="space-y-3">
        <h3 className="font-black text-base flex items-center gap-2" style={{ color: '#3D1520' }}>{icon} {title}</h3>
        {posts.length === 0 ? (
            <div className="p-8 rounded-[2rem] text-center"
                style={{ background: 'rgba(255,255,255,0.50)', border: '2px dashed rgba(249,197,204,0.8)' }}>
                <Plus size={24} style={{ color: '#F9C5CC', margin: 'auto' }} />
                <p className="mt-2 text-sm" style={{ color: '#D4617A', opacity: 0.65 }}>Nothing yet.</p>
            </div>
        ) : posts.map((a: Article) => (
            <div key={a.id}
                className="p-5 rounded-[1.8rem] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.82)', border: '1.5px solid rgba(249,197,204,0.7)', boxShadow: '0 3px 12px rgba(212,97,122,0.05)' }}>
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
                            {a.imageUrl && (
                                <img src={a.imageUrl} alt="event" className="w-full h-32 object-cover rounded-xl mb-2" />
                            )}
                            {a.eventTitle && <h4 className="font-black text-sm mb-0.5" style={{ color: '#3D1520' }}>{a.eventTitle}</h4>}
                            {a.eventDate && <p className="text-[11px] font-bold mb-0.5" style={{ color: '#D4617A' }}>📅 Start: {a.eventDate}</p>}
                            {a.eventEndDate && <p className="text-[11px] font-bold mb-1" style={{ color: '#C44A6A' }}>🏁 End: {a.eventEndDate}</p>}
                            {a.contactNumber && <p className="text-[11px] font-bold mb-1" style={{ color: '#7A3545' }}>📞 {a.contactNumber}</p>}
                            {a.meetingLink && <a href={a.meetingLink} target="_blank" rel="noreferrer" className="text-[11px] font-bold mb-1 block underline" style={{ color: '#4F46E5' }}>🎥 Join Meeting</a>}
                            {a.paymentLink && <a href={a.paymentLink} target="_blank" rel="noreferrer" className="text-[11px] font-bold mb-1 block underline" style={{ color: '#059669' }}>💳 Payment Link</a>}
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
                            <button onClick={() => { setEditId(a.id); setEditText(a.content); }} className="p-1 rounded-lg hover:bg-pink-50 transition-colors"><Pencil size={13} style={{ color: '#D4617A' }} /></button>
                            <button onClick={() => onDelete(a.id)} className="p-1 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={13} className="text-red-400" /></button>
                        </div>
                    </div>
                )}
            </div>
        ))}
    </div>
);

// ─── Event Post Box (enhanced) ───────────────────────────────────────
const EventPostBox = ({ role, onPosted }: { role: string; onPosted: () => void }) => {
    const [content, setContent] = useState('');
    const [evTitle, setEvTitle] = useState('');
    const [evDate, setEvDate] = useState('');
    const [evEndDate, setEvEndDate] = useState('');
    const [meetingLink, setMeetingLink] = useState('');
    const [paymentLink, setPaymentLink] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result as string;
            setImageUrl(result);
            setImagePreview(result);
        };
        reader.readAsDataURL(file);
    };

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
                eventEndDate: evEndDate,
                meetingLink: meetingLink || '',
                paymentLink: paymentLink || '',
                contactNumber: contactNumber || '',
                imageUrl: imageUrl || '',
            });
            setContent(''); setEvTitle(''); setEvDate(''); setEvEndDate('');
            setMeetingLink(''); setPaymentLink(''); setContactNumber('');
            setImageUrl(''); setImagePreview(null);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3500);
            onPosted();
        } finally { setLoading(false); }
    };

    const inputStyle = {
        background: 'rgba(255,245,247,0.8)',
        border: '1.5px solid #F9C5CC',
        color: '#3D1520',
        borderRadius: '1rem',
        outline: 'none',
        width: '100%',
        padding: '0.75rem 1rem',
        fontSize: '0.875rem',
        transition: 'border-color 0.2s',
    } as React.CSSProperties;

    return (
        <GlassCard>
            <div className="flex items-center gap-3 px-6 py-4 border-b"
                style={{ borderColor: 'rgba(249,197,204,0.5)', background: 'linear-gradient(135deg,rgba(255,245,247,0.9),rgba(255,232,237,0.9))' }}>
                <Calendar size={18} style={{ color: '#D4617A' }} />
                <h3 className="font-black text-base" style={{ color: '#3D1520' }}>Post an Event</h3>
                <span className="ml-auto text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,232,237,0.9)', color: '#D4617A' }}>Visible to Students</span>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Title */}
                <input value={evTitle} onChange={e => setEvTitle(e.target.value)} placeholder="Event Title *"
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = '#D4617A'}
                    onBlur={e => e.currentTarget.style.borderColor = '#F9C5CC'} required />

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: '#D4617A' }}>Start Date</label>
                        <input type="date" value={evDate} onChange={e => setEvDate(e.target.value)} style={inputStyle}
                            onFocus={e => e.currentTarget.style.borderColor = '#D4617A'}
                            onBlur={e => e.currentTarget.style.borderColor = '#F9C5CC'} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: '#D4617A' }}>End Date</label>
                        <input type="date" value={evEndDate} onChange={e => setEvEndDate(e.target.value)} style={inputStyle}
                            onFocus={e => e.currentTarget.style.borderColor = '#D4617A'}
                            onBlur={e => e.currentTarget.style.borderColor = '#F9C5CC'} />
                    </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: '#D4617A' }}>
                            <LinkIcon size={10} /> Meeting Link
                        </label>
                        <input type="url" value={meetingLink} onChange={e => setMeetingLink(e.target.value)}
                            placeholder="https://meet.google.com/..." style={inputStyle}
                            onFocus={e => e.currentTarget.style.borderColor = '#D4617A'}
                            onBlur={e => e.currentTarget.style.borderColor = '#F9C5CC'} />
                    </div>
                    <div>
                        <label className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: '#D4617A' }}>
                            <CreditCard size={10} /> Payment Link
                        </label>
                        <input type="url" value={paymentLink} onChange={e => setPaymentLink(e.target.value)}
                            placeholder="https://rzp.io/... (optional)" style={inputStyle}
                            onFocus={e => e.currentTarget.style.borderColor = '#D4617A'}
                            onBlur={e => e.currentTarget.style.borderColor = '#F9C5CC'} />
                    </div>
                </div>

                {/* Contact Number */}
                <div>
                    <label className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: '#D4617A' }}>
                        <Phone size={10} /> Contact Number
                    </label>
                    <input type="tel" value={contactNumber} onChange={e => setContactNumber(e.target.value)}
                        placeholder="+91 98765 43210" style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderColor = '#D4617A'}
                        onBlur={e => e.currentTarget.style.borderColor = '#F9C5CC'} />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: '#D4617A' }}>
                        <ImageIcon size={10} /> Event Banner / Image
                    </label>
                    <div
                        className="border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer hover:border-pink-400 transition-colors"
                        style={{ borderColor: '#F9C5CC', background: 'rgba(255,245,247,0.5)' }}
                        onClick={() => fileRef.current?.click()}
                    >
                        {imagePreview ? (
                            <div className="relative">
                                <img src={imagePreview} alt="preview" className="w-full h-32 object-cover rounded-xl" />
                                <button type="button" onClick={(e) => { e.stopPropagation(); setImagePreview(null); setImageUrl(''); }}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5">
                                    <X size={12} />
                                </button>
                            </div>
                        ) : (
                            <div className="py-2">
                                <ImageIcon size={24} style={{ color: '#F9C5CC', margin: 'auto' }} />
                                <p className="text-xs mt-1 font-medium" style={{ color: '#D4617A', opacity: 0.7 }}>Click to upload image</p>
                            </div>
                        )}
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </div>
                </div>

                {/* Description */}
                <textarea value={content} onChange={e => setContent(e.target.value)} rows={4}
                    placeholder="Describe the event — agenda, who should attend, what participants will learn…"
                    className="w-full p-4 rounded-[1.5rem] outline-none resize-none text-sm"
                    style={{ background: 'rgba(255,245,247,0.8)', border: '1.5px solid #F9C5CC', color: '#3D1520' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#D4617A'}
                    onBlur={e => e.currentTarget.style.borderColor = '#F9C5CC'} required />

                {success && (
                    <div className="py-3 px-4 rounded-xl text-sm font-bold" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' }}>
                        ✅ Event submitted! Admin will review it.
                    </div>
                )}
                <button type="submit" disabled={loading || !content.trim()}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-white text-sm disabled:opacity-50 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: 'linear-gradient(135deg,#D4617A,#C44A6A)', boxShadow: '0 6px 20px rgba(212,97,122,0.28)' }}>
                    <Send size={15} /> {loading ? 'Posting…' : 'Post Event'}
                </button>
            </form>
        </GlassCard>
    );
};

// ─── Feedback Form ────────────────────────────────────────────────────
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
                style={{ background: 'rgba(255,245,247,0.8)', border: '1.5px solid #F9C5CC', color: '#3D1520' }}
                onFocus={e => e.currentTarget.style.borderColor = '#D4617A'}
                onBlur={e => e.currentTarget.style.borderColor = '#F9C5CC'} />
            {success && <div className="py-3 px-4 rounded-xl text-sm font-bold" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' }}>✅ Submitted!</div>}
            <button type="submit" disabled={loading || !text.trim()}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-white text-sm disabled:opacity-50 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg,#D4617A,#C44A6A)', boxShadow: '0 6px 20px rgba(212,97,122,0.28)' }}>
                <Send size={14} /> {loading ? 'Sending…' : 'Submit for Review'}
            </button>
        </form>
    );
};

// ─── Story Form ────────────────────────────────────────────────────────
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
                style={{ background: 'rgba(255,245,247,0.8)', border: '1.5px solid #F9C5CC', color: '#3D1520' }}
                onFocus={e => e.currentTarget.style.borderColor = '#D4617A'}
                onBlur={e => e.currentTarget.style.borderColor = '#F9C5CC'} />
            {success && <div className="py-3 px-4 rounded-xl text-sm font-bold" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' }}>✅ Submitted!</div>}
            <button type="submit" disabled={loading || !text.trim()}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-white text-sm disabled:opacity-50 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg,#D4617A,#C44A6A)', boxShadow: '0 6px 20px rgba(212,97,122,0.28)' }}>
                <Send size={14} /> {loading ? 'Sending…' : 'Submit for Review'}
            </button>
        </form>
    );
};

// ─── Main Dashboard ───────────────────────────────────────────────────
const AlumniProfessorDashboard: React.FC<Props> = ({ role }) => {
    const [myPosts, setMyPosts] = useState<Article[]>([]);
    const [editId, setEditId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');
    const [refresh, setRefresh] = useState(0);
    const label = role === 'professor' ? 'Professor' : 'Alumni';
    const emoji = role === 'professor' ? '👨‍🏫' : '🎓';

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
        { n: myPosts.length, l: 'Total Posts', icon: '📝', color: '#D4617A' },
        { n: myPosts.filter(p => p.status === 'approved').length, l: 'Live', icon: '✅', color: '#059669' },
        { n: myPosts.filter(p => p.status === 'pending').length, l: 'Pending', icon: '⏳', color: '#D97706' },
    ];

    const gradientByRole = role === 'professor'
        ? 'linear-gradient(135deg,#D97706 0%,#B45309 50%,#92400E 100%)'
        : 'linear-gradient(135deg,#D4617A 0%,#C44A6A 50%,#b83060 100%)';

    return (
        <div className="min-h-screen pb-20" style={{ background: 'linear-gradient(160deg, #FFF5F7 0%, #FFE8ED 50%, #FFF0F3 100%)' }}>
            {/* ── Hero Header ── */}
            <div className="relative overflow-hidden pt-24 pb-28 px-6" style={{ background: gradientByRole }}>
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(-20%, 30%)' }} />

                <div className="relative max-w-5xl mx-auto flex items-center gap-5 text-white">
                    <div className="bg-white/15 p-4 rounded-3xl backdrop-blur-md border border-white/20 shadow-xl">
                        <GraduationCap size={32} />
                    </div>
                    <div>
                        <p className="text-pink-100 text-xs font-black uppercase tracking-widest mb-0.5">{emoji} {label}</p>
                        <h1 className="text-3xl font-black">My Dashboard</h1>
                        <p className="text-white/70 text-sm mt-0.5">NIT Kurukshetra</p>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                        <div>
                            <p className="font-black text-sm text-right">{auth.currentUser?.displayName || 'User'}</p>
                            <p className="text-white/60 text-xs text-right">{auth.currentUser?.email}</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-black border-2 border-white/30"
                            style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
                            <UserCircle size={26} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 -mt-14 space-y-8">

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    {stats.map((s, i) => (
                        <div key={i}
                            className="p-5 rounded-[2rem] text-center group cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            style={{
                                background: 'rgba(255,255,255,0.80)',
                                backdropFilter: 'blur(12px)',
                                border: '1.5px solid rgba(249,197,204,0.6)',
                                boxShadow: '0 4px 16px rgba(212,97,122,0.08)',
                            }}>
                            <div className="text-2xl mb-1">{s.icon}</div>
                            <p className="text-3xl font-black" style={{ color: s.color }}>{s.n}</p>
                            <p className="text-[10px] uppercase font-bold mt-1" style={{ color: '#7A3545', opacity: 0.65 }}>{s.l}</p>
                        </div>
                    ))}
                </div>

                {/* ── Create: Feedback ── */}
                <GlassCard>
                    <div className="flex items-center gap-3 px-6 py-4 border-b"
                        style={{ borderColor: 'rgba(249,197,204,0.5)', background: 'linear-gradient(135deg,rgba(255,245,247,0.9),rgba(255,232,237,0.9))' }}>
                        <Heart size={18} style={{ color: '#D4617A' }} />
                        <h3 className="font-black text-base" style={{ color: '#3D1520' }}>Share Feedback</h3>
                        <span className="ml-auto text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(255,232,237,0.9)', color: '#D4617A' }}>Appears on Home Page</span>
                    </div>
                    <FeedbackPostForm role={role} onPosted={onPosted} />
                </GlassCard>

                {/* ── Create: Story ── */}
                <GlassCard>
                    <div className="flex items-center gap-3 px-6 py-4 border-b"
                        style={{ borderColor: 'rgba(249,197,204,0.5)', background: 'linear-gradient(135deg,rgba(255,245,247,0.9),rgba(255,232,237,0.9))' }}>
                        <FileText size={18} style={{ color: '#D4617A' }} />
                        <h3 className="font-black text-base" style={{ color: '#3D1520' }}>Share Your Story</h3>
                        <span className="ml-auto text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(255,232,237,0.9)', color: '#D4617A' }}>Appears on Stories Page</span>
                    </div>
                    <StoryPostForm role={role} onPosted={onPosted} />
                </GlassCard>

                {/* ── Create: Event ── */}
                <EventPostBox role={role} onPosted={onPosted} />

                {/* ── Lists ── */}
                <PostList title="My Feedback" icon={<Heart size={16} style={{ color: '#D4617A' }} />}
                    posts={feedbackPosts} editId={editId} editText={editText}
                    setEditId={setEditId} setEditText={setEditText}
                    onDelete={handleDelete} onEditSave={handleEditSave} />

                <PostList title="My Stories" icon={<FileText size={16} style={{ color: '#D4617A' }} />}
                    posts={storyPosts} editId={editId} editText={editText}
                    setEditId={setEditId} setEditText={setEditText}
                    onDelete={handleDelete} onEditSave={handleEditSave} />

                <PostList title="My Events" icon={<Calendar size={16} style={{ color: '#D4617A' }} />}
                    posts={eventPosts} editId={editId} editText={editText}
                    setEditId={setEditId} setEditText={setEditText}
                    onDelete={handleDelete} onEditSave={handleEditSave} />
            </div>
        </div>
    );
};

export default AlumniProfessorDashboard;
