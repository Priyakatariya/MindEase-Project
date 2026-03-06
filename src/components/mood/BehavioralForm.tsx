import React from 'react';
import { Heart, Frown, Sun, Users, UserMinus } from 'lucide-react';

// Section C — Emotional Indicators (3 questions)
// Section D — Social Indicators (2 questions)

export interface BehavioralFormData {
    calm: number;
    irritation: number;
    hopeful: number;
    connected: number;
    lonely: number;
}

interface BehavioralFormProps {
    data: BehavioralFormData;
    onChange: (data: BehavioralFormData) => void;
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

const BehavioralForm: React.FC<BehavioralFormProps> = ({ data, onChange }) => {
    return (
        <div className="space-y-6">
            {/* Section C — Emotional Indicators */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                        <Heart size={16} className="text-pink-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Section C</h3>
                        <p className="text-xs text-gray-400">Emotional Indicators</p>
                    </div>
                </div>
                <div className="space-y-5 pl-1">
                    <SliderQuestion
                        icon={<Heart size={16} className="text-pink-500" />}
                        label="Did you feel calm during most of the day?"
                        value={data.calm}
                        onChange={(val) => onChange({ ...data, calm: val })}
                        gradientFrom="#fbcfe8"
                        gradientTo="#ec4899"
                        accentColor="accent-pink-500"
                        badgeBg="bg-pink-50"
                        badgeText="text-pink-600"
                        lowLabel="1 (Very unsettled)"
                        highLabel="10 (Very calm)"
                    />
                    <SliderQuestion
                        icon={<Frown size={16} className="text-red-500" />}
                        label="How often did you feel irritated or frustrated today?"
                        sublabel="Higher = more irritation"
                        value={data.irritation}
                        onChange={(val) => onChange({ ...data, irritation: val })}
                        gradientFrom="#fecaca"
                        gradientTo="#dc2626"
                        accentColor="accent-red-500"
                        badgeBg="bg-red-50"
                        badgeText="text-red-600"
                        lowLabel="1 (Rarely)"
                        highLabel="10 (Constantly)"
                    />
                    <SliderQuestion
                        icon={<Sun size={16} className="text-yellow-500" />}
                        label="How hopeful do you feel about tomorrow?"
                        value={data.hopeful}
                        onChange={(val) => onChange({ ...data, hopeful: val })}
                        gradientFrom="#fef08a"
                        gradientTo="#eab308"
                        accentColor="accent-yellow-500"
                        badgeBg="bg-yellow-50"
                        badgeText="text-yellow-600"
                        lowLabel="1 (Hopeless)"
                        highLabel="10 (Very hopeful)"
                    />
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Section D — Social Indicators */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                        <Users size={16} className="text-cyan-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Section D</h3>
                        <p className="text-xs text-gray-400">Social Indicators</p>
                    </div>
                </div>
                <div className="space-y-5 pl-1">
                    <SliderQuestion
                        icon={<Users size={16} className="text-cyan-500" />}
                        label="How connected did you feel with friends today?"
                        value={data.connected}
                        onChange={(val) => onChange({ ...data, connected: val })}
                        gradientFrom="#a5f3fc"
                        gradientTo="#0891b2"
                        accentColor="accent-cyan-500"
                        badgeBg="bg-cyan-50"
                        badgeText="text-cyan-600"
                        lowLabel="1 (Disconnected)"
                        highLabel="10 (Very connected)"
                    />
                    <SliderQuestion
                        icon={<UserMinus size={16} className="text-slate-500" />}
                        label="Did you feel lonely today?"
                        sublabel="Higher = more lonely"
                        value={data.lonely}
                        onChange={(val) => onChange({ ...data, lonely: val })}
                        gradientFrom="#cbd5e1"
                        gradientTo="#475569"
                        accentColor="accent-slate-500"
                        badgeBg="bg-slate-50"
                        badgeText="text-slate-600"
                        lowLabel="1 (Not at all)"
                        highLabel="10 (Very lonely)"
                    />
                </div>
            </div>
        </div>
    );
};

export default BehavioralForm;
