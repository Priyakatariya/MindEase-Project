// InsightEngine.ts — Generates personalized insights, highlights, concerns, and suggestions

import type { QuestionnaireInputs, MoodClassification } from './PredictionEngine';

export interface InsightResult {
    mood: MoodClassification;
    moodScore: number;
    emoji: string;
    highlights: string[];   // positive signs
    concerns: string[];     // things to watch
    suggestions: string[];  // actionable tips
    warnings: string[];     // burnout / distress alerts
}

interface IndicatorMeta {
    key: keyof QuestionnaireInputs;
    label: string;
    positive: boolean; // true = higher is good, false = higher is bad
}

const INDICATORS: IndicatorMeta[] = [
    { key: 'energy', label: 'Energy levels', positive: true },
    { key: 'sleep', label: 'Sleep quality', positive: true },
    { key: 'difficultyStart', label: 'Difficulty getting started', positive: false },
    { key: 'tiredness', label: 'Physical tiredness', positive: false },
    { key: 'focus', label: 'Academic focus', positive: true },
    { key: 'workloadStress', label: 'Academic workload stress', positive: false },
    { key: 'productivity', label: 'Productivity', positive: true },
    { key: 'calm', label: 'Feeling of calm', positive: true },
    { key: 'irritation', label: 'Irritation', positive: false },
    { key: 'hopeful', label: 'Hopefulness', positive: true },
    { key: 'connected', label: 'Social connection', positive: true },
    { key: 'lonely', label: 'Loneliness', positive: false },
];

export function generateInsight(
    inputs: QuestionnaireInputs,
    moodScore: number,
    mood: MoodClassification,
    emoji: string
): InsightResult {
    const highlights: string[] = [];
    const concerns: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Identify highlights and concerns
    for (const ind of INDICATORS) {
        const val = inputs[ind.key];
        if (ind.positive) {
            if (val >= 7) highlights.push(`Good ${ind.label.toLowerCase()}`);
            else if (val <= 3) concerns.push(`Low ${ind.label.toLowerCase()}`);
        } else {
            if (val >= 7) concerns.push(`High ${ind.label.toLowerCase()}`);
            else if (val <= 3) highlights.push(`Low ${ind.label.toLowerCase()}`);
        }
    }

    // Burnout detection
    if (inputs.workloadStress >= 7 && inputs.sleep <= 4) {
        warnings.push('You may be experiencing academic burnout. Consider taking breaks and resting.');
    }
    if (inputs.tiredness >= 8 && inputs.energy <= 3) {
        warnings.push('Your energy is critically low. Prioritize rest and nutrition today.');
    }
    if (inputs.lonely >= 7 && inputs.connected <= 3) {
        warnings.push('You seem quite isolated. Reaching out to a friend or counselor could help.');
    }
    if (inputs.irritation >= 8 && inputs.calm <= 3) {
        warnings.push('High emotional distress detected. Consider speaking with a counselor.');
    }

    // Contextual suggestions based on mood
    if (moodScore <= 30) {
        suggestions.push('Consider talking to a trusted friend, family member, or campus counselor.');
        suggestions.push('Try a short walk or breathing exercises to ground yourself.');
        suggestions.push('Be gentle with yourself — it\'s okay to have tough days.');
    } else if (moodScore <= 50) {
        suggestions.push('Take short breaks between study sessions to recharge.');
        suggestions.push('Practice 5 minutes of deep breathing or mindfulness.');
        if (inputs.lonely >= 6) suggestions.push('Reach out to a friend or classmate today.');
        if (inputs.sleep <= 4) suggestions.push('Try to get to bed earlier tonight — sleep makes a big difference.');
    } else if (moodScore <= 70) {
        suggestions.push('Keep your routine balanced — you\'re doing okay!');
        suggestions.push('Stay hydrated and take a walk if you can.');
        if (inputs.workloadStress >= 6) suggestions.push('Break your workload into smaller tasks to manage stress.');
    } else if (moodScore <= 85) {
        suggestions.push('Great job maintaining your well-being! Keep it up.');
        suggestions.push('Consider sharing your positive energy with a classmate who might need support.');
    } else {
        suggestions.push('You\'re in an excellent state of mind — fantastic!');
        suggestions.push('This is a great day to tackle challenging tasks or try something new.');
    }

    // Add specific suggestions for individual concerns
    if (inputs.difficultyStart >= 7) {
        suggestions.push('Try the 2-minute rule: start with just 2 minutes of any task to build momentum.');
    }
    if (inputs.tiredness >= 7 && !suggestions.some(s => s.includes('rest'))) {
        suggestions.push('Listen to your body — a 20-minute power nap can work wonders.');
    }

    return {
        mood,
        moodScore,
        emoji,
        highlights: highlights.slice(0, 4),
        concerns: concerns.slice(0, 4),
        suggestions: suggestions.slice(0, 4),
        warnings,
    };
}
