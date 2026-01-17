import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CalendarPlus, Send } from 'lucide-react';

const ManageEvents: React.FC = () => {
  const [event, setEvent] = useState({ title: '', date: '', desc: '' });

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "events"), { ...event, createdAt: serverTimestamp() });
      setEvent({ title: '', date: '', desc: '' });
      alert("Event Added Successfully!");
    } catch (e) { alert("Error adding event!"); }
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-[2.5rem] shadow-sm border">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <CalendarPlus className="text-blue-600"/> Create New Event
      </h2>
      <form onSubmit={handleAddEvent} className="space-y-4">
        <input 
          placeholder="Event Title" className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
          value={event.title} onChange={e => setEvent({...event, title: e.target.value})} required
        />
        <input 
          type="date" className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
          value={event.date} onChange={e => setEvent({...event, date: e.target.value})} required
        />
        <textarea 
          placeholder="Event Description..." className="w-full h-32 p-4 bg-gray-50 rounded-2xl outline-none resize-none"
          value={event.desc} onChange={e => setEvent({...event, desc: e.target.value})} required
        />
        <button className="w-full bg-[#1e3a8a] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
          <Send size={18}/> Publish Event
        </button>
      </form>
    </div>
  );
};

export default ManageEvents;