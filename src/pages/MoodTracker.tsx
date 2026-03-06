import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Heart, Lightbulb, LayoutDashboard,
  ArrowRight, ArrowLeft, Save, CheckCircle2,
  Sparkles, AlertTriangle, TrendingUp, Shield,
} from 'lucide-react';

import MoodForm, { type MoodFormData } from '../components/mood/MoodForm';
import BehavioralForm, { type BehavioralFormData } from '../components/mood/BehavioralForm';
import MoodDashboard from '../components/mood/MoodDashboard';

import { calculateMoodScore } from '../engines/PredictionEngine';
import { generateInsight, type InsightResult } from '../engines/InsightEngine';
import { saveMoodEntry } from '../services/storageService';

type Tab = 'log' | 'dashboard';

const STEPS = [
  { id: 0, label: 'Energy & Academic', icon: Brain },
  { id: 1, label: 'Emotions & Social', icon: Heart },
  { id: 2, label: 'Results', icon: Lightbulb },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

const moodGradients: Record<string, string> = {
  'Distressed': 'from-red-500 to-rose-600',
  'Low Mood': 'from-orange-400 to-amber-500',
  'Neutral': 'from-blue-400 to-cyan-500',
  'Positive': 'from-emerald-400 to-teal-500',
  'Very Positive': 'from-green-400 to-emerald-500',
};

const moodBg: Record<string, string> = {
  'Distressed': 'bg-red-50 border-red-200',
  'Low Mood': 'bg-amber-50 border-amber-200',
  'Neutral': 'bg-blue-50 border-blue-200',
  'Positive': 'bg-emerald-50 border-emerald-200',
  'Very Positive': 'bg-green-50 border-green-200',
};

const MoodTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('log');
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [saved, setSaved] = useState(false);

  // Form states
  const [moodData, setMoodData] = useState<MoodFormData>({
    energy: 5,
    sleep: 5,
    difficultyStart: 5,
    tiredness: 5,
    focus: 5,
    workloadStress: 5,
    productivity: 5,
  });

  const [behavioralData, setBehavioralData] = useState<BehavioralFormData>({
    calm: 5,
    irritation: 5,
    hopeful: 5,
    connected: 5,
    lonely: 5,
  });

  const [insight, setInsight] = useState<InsightResult | null>(null);

  const goNext = () => {
    if (step === 1) {
      // Calculate mood when moving to results
      const allInputs = { ...moodData, ...behavioralData };
      const { moodScore, mood, emoji } = calculateMoodScore(allInputs);
      const ins = generateInsight(allInputs, moodScore, mood, emoji);
      setInsight(ins);
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, 2));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSave = async () => {
    if (!insight) return;
    const allInputs = { ...moodData, ...behavioralData };
    await saveMoodEntry({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      ...allInputs,
      moodScore: insight.moodScore,
      mood: insight.mood,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setStep(0);
      setMoodData({ energy: 5, sleep: 5, difficultyStart: 5, tiredness: 5, focus: 5, workloadStress: 5, productivity: 5 });
      setBehavioralData({ calm: 5, irritation: 5, hopeful: 5, connected: 5, lonely: 5 });
      setInsight(null);
      setActiveTab('dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#7c3aed] pt-20 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-purple-400 rounded-full opacity-20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-blue-300 rounded-full opacity-20 blur-[100px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-blue-100 text-sm mb-4">
            <Sparkles size={14} className="text-yellow-300" />
            <span className="font-semibold">Student Wellness Check</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Mood Tracker
          </h1>
          <p className="text-blue-100/80 text-lg max-w-xl mx-auto">
            Answer a few quick questions about your day and get personalized insights about your well-being.
          </p>
        </div>
      </section>

      {/* Tab Switcher */}
      <div className="max-w-4xl mx-auto px-6 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-1.5 flex gap-1">
          <TabButton
            active={activeTab === 'log'}
            onClick={() => setActiveTab('log')}
            icon={<Brain size={18} />}
            label="Log Mood"
          />
          <TabButton
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' ? (
          <MoodDashboard />
        ) : (
          <div>
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {STEPS.map(({ id, label, icon: Icon }) => (
                <React.Fragment key={id}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${step === id
                        ? 'bg-blue-600 text-white shadow-lg scale-110'
                        : step > id
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                        }`}
                    >
                      {step > id ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                    </div>
                    <span
                      className={`text-sm font-semibold hidden sm:block ${step === id ? 'text-blue-600' : step > id ? 'text-emerald-600' : 'text-gray-400'
                        }`}
                    >
                      {label}
                    </span>
                  </div>
                  {id < 2 && (
                    <div
                      className={`w-12 h-0.5 rounded-full transition-colors ${step > id ? 'bg-emerald-400' : 'bg-gray-200'
                        }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8 min-h-[400px] overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  {step === 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">How's your day going?</h2>
                      <p className="text-gray-500 mb-6">Rate each question on a scale of 1–10. Be honest — there are no wrong answers.</p>
                      <MoodForm data={moodData} onChange={setMoodData} />
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">How do you feel emotionally?</h2>
                      <p className="text-gray-500 mb-6">A few more questions about your emotions and social connections.</p>
                      <BehavioralForm data={behavioralData} onChange={setBehavioralData} />
                    </div>
                  )}

                  {step === 2 && insight && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Results</h2>
                      <p className="text-gray-500 mb-6">Here's a summary of how you're doing today.</p>

                      {/* Mood Score Card */}
                      <div className={`bg-gradient-to-br ${moodGradients[insight.mood]} rounded-2xl p-6 text-white shadow-xl mb-6`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white/80 text-sm font-semibold mb-1">Your Mood Today</p>
                            <div className="flex items-center gap-3">
                              <span className="text-4xl">{insight.emoji}</span>
                              <div>
                                <h3 className="text-3xl font-extrabold">{insight.mood}</h3>
                                <p className="text-white/70 text-sm">Keep tracking to see your trends</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Score</p>
                            <p className="text-5xl font-extrabold">{insight.moodScore}</p>
                            <p className="text-white/60 text-xs">out of 100</p>
                          </div>
                        </div>
                        {/* Score bar */}
                        <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className="h-full bg-white/80 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${insight.moodScore}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                          />
                        </div>
                      </div>

                      {/* Highlights & Concerns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {/* Highlights */}
                        {insight.highlights.length > 0 && (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <TrendingUp size={18} className="text-emerald-600" />
                              <h4 className="font-bold text-emerald-800 text-sm">Positive Signs</h4>
                            </div>
                            <ul className="space-y-1.5">
                              {insight.highlights.map((h, i) => (
                                <li key={i} className="text-sm text-emerald-700 flex items-start gap-2">
                                  <span className="text-emerald-500 mt-0.5">•</span>
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Concerns */}
                        {insight.concerns.length > 0 && (
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Shield size={18} className="text-amber-600" />
                              <h4 className="font-bold text-amber-800 text-sm">Things to Watch</h4>
                            </div>
                            <ul className="space-y-1.5">
                              {insight.concerns.map((c, i) => (
                                <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                                  <span className="text-amber-500 mt-0.5">•</span>
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Warnings */}
                      {insight.warnings.length > 0 && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle size={18} className="text-red-600" />
                            <h4 className="font-bold text-red-800 text-sm">Important Notice</h4>
                          </div>
                          {insight.warnings.map((w, i) => (
                            <p key={i} className="text-sm text-red-700 mb-1">{w}</p>
                          ))}
                        </div>
                      )}

                      {/* Suggestions */}
                      {insight.suggestions.length > 0 && (
                        <div className={`p-5 rounded-xl border-2 ${moodBg[insight.mood]}`}>
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb size={18} className="text-blue-600" />
                            <h4 className="font-bold text-gray-800 text-sm">Suggestions for You</h4>
                          </div>
                          <ul className="space-y-2">
                            {insight.suggestions.map((s, i) => (
                              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-blue-500 mt-0.5 font-bold">{i + 1}.</span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={goBack}
                disabled={step === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${step === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100 active:scale-95'
                  }`}
              >
                <ArrowLeft size={18} />
                Back
              </button>

              {step < 2 ? (
                <button
                  onClick={goNext}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl active:scale-95"
                >
                  Next
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={saved}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 ${saved
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'
                    }`}
                >
                  {saved ? (
                    <>
                      <CheckCircle2 size={18} />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Entry
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component
const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${active
      ? 'bg-blue-600 text-white shadow-md'
      : 'text-gray-500 hover:bg-gray-50'
      }`}
  >
    {icon}
    {label}
  </button>
);

export default MoodTracker;
