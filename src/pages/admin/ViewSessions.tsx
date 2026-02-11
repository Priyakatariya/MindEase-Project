import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, onSnapshot, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Users, Trash2, User, Clock, Calendar, DollarSign, Edit } from 'lucide-react';

interface BookableSession {
    id: string;
    title: string;
    description: string;
    therapistName: string;
    sessionType: string;
    duration: string;
    availableSlots: string;
    price: string;
    createdAt?: any;
}

const ViewSessions: React.FC = () => {
    const [sessions, setSessions] = useState<BookableSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingSession, setEditingSession] = useState<BookableSession | null>(null);

    useEffect(() => {
        const q = query(
            collection(db, "bookableSessions"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedSessions = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as BookableSession[];

            setSessions(fetchedSessions);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching sessions:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await deleteDoc(doc(db, "bookableSessions", id));
                alert("Session deleted successfully!");
            } catch (error) {
                console.error("Error deleting session:", error);
                alert("Error deleting session!");
            }
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingSession) return;

        try {
            const { id, createdAt, ...sessionData } = editingSession;
            await updateDoc(doc(db, "bookableSessions", id), sessionData);
            alert("Session updated successfully!");
            setEditingSession(null);
        } catch (error) {
            console.error("Error updating session:", error);
            alert("Error updating session!");
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'individual': return 'bg-blue-100 text-blue-700';
            case 'group': return 'bg-purple-100 text-purple-700';
            case 'peer': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="max-w-6xl">
            <div className="bg-white rounded-[2.5rem] shadow-sm border p-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Users className="text-green-600" /> Bookable Sessions
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">Manage all therapy booking sessions</p>
                    </div>
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold">
                        {sessions.length} Sessions
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading sessions...</p>
                    </div>
                ) : sessions.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                        <Users className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500">No bookable sessions posted yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all bg-gray-50"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-gray-800">{session.title}</h3>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${getTypeColor(session.sessionType)}`}>
                                                {session.sessionType}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">{session.description}</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <User size={14} className="text-green-500" />
                                                <span>{session.therapistName}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Clock size={14} className="text-blue-500" />
                                                <span>{session.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar size={14} className="text-purple-500" />
                                                <span>{session.availableSlots}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-green-600 font-bold">
                                                <DollarSign size={14} />
                                                <span>{session.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingSession(session)}
                                            className="bg-blue-100 text-blue-600 p-3 rounded-xl hover:bg-blue-200 transition-all"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(session.id, session.title)}
                                            className="bg-red-100 text-red-600 p-3 rounded-xl hover:bg-red-200 transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editingSession && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setEditingSession(null)}
                >
                    <div
                        className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-6">Edit Bookable Session</h2>
                        <form onSubmit={handleEdit} className="space-y-4">
                            <input
                                placeholder="Session Title"
                                className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
                                value={editingSession.title}
                                onChange={e => setEditingSession({ ...editingSession, title: e.target.value })}
                                required
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Therapist Name"
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
                                    value={editingSession.therapistName}
                                    onChange={e => setEditingSession({ ...editingSession, therapistName: e.target.value })}
                                    required
                                />
                                <select
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
                                    value={editingSession.sessionType}
                                    onChange={e => setEditingSession({ ...editingSession, sessionType: e.target.value })}
                                    required
                                >
                                    <option value="individual">Individual Therapy</option>
                                    <option value="group">Group Therapy</option>
                                    <option value="peer">Peer Support</option>
                                </select>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    placeholder="Duration"
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
                                    value={editingSession.duration}
                                    onChange={e => setEditingSession({ ...editingSession, duration: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Available Slots"
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
                                    value={editingSession.availableSlots}
                                    onChange={e => setEditingSession({ ...editingSession, availableSlots: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Price"
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
                                    value={editingSession.price}
                                    onChange={e => setEditingSession({ ...editingSession, price: e.target.value })}
                                    required
                                />
                            </div>

                            <textarea
                                placeholder="Description"
                                className="w-full h-32 p-4 bg-gray-50 rounded-2xl outline-none resize-none focus:ring-2 focus:ring-green-500"
                                value={editingSession.description}
                                onChange={e => setEditingSession({ ...editingSession, description: e.target.value })}
                                required
                            />

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all"
                                >
                                    Update Session
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingSession(null)}
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewSessions;
