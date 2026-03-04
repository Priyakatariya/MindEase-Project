import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
    Camera, Pencil, Save, X, Mail, GraduationCap,
    Building2, User, CheckCircle, ArrowLeft,
    ShieldCheck, Hash, Star, BookOpen, Award
} from 'lucide-react';

// ── helpers ───────────────────────────────────────────────────────────
const initials = (s: string) =>
    s.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

const ROLE_THEME: Record<string, { g: string; light: string; chip: string; text: string }> = {
    student: { g: 'linear-gradient(135deg,#D4617A,#C44A6A,#a83060)', light: '#FFF5F7', chip: '#FFE8ED', text: '#D4617A' },
    alumni: { g: 'linear-gradient(135deg,#059669,#0D9488)', light: '#F0FDF4', chip: '#D1FAE5', text: '#059669' },
    professor: { g: 'linear-gradient(135deg,#D97706,#B45309)', light: '#FFFBEB', chip: '#FEF3C7', text: '#D97706' },
    admin: { g: 'linear-gradient(135deg,#7C3AED,#6366F1)', light: '#F5F3FF', chip: '#EDE9FE', text: '#7C3AED' },
};

// ── component ─────────────────────────────────────────────────────────
const UserProfile: React.FC = () => {
    const navigate = useNavigate();
    const fileRef = useRef<HTMLInputElement>(null);
    const currentUser = auth.currentUser;

    const [firestoreData, setFirestoreData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [savedOk, setSavedOk] = useState(false);
    const [saveError, setSaveError] = useState('');

    // editable state
    const [editName, setEditName] = useState('');
    const [editAbout, setEditAbout] = useState('');
    const [photoPreview, setPhotoPreview] = useState('');
    const [photoBase64, setPhotoBase64] = useState('');

    // ── load ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (!currentUser) { navigate('/login'); return; }
        (async () => {
            const snap = await getDoc(doc(db, 'users', currentUser.uid));
            const data = snap.exists() ? snap.data() : {};
            setFirestoreData(data);
            setEditName(data.name || currentUser.displayName || '');
            setEditAbout(data.aboutMe || '');
            setPhotoBase64(data.photoBase64 || '');
            setPhotoPreview(data.photoBase64 || '');
            setLoading(false);
        })();
    }, [currentUser, navigate]);

    // ── photo pick ────────────────────────────────────────────────────
    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (f.size > 2 * 1024 * 1024) { alert('Max 2 MB'); return; }
        const reader = new FileReader();
        reader.onload = ev => {
            const b = ev.target?.result as string;
            setPhotoPreview(b);
            setPhotoBase64(b);
        };
        reader.readAsDataURL(f);
    };

    // ── save ──────────────────────────────────────────────────────────
    const handleSave = async () => {
        if (!currentUser || !editName.trim()) return;
        setSaving(true);
        setSaveError('');
        try {
            await updateProfile(currentUser, {
                displayName: editName.trim(),
                photoURL: photoBase64 || null,
            });
            // Use setDoc with merge:true  so it works even if doc doesn't exist yet
            await setDoc(doc(db, 'users', currentUser.uid), {
                name: editName.trim(),
                aboutMe: editAbout.trim(),
                photoBase64: photoBase64 || '',
            }, { merge: true });
            setFirestoreData(prev => ({
                ...prev,
                name: editName.trim(),
                aboutMe: editAbout.trim(),
                photoBase64: photoBase64 || '',
            }));
            setEditMode(false);
            setSavedOk(true);
            setTimeout(() => setSavedOk(false), 3000);
        } catch (err: any) {
            setSaveError(err?.message || 'Save failed. Try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setEditName(firestoreData.name || currentUser?.displayName || '');
        setEditAbout(firestoreData.aboutMe || '');
        setPhotoPreview(photoBase64);
        setSaveError('');
        setEditMode(false);
    };

    // ── render ────────────────────────────────────────────────────────
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFF5F7' }}>
            <div className="w-14 h-14 rounded-full border-4 border-t-rose-500 animate-spin"
                style={{ borderColor: '#FFE8ED', borderTopColor: '#D4617A' }} />
        </div>
    );

    const userType: string = firestoreData.userType || 'student';
    const theme = ROLE_THEME[userType] || ROLE_THEME.student;
    const email = currentUser?.email || '';
    const name = firestoreData.name || currentUser?.displayName || '';
    const about = firestoreData.aboutMe || '';

    const chips = [
        firestoreData.department && { icon: <Building2 size={11} />, label: firestoreData.department },
        firestoreData.rollNo && { icon: <Hash size={11} />, label: firestoreData.rollNo },
        firestoreData.yearOrBatch && { icon: <BookOpen size={11} />, label: firestoreData.yearOrBatch },
        firestoreData.designation && { icon: <Award size={11} />, label: firestoreData.designation },
    ].filter(Boolean) as { icon: React.ReactNode; label: string }[];

    const infoRows = [
        { icon: <Mail size={16} />, label: 'Email', value: email, badge: 'Verified' },
        firestoreData.department && { icon: <Building2 size={16} />, label: 'Department', value: firestoreData.department },
        firestoreData.rollNo && { icon: <Hash size={16} />, label: 'Roll No.', value: firestoreData.rollNo },
        firestoreData.yearOrBatch && {
            icon: <GraduationCap size={16} />,
            label: userType === 'alumni' ? 'Batch' : 'Year',
            value: firestoreData.yearOrBatch,
        },
        firestoreData.designation && { icon: <Award size={16} />, label: 'Designation', value: firestoreData.designation },
        { icon: <ShieldCheck size={16} />, label: 'Role', value: userType.charAt(0).toUpperCase() + userType.slice(1) },
    ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; badge?: string }[];

    return (
        <div className="min-h-screen pb-16 pt-20"
            style={{ background: 'linear-gradient(160deg,#FFF5F7 0%,#FFE8ED 55%,#FFF0F3 100%)' }}>

            {/* blobs */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full"
                    style={{ background: 'radial-gradient(circle,rgba(212,97,122,0.18) 0%,transparent 70%)' }} />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full"
                    style={{ background: 'radial-gradient(circle,rgba(196,74,106,0.12) 0%,transparent 70%)' }} />
            </div>

            <div className="max-w-xl mx-auto px-4">

                {/* back */}
                <button onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-5 text-sm font-bold group transition-all"
                    style={{ color: '#D4617A' }}>
                    <ArrowLeft size={17} className="group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                {/* ── Card ── */}
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl"
                    style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', border: '1.5px solid rgba(249,197,204,0.7)' }}>

                    {/* banner */}
                    <div className="relative h-32" style={{ background: theme.g }}>
                        {/* dots pattern overlay */}
                        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="2" fill="white" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#dots)" />
                        </svg>

                        {/* role badge */}
                        <span className="absolute top-4 right-5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest"
                            style={{ background: 'rgba(255,255,255,0.20)', color: 'white', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.30)' }}>
                            <Star size={9} className="inline mr-1 -mt-0.5 fill-white" />
                            {userType}
                        </span>

                        {/* action buttons */}
                        <div className="absolute top-4 left-5 flex gap-2">
                            {!editMode ? (
                                <button onClick={() => setEditMode(true)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all hover:scale-105"
                                    style={{ background: 'rgba(255,255,255,0.22)', color: 'white', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.35)' }}>
                                    <Pencil size={11} /> Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button onClick={handleSave} disabled={saving}
                                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black transition-all hover:scale-105 disabled:opacity-60"
                                        style={{ background: 'white', color: theme.text }}>
                                        {saving
                                            ? <><span className="w-3 h-3 border-2 border-t-current rounded-full animate-spin inline-block" /> Saving…</>
                                            : <><Save size={11} /> Save</>}
                                    </button>
                                    <button onClick={handleCancel}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black"
                                        style={{ background: 'rgba(255,255,255,0.18)', color: 'white', border: '1px solid rgba(255,255,255,0.30)' }}>
                                        <X size={11} /> Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="px-7 pb-8">
                        {/* ── Avatar ── */}
                        <div className="flex justify-center -mt-16 mb-4 relative">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden flex items-center justify-center"
                                    style={{ background: theme.g }}>
                                    {photoPreview
                                        ? <img src={photoPreview} alt="avatar" className="w-full h-full object-cover" />
                                        : <span className="text-4xl font-black text-white">{initials(editName || email)}</span>
                                    }
                                </div>
                                {editMode && (
                                    <button onClick={() => fileRef.current?.click()}
                                        className="absolute bottom-1 right-1 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                                        style={{ background: theme.text, color: 'white' }}>
                                        <Camera size={15} />
                                    </button>
                                )}
                                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                            </div>
                        </div>

                        {/* ── Name & chips ── */}
                        <div className="text-center mb-5">
                            {editMode ? (
                                <input
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                    placeholder="Your full name"
                                    className="text-center text-2xl font-black w-full max-w-xs mx-auto rounded-2xl px-4 py-2 mb-2 outline-none"
                                    style={{ border: `2px solid ${theme.text}`, background: theme.light, color: '#3D1520' }}
                                />
                            ) : (
                                <h1 className="text-2xl font-black mb-1" style={{ color: '#3D1520' }}>
                                    {name || 'Your Name'}
                                </h1>
                            )}
                            <p className="text-sm mb-3" style={{ color: '#9CA3AF' }}>{email}</p>

                            {/* chips */}
                            {chips.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2 mb-2">
                                    {chips.map((c, i) => (
                                        <span key={i} className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black"
                                            style={{ background: theme.chip, color: theme.text }}>
                                            {c.icon} {c.label}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* success / error */}
                        {savedOk && (
                            <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl mb-4 text-sm font-bold"
                                style={{ background: '#D1FAE5', color: '#065F46', border: '1px solid #A7F3D0' }}>
                                <CheckCircle size={15} /> Saved successfully!
                            </div>
                        )}
                        {saveError && (
                            <div className="py-2.5 px-4 rounded-2xl mb-4 text-sm font-bold text-red-600"
                                style={{ background: '#FEF2F2', border: '1.5px solid #FECACA' }}>
                                ⚠️ {saveError}
                            </div>
                        )}

                        {/* ── About Me ── */}
                        <section className="mb-5">
                            <h2 className="text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-1.5"
                                style={{ color: theme.text }}>
                                <User size={11} /> About Me
                            </h2>
                            {editMode ? (
                                <textarea
                                    value={editAbout}
                                    onChange={e => setEditAbout(e.target.value)}
                                    placeholder="Write something about yourself — your goals, interests, or experience…"
                                    rows={4}
                                    className="w-full rounded-2xl p-4 text-sm outline-none resize-none"
                                    style={{ background: theme.light, border: `1.5px solid ${theme.text}`, color: '#3D1520', fontFamily: 'inherit' }}
                                />
                            ) : (
                                <div className="rounded-2xl p-4 text-sm leading-relaxed"
                                    style={{
                                        background: about ? theme.light : 'rgba(249,197,204,0.15)',
                                        border: '1.5px solid rgba(249,197,204,0.5)',
                                        color: about ? '#3D1520' : '#9CA3AF',
                                        minHeight: '70px',
                                    }}>
                                    {about || <span className="italic">No bio yet. Click "Edit Profile" to add one.</span>}
                                </div>
                            )}
                        </section>

                        {/* ── Account Details ── */}
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-widest mb-3"
                                style={{ color: theme.text }}>
                                Account Details
                            </h2>
                            <div className="space-y-2.5">
                                {infoRows.map((row, i) => (
                                    <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                                        style={{ background: '#F9FAFB', border: '1.5px solid rgba(249,197,204,0.45)' }}>
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: theme.chip, color: theme.text }}>
                                            {row.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[9px] uppercase font-black tracking-widest" style={{ color: '#9CA3AF' }}>{row.label}</p>
                                            <p className="text-sm font-bold truncate" style={{ color: '#374151' }}>{row.value}</p>
                                        </div>
                                        {row.badge && (
                                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0"
                                                style={{ background: '#D1FAE5', color: '#065F46' }}>
                                                ✓ {row.badge}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* note */}
                        <div className="mt-4 px-4 py-3 rounded-2xl flex items-start gap-2 text-xs"
                            style={{ background: theme.chip, border: `1px dashed ${theme.text}`, color: theme.text, opacity: 0.85 }}>
                            <ShieldCheck size={13} className="shrink-0 mt-0.5" />
                            <span>Email, Department, Roll No. and other registration details are locked. Contact admin to update them.</span>
                        </div>

                        {/* save button at bottom too (edit mode only) */}
                        {editMode && (
                            <button onClick={handleSave} disabled={saving}
                                className="mt-5 w-full py-4 rounded-2xl font-black text-white text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
                                style={{ background: theme.g, boxShadow: '0 8px 24px rgba(212,97,122,0.30)' }}>
                                {saving
                                    ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Saving…</>
                                    : <><Save size={16} /> Save Changes</>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
