import { Link } from 'react-router-dom';
import { Calendar, MessageSquare, Users, ArrowRight } from 'lucide-react';

export default function Community() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Community Hub
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Connect with others, join events, and participate in supportive discussions
                    </p>
                </div>

                {/* Community Options Grid */}
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

                    {/* Events & Sessions Card */}
                    <Link
                        to="/events"
                        className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                                <Calendar className="text-white" size={32} />
                            </div>
                            <ArrowRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Events & Sessions</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Browse upcoming mental wellness events, workshops, and group therapy sessions. Book your spot and connect with others.
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-blue-600 font-semibold">
                            <span>View Events</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Community Discussions Card */}
                    <Link
                        to="/stories"
                        className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-500"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-4 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                                <MessageSquare className="text-white" size={32} />
                            </div>
                            <ArrowRight className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-2 transition-all" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Stories & Discussions</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Read inspiring stories from others, share your journey, and participate in supportive community discussions.
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-purple-600 font-semibold">
                            <span>Join Discussions</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                </div>

                {/* Additional Info Section */}
                <div className="mt-12 bg-white rounded-2xl p-8 shadow-md max-w-4xl mx-auto border border-gray-100">
                    <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-green-500 to-green-700 p-3 rounded-xl shadow-md">
                            <Users className="text-white" size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Safe & Supportive Space</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our community is built on respect, empathy, and confidentiality. Everyone's journey is unique, and we're here to support each other through the ups and downs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
