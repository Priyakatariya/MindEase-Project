import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { Play, BookOpen, Users, Heart, Clock, User, DollarSign, CheckCircle, Calendar, Sparkles } from 'lucide-react';

interface VideoSession {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  category: 'meditation' | 'therapy' | 'coping';
  createdAt?: any;
}

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

const Sessions: React.FC = () => {
  const [videoSessions, setVideoSessions] = useState<VideoSession[]>([]);
  const [bookableSessions, setBookableSessions] = useState<BookableSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookableSession | null>(null);

  useEffect(() => {
    let videoUnsubscribe: () => void;
    let bookableUnsubscribe: () => void;
    let loadedCount = 0;

    // Fetch video sessions
    const videoQuery = query(
      collection(db, "videoSessions"),
      orderBy("createdAt", "desc")
    );

    videoUnsubscribe = onSnapshot(videoQuery, (snapshot) => {
      const fetchedVideos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VideoSession[];

      setVideoSessions(fetchedVideos);
      loadedCount++;
      if (loadedCount === 2) setLoading(false);
      console.log("Fetched video sessions:", fetchedVideos.length);
    }, (error) => {
      console.error("Firestore Error (videos):", error);
      loadedCount++;
      if (loadedCount === 2) setLoading(false);
    });

    // Fetch bookable sessions
    const bookableQuery = query(
      collection(db, "bookableSessions"),
      orderBy("createdAt", "desc")
    );

    bookableUnsubscribe = onSnapshot(bookableQuery, (snapshot) => {
      const fetchedBookable = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BookableSession[];

      setBookableSessions(fetchedBookable);
      loadedCount++;
      if (loadedCount === 2) setLoading(false);
      console.log("Fetched bookable sessions:", fetchedBookable.length);
    }, (error) => {
      console.error("Firestore Error (bookable):", error);
      loadedCount++;
      if (loadedCount === 2) setLoading(false);
    });

    return () => {
      if (videoUnsubscribe) videoUnsubscribe();
      if (bookableUnsubscribe) bookableUnsubscribe();
    };
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meditation': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'therapy': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'coping': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'individual': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'group': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'peer': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={16} />
            Therapy Sessions & Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Mental Wellness Sessions
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Book professional therapy sessions and watch helpful videos
          </p>
        </div>

        {loading ? (
          <div className="bg-white p-12 rounded-2xl text-center shadow-md mb-12">
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 font-semibold">Loading sessions...</p>
          </div>
        ) : (
          <>
            {/* Bookable Sessions Section - AT TOP */}
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-green-500 to-green-700 p-3 rounded-xl shadow-md">
                  <Users className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Book Therapy Sessions</h2>
                  <p className="text-gray-600 text-sm">Schedule one-on-one sessions with licensed therapists</p>
                </div>
              </div>

              {bookableSessions.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl text-center shadow-md border-2 border-dashed border-gray-200">
                  <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Bookable Sessions Available</h3>
                  <p className="text-gray-500">Check back soon for available therapy appointments!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookableSessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-gradient-to-br from-green-500 to-green-700 p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                          <Heart className="text-white" size={24} />
                        </div>
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${getSessionTypeColor(session.sessionType)}`}>
                          {session.sessionType.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                        {session.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <User size={16} className="text-green-500" />
                          <span className="text-sm font-medium">{session.therapistName}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={16} className="text-blue-500" />
                          <span className="text-sm font-medium">{session.duration}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={16} className="text-purple-500" />
                          <span className="text-sm font-medium">{session.availableSlots}</span>
                        </div>

                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                          <DollarSign size={16} />
                          <span className="text-sm font-bold">{session.price}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                        {session.description}
                      </p>

                      <button
                        onClick={() => setSelectedBooking(session)}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={18} />
                        Book Session
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Video Sessions Section - AT BOTTOM */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-3 rounded-xl shadow-md">
                  <Play className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Video Sessions</h2>
                  <p className="text-gray-600 text-sm">Watch educational therapy videos anytime</p>
                </div>
              </div>

              {videoSessions.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl text-center shadow-md border-2 border-dashed border-gray-200">
                  <Play className="mx-auto text-gray-300 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Video Sessions Available</h3>
                  <p className="text-gray-500">Check back soon for therapy videos!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videoSessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-300 group"
                    >
                      <div className="relative aspect-video bg-gradient-to-br from-purple-600 to-blue-600 cursor-pointer group-hover:scale-105 transition-transform">
                        <iframe
                          className="w-full h-full"
                          src={getEmbedUrl(session.videoUrl)}
                          title={session.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getCategoryColor(session.category)}`}>
                            {session.category.toUpperCase()}
                          </span>
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <Clock size={14} />
                            <span className="font-medium">{session.duration}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                          {session.title}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                          {session.description}
                        </p>

                        <button
                          onClick={() => setSelectedVideo(getEmbedUrl(session.videoUrl))}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <Play size={16} />
                          Watch Full Screen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Help Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
            <div className="bg-green-50 p-4 rounded-full inline-block mb-4">
              <Users className="text-green-600" size={28} />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Licensed Therapists</h3>
            <p className="text-gray-600 text-sm">
              Book with certified professionals
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
            <div className="bg-purple-50 p-4 rounded-full inline-block mb-4">
              <Play className="text-purple-600" size={28} />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Watch Anytime</h3>
            <p className="text-gray-600 text-sm">
              Access educational videos 24/7
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
            <div className="bg-blue-50 p-4 rounded-full inline-block mb-4">
              <Heart className="text-blue-600" size={28} />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Confidential</h3>
            <p className="text-gray-600 text-sm">
              Your privacy is our priority
            </p>
          </div>
        </div>

      </div>

      {/* Full Screen Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 text-4xl font-bold z-10"
              >
                ×
              </button>
              <iframe
                className="w-full h-full rounded-xl"
                src={selectedVideo}
                title="Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">{selectedBooking.title}</h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                <User className="text-green-600" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Therapist</p>
                  <p className="font-bold text-gray-800">{selectedBooking.therapistName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                <Clock className="text-blue-600" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Duration</p>
                  <p className="font-bold text-gray-800">{selectedBooking.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                <Calendar className="text-purple-600" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Available Slots</p>
                  <p className="font-bold text-gray-800">{selectedBooking.availableSlots}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border-2 border-green-200">
                <DollarSign className="text-green-600" size={20} />
                <div>
                  <p className="text-xs text-green-600 font-semibold">Price</p>
                  <p className="font-bold text-green-800">{selectedBooking.price}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">About This Session</h3>
              <p className="text-gray-600 leading-relaxed">{selectedBooking.description}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert(`Booking confirmed for ${selectedBooking.title}! You will receive a confirmation email shortly.`);
                  setSelectedBooking(null);
                }}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all shadow-md"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sessions;
