import React from 'react';
import { Zap, Moon, Rocket, Battery, BookOpen, Flame, TrendingUp } from 'lucide-react';

// Section A — Energy & Physical State (4 questions)
// Section B — Academic & Cognitive State (3 questions)

export interface MoodFormData {
    energy: number;
    sleep: number;
    difficultyStart: number;
    tiredness: number;
    focus: number;
    workloadStress: number;
    productivity: number;
}

interface MoodFormProps {
    data: MoodFormData;
    onChange: (data: MoodFormData) => void;
}

interface SliderQuestionProps {
    icon: React.ReactNode;
    label: string;
    sublabel?: string;
    value: number;
    onChange: (val: number) => void;
    gradientFrom: string;
    gradientTo: string;
    accentColor: string;
    badgeBg: string;
    badgeText: string;
    lowLabel: string;
    highLabel: string;
}

const SliderQuestion: React.FC<SliderQuestionProps> = ({
    icon,
    label,
    sublabel,
    value,
    onChange,
    gradientFrom,
    gradientTo,
    accentColor,
    badgeBg,
    badgeText,
    lowLabel,
    highLabel,
}) => (
    <div className="group">
        <div className="flex items-center gap-2 mb-2">
            {icon}
            <div className="flex-grow">
                <label className="text-sm font-semibold text-gray-700">{label}</label>
                {sublabel && <p className="text-xs text-gray-400">{sublabel}</p>}
            </div>
            <span
                className={`text-sm font-bold px-3 py-1 rounded-lg ${badgeBg} ${badgeText}`}
            >
                {value}/10
            </span>
        </div>
        <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${accentColor}`}
            style={{
                background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
            }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{lowLabel}</span>
            <span>5</span>
            <span>{highLabel}</span>
        </div>
    </div>
);

const MoodForm: React.FC<MoodFormProps> = ({ data, onChange }) => {
    return (
        <div className="space-y-6">
            {/* Section A — Energy & Physical State */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Zap size={16} className="text-amber-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Section A</h3>
                        <p className="text-xs text-gray-400">Energy & Physical State</p>
                    </div>
                </div>
                <div className="space-y-5 pl-1">
                    <SliderQuestion
                        icon={<Zap size={16} className="text-amber-500" />}
                        label="How energetic do you feel today?"
                        value={data.energy}
                        onChange={(val) => onChange({ ...data, energy: val })}
                        gradientFrom="#fde68a"
                        gradientTo="#f59e0b"
                        accentColor="accent-amber-500"
                        badgeBg="bg-amber-50"
                        badgeText="text-amber-600"
                        lowLabel="1 (Drained)"
                        highLabel="10 (Energized)"
                    />
                    <SliderQuestion
                        icon={<Moon size={16} className="text-indigo-500" />}
                        label="How well did you sleep last night?"
                        value={data.sleep}
                        onChange={(val) => onChange({ ...data, sleep: val })}
                        gradientFrom="#c7d2fe"
                        gradientTo="#6366f1"
                        accentColor="accent-indigo-500"
                        badgeBg="bg-indigo-50"
                        badgeText="text-indigo-600"
                        lowLabel="1 (Very Poorly)"
                        highLabel="10 (Excellent)"
                    />
                    <SliderQuestion
                        icon={<Rocket size={16} className="text-orange-500" />}
                        label="How difficult was it to get started with tasks today?"
                        sublabel="Higher = harder to start"
                        value={data.difficultyStart}
                        onChange={(val) => onChange({ ...data, difficultyStart: val })}
                        gradientFrom="#fed7aa"
                        gradientTo="#ea580c"
                        accentColor="accent-orange-500"
                        badgeBg="bg-orange-50"
                        badgeText="text-orange-600"
                        lowLabel="1 (Easy)"
                        highLabel="10 (Very Hard)"
                    />
                    <SliderQuestion
                        icon={<Battery size={16} className="text-purple-500" />}
                        label="How physically tired do you feel right now?"
                        sublabel="Higher = more tired"
                        value={data.tiredness}
                        onChange={(val) => onChange({ ...data, tiredness: val })}
                        gradientFrom="#e9d5ff"
                        gradientTo="#9333ea"
                        accentColor="accent-purple-500"
                        badgeBg="bg-purple-50"
                        badgeText="text-purple-600"
                        lowLabel="1 (Fresh)"
                        highLabel="10 (Exhausted)"
                    />
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Section B — Academic & Cognitive */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <BookOpen size={16} className="text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Section B</h3>
                        <p className="text-xs text-gray-400">Academic & Cognitive State</p>
                    </div>
                </div>
                <div className="space-y-5 pl-1">
                    <SliderQuestion
                        icon={<BookOpen size={16} className="text-blue-500" />}
                        label="How focused were you during classes/study today?"
                        value={data.focus}
                        onChange={(val) => onChange({ ...data, focus: val })}
                        gradientFrom="#bfdbfe"
                        gradientTo="#2563eb"
                        accentColor="accent-blue-500"
                        badgeBg="bg-blue-50"
                        badgeText="text-blue-600"
                        lowLabel="1 (Distracted)"
                        highLabel="10 (Laser focus)"
                    />
                    <SliderQuestion
                        icon={<Flame size={16} className="text-red-500" />}
                        label="How overwhelming did your academic workload feel?"
                        sublabel="Higher = more overwhelming"
                        value={data.workloadStress}
                        onChange={(val) => onChange({ ...data, workloadStress: val })}
                        gradientFrom="#fecaca"
                        gradientTo="#dc2626"
                        accentColor="accent-red-500"
                        badgeBg="bg-red-50"
                        badgeText="text-red-600"
                        lowLabel="1 (Light)"
                        highLabel="10 (Overwhelming)"
                    />
                    <SliderQuestion
                        icon={<TrendingUp size={16} className="text-emerald-500" />}
                        label="Did you feel productive today?"
                        value={data.productivity}
                        onChange={(val) => onChange({ ...data, productivity: val })}
                        gradientFrom="#a7f3d0"
                        gradientTo="#059669"
                        accentColor="accent-emerald-500"
                        badgeBg="bg-emerald-50"
                        badgeText="text-emerald-600"
                        lowLabel="1 (Unproductive)"
                        highLabel="10 (Very productive)"
                    />
                </div>
            </div>
        </div>
    );
};

export default MoodForm;
