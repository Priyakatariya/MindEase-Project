import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { Calendar, Clock, MapPin, Users, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  desc: string;
  location?: string;
  registrationLink?: string;
  lastDate?: string;
  startDate?: string;
  createdAt?: any;
}

const EventsAndSessions: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    // Fetch events from Firestore
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
      console.log("Fetched events:", fetchedEvents.length);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRegister = (event: Event) => {
    if (event.registrationLink) {
      // Open registration link in new tab
      window.open(event.registrationLink, '_blank');
    } else {
      // Show event details modal if no link
      setSelectedEvent(event);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={16} />
            Community Events & Sessions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Upcoming Events & Sessions
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join our mental wellness events, workshops, and therapy sessions
          </p>
        </div>

        {/* Events Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl shadow-md">
              <Calendar className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
          </div>

          {loading ? (
            <div className="bg-white p-12 rounded-2xl text-center shadow-md">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 font-semibold">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl text-center shadow-md border-2 border-dashed border-gray-200">
              <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Events Scheduled</h3>
              <p className="text-gray-500">Check back soon for upcoming events and workshops!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 group"
                >
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                      <Calendar className="text-white" size={24} />
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200">
                      OPEN
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    {event.startDate && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} className="text-blue-500" />
                        <span className="text-sm font-medium">Starts: {event.startDate}</span>
                      </div>
                    )}

                    {event.date && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} className="text-purple-500" />
                        <span className="text-sm font-medium">{event.date}</span>
                      </div>
                    )}

                    {event.location && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} className="text-red-500" />
                        <span className="text-sm font-medium">{event.location}</span>
                      </div>
                    )}

                    {event.lastDate && (
                      <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg">
                        <AlertCircle size={16} />
                        <span className="text-xs font-bold">Last Date: {event.lastDate}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">{event.desc}</p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRegister(event)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      {event.registrationLink ? (
                        <>
                          <ExternalLink size={18} />
                          Register Now
                        </>
                      ) : (
                        'View Details'
                      )}
                    </button>

                    {!event.registrationLink && (
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                      >
                        Info
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sessions Section - Link to Sessions Page */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-3 rounded-xl shadow-md">
              <Users className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Therapy Sessions</h2>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Explore Therapy Sessions</h3>
                <p className="text-purple-100 leading-relaxed">
                  Watch helpful videos, learn coping strategies, and access professional therapy sessions tailored to your needs.
                </p>
              </div>
              <a
                href="/sessions"
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap"
              >
                View Sessions
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">{selectedEvent.title}</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {selectedEvent.startDate && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <Calendar className="text-blue-600" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Start Date</p>
                    <p className="font-bold text-gray-800">{selectedEvent.startDate}</p>
                  </div>
                </div>
              )}

              {selectedEvent.date && (
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <Clock className="text-purple-600" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Event Time</p>
                    <p className="font-bold text-gray-800">{selectedEvent.date}</p>
                  </div>
                </div>
              )}

              {selectedEvent.location && (
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                  <MapPin className="text-red-600" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Location</p>
                    <p className="font-bold text-gray-800">{selectedEvent.location}</p>
                  </div>
                </div>
              )}

              {selectedEvent.lastDate && (
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border-2 border-orange-200">
                  <AlertCircle className="text-orange-600" size={20} />
                  <div>
                    <p className="text-xs text-orange-600 font-semibold">Registration Deadline</p>
                    <p className="font-bold text-orange-800">{selectedEvent.lastDate}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{selectedEvent.desc}</p>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsAndSessions;
