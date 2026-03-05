// storageService.ts — localStorage abstraction layer
// Swap this file's internals to Firestore when migrating to Firebase

export interface MoodEntry {
  id: string;
  date: string;
  // Section A — Energy
  energy: number;          // 1–10
  sleep: number;           // 1–10
  difficultyStart: number; // 1–10
  tiredness: number;       // 1–10
  // Section B — Academic
  focus: number;           // 1–10
  workloadStress: number;  // 1–10
  productivity: number;    // 1–10
  // Section C — Emotions
  calm: number;            // 1–10
  irritation: number;      // 1–10
  hopeful: number;         // 1–10
  // Section D — Social
  connected: number;       // 1–10
  lonely: number;          // 1–10
  // Calculated
  moodScore: number;       // 0–100
  mood: string;            // Distressed | Low Mood | Neutral | Positive | Very Positive
}

const STORAGE_KEY = 'student_mood_data';

export async function saveMoodEntry(entry: MoodEntry): Promise<void> {
  const existing = await getAllMoodEntries();
  existing.unshift(entry); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export async function getAllMoodEntries(): Promise<MoodEntry[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as MoodEntry[];
  } catch {
    return [];
  }
}

export async function clearAllEntries(): Promise<void> {
  localStorage.removeItem(STORAGE_KEY);
}
