import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, onSnapshot, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Calendar, Trash2, Edit, Eye, MapPin, Clock, AlertCircle } from 'lucide-react';

interface Event {
    id: string;
    title: string;
    startDate: string;
    date: string;
    location: string;
    lastDate: string;
    registrationLink: string;
    desc: string;
    createdAt?: any;
}

const ViewEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    useEffect(() => {
        const q = query(
            collection(db, "events"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedEvents = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Event[];

            setEvents(fetchedEvents);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching events:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await deleteDoc(doc(db, "events", id));
                alert("Event deleted successfully!");
            } catch (error) {
                console.error("Error deleting event:", error);
                alert("Error deleting event!");
            }
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingEvent) return;

        try {
            const { id, createdAt, ...eventData } = editingEvent;
            await updateDoc(doc(db, "events", id), eventData);
            alert("Event updated successfully!");
            setEditingEvent(null);
        } catch (error) {
            console.error("Error updating event:", error);
            alert("Error updating event!");
        }
    };

    return (
        <div className="max-w-6xl">
            <div className="bg-white rounded-[2.5rem] shadow-sm border p-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Calendar className="text-blue-600" /> Events
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">Manage all posted events</p>
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-bold">
                        {events.length} Events
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading events...</p>
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                        <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500">No events posted yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all bg-gray-50"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
                                        <p className="text-gray-600 text-sm mb-3">{event.desc}</p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                                            {event.startDate && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar size={14} className="text-blue-500" />
                                                    <span>{event.startDate}</span>
                                                </div>
                                            )}
                                            {event.date && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Clock size={14} className="text-purple-500" />
                                                    <span>{event.date}</span>
                                                </div>
                                            )}
                                            {event.location && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <MapPin size={14} className="text-red-500" />
                                                    <span>{event.location}</span>
                                                </div>
                                            )}
                                            {event.lastDate && (
                                                <div className="flex items-center gap-2 text-orange-600">
                                                    <AlertCircle size={14} />
                                                    <span>Last: {event.lastDate}</span>
                                                </div>
                                            )}
                                            {event.registrationLink && (
                                                <a
                                                    href={event.registrationLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline flex items-center gap-1 col-span-2"
                                                >
                                                    <Eye size={14} />
                                                    View Registration Link
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingEvent(event)}
                                            className="bg-blue-100 text-blue-600 p-3 rounded-xl hover:bg-blue-200 transition-all"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.id, event.title)}
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
            {editingEvent && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setEditingEvent(null)}
                >
                    <div
                        className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-6">Edit Event</h2>
                        <form onSubmit={handleEdit} className="space-y-4">
                            <input
                                placeholder="Event Title"
                                className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                                value={editingEvent.title}
                                onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })}
                                required
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Start Date"
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                                    value={editingEvent.startDate}
                                    onChange={e => setEditingEvent({ ...editingEvent, startDate: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Event Time"
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                                    value={editingEvent.date}
                                    onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                                    value={editingEvent.location}
                                    onChange={e => setEditingEvent({ ...editingEvent, location: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Last Registration Date"
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                                    value={editingEvent.lastDate}
                                    onChange={e => setEditingEvent({ ...editingEvent, lastDate: e.target.value })}
                                />
                            </div>

                            <input
                                type="url"
                                placeholder="Registration Link"
                                className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                                value={editingEvent.registrationLink}
                                onChange={e => setEditingEvent({ ...editingEvent, registrationLink: e.target.value })}
                            />

                            <textarea
                                placeholder="Event Description"
                                className="w-full h-32 p-4 bg-gray-50 rounded-2xl outline-none resize-none focus:ring-2 focus:ring-blue-500"
                                value={editingEvent.desc}
                                onChange={e => setEditingEvent({ ...editingEvent, desc: e.target.value })}
                                required
                            />

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
                                >
                                    Update Event
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingEvent(null)}
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

export default ViewEvents;
