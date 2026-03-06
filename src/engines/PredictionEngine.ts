// PredictionEngine.ts — Mood scoring algorithm based on 12 indirect questions
// Positive indicators boost score, negative indicators reduce it.
// Final score is normalized to 0–100 and classified into mood categories.

export interface QuestionnaireInputs {
    // Section A — Energy & Physical State
    energy: number;          // 1–10
    sleep: number;           // 1–10
    difficultyStart: number; // 1–10 (negative)
    tiredness: number;       // 1–10 (negative)
    // Section B — Academic & Cognitive
    focus: number;           // 1–10
    workloadStress: number;  // 1–10 (negative)
    productivity: number;    // 1–10
    // Section C — Emotional Indicators
    calm: number;            // 1–10
    irritation: number;      // 1–10 (negative)
    hopeful: number;         // 1–10
    // Section D — Social Indicators
    connected: number;       // 1–10
    lonely: number;          // 1–10 (negative)
}

export type MoodClassification =
    | 'Distressed'
    | 'Low Mood'
    | 'Neutral'
    | 'Positive'
    | 'Very Positive';

export interface MoodResult {
    moodScore: number;          // 0–100
    mood: MoodClassification;
    emoji: string;
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}

export function calculateMoodScore(inputs: QuestionnaireInputs): MoodResult {
    // Positive indicators (higher = better mood)
    const positive =
        inputs.energy +
        inputs.sleep +
        inputs.focus +
        inputs.productivity +
        inputs.calm +
        inputs.hopeful +
        inputs.connected;

    // Negative indicators (higher = worse mood)
    const negative =
        inputs.workloadStress +
        inputs.irritation +
        inputs.lonely +
        inputs.tiredness +
        inputs.difficultyStart;

    // Raw score range: positive is 7–70, negative is 5–50
    // Raw = positive - negative → range: (7-50) to (70-5) = -43 to 65
    // Normalize to 0–100
    const rawScore = positive - negative;
    const minPossible = 7 - 50;  // -43
    const maxPossible = 70 - 5;  // 65
    const normalized = ((rawScore - minPossible) / (maxPossible - minPossible)) * 100;
    const moodScore = clamp(Math.round(normalized), 0, 100);

    // Classify
    let mood: MoodClassification;
    let emoji: string;

    if (moodScore <= 30) {
        mood = 'Distressed';
        emoji = '😟';
    } else if (moodScore <= 50) {
        mood = 'Low Mood';
        emoji = '😔';
    } else if (moodScore <= 70) {
        mood = 'Neutral';
        emoji = '🙂';
    } else if (moodScore <= 85) {
        mood = 'Positive';
        emoji = '😊';
    } else {
        mood = 'Very Positive';
        emoji = '🤩';
    }

    return { moodScore, mood, emoji };
}
