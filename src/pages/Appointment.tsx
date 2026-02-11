import React from 'react';
import { Calendar, Clock, User, Heart, CheckCircle, Sparkles } from 'lucide-react';

export default function Appointment() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles size={16} />
                        Book Your Appointment
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Schedule an Appointment
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Book your appointment for counseling and mental health support
                    </p>
                </div>

                {/* Appointment Form */}
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12">
                    <form className="space-y-6">
                        {/* Personal Information */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <User className="text-blue-600" size={24} />
                                Personal Information
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-2 block">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-2 block">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="your.email@example.com"
                                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-2 block">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+91 XXXXX XXXXX"
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-2 block">Age</label>
                                <input
                                    type="number"
                                    placeholder="Your age"
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="pt-6 border-t border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Calendar className="text-purple-600" size={24} />
                                Appointment Details
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-2 block">Preferred Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-2 block">Preferred Time</label>
                                    <select
                                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200"
                                        required
                                    >
                                        <option value="">Select time slot</option>
                                        <option value="9-10">9:00 AM - 10:00 AM</option>
                                        <option value="10-11">10:00 AM - 11:00 AM</option>
                                        <option value="11-12">11:00 AM - 12:00 PM</option>
                                        <option value="12-1">12:00 PM - 1:00 PM</option>
                                        <option value="2-3">2:00 PM - 3:00 PM</option>
                                        <option value="3-4">3:00 PM - 4:00 PM</option>
                                        <option value="4-5">4:00 PM - 5:00 PM</option>
                                        <option value="5-6">5:00 PM - 6:00 PM</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-bold text-gray-700 mb-2 block">Appointment Type</label>
                                <select
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200"
                                    required
                                >
                                    <option value="">Select appointment type</option>
                                    <option value="counseling">General Counseling</option>
                                    <option value="therapy">Therapy Session</option>
                                    <option value="consultation">Mental Health Consultation</option>
                                    <option value="followup">Follow-up Session</option>
                                </select>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="pt-6 border-t border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Heart className="text-red-500" size={24} />
                                Additional Information
                            </h2>

                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-2 block">
                                    Reason for Appointment (Optional)
                                </label>
                                <textarea
                                    placeholder="Please describe briefly what you'd like to discuss..."
                                    className="w-full h-32 p-4 bg-gray-50 rounded-2xl outline-none resize-none focus:ring-2 focus:ring-red-500 border border-gray-200"
                                />
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-bold text-gray-700 mb-2 block">
                                    Have you visited before?
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="visited" value="yes" className="w-4 h-4" />
                                        <span className="text-gray-700">Yes</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="visited" value="no" className="w-4 h-4" defaultChecked />
                                        <span className="text-gray-700">No, this is my first visit</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <CheckCircle size={24} />
                                Book Appointment
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Cards */}
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                        <div className="bg-blue-50 p-4 rounded-full inline-block mb-4">
                            <Clock className="text-blue-600" size={28} />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Flexible Timing</h3>
                        <p className="text-gray-600 text-sm">
                            Choose a time slot that works best for you
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                        <div className="bg-purple-50 p-4 rounded-full inline-block mb-4">
                            <User className="text-purple-600" size={28} />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Professional Care</h3>
                        <p className="text-gray-600 text-sm">
                            Meet with experienced counselors
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                        <div className="bg-red-50 p-4 rounded-full inline-block mb-4">
                            <Heart className="text-red-600" size={28} />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Confidential</h3>
                        <p className="text-gray-600 text-sm">
                            Your privacy is our top priority
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
