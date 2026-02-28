// Shared mentor data — used in Home.tsx, Mentor.tsx, and MentorDetail.tsx

export interface Mentor {
    id: number;
    name: string;
    role: string;
    specialty: string;
    experience: string;
    rating: number;
    sessions: number;
    image: string;
    email: string;
    bio: string;
    tags: string[];
}

export const MENTORS: Mentor[] = [
    {
        id: 1,
        name: "Dr. Seraphina Voss",
        role: "Clinical Psychologist",
        specialty: "Anxiety & Mindfulness",
        experience: "12+ Years",
        rating: 4.9,
        sessions: 340,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
        email: "mentor1@mindease.edu", // Replace with real mentor email
        bio: "Dr. Voss specializes in evidence-based mindfulness techniques and cognitive approaches for anxiety. She has helped hundreds of students navigate academic stress, social anxiety, and burnout with compassion and clarity.",
        tags: ["Mindfulness", "CBT", "Anxiety Relief", "Academic Stress", "Breathing Techniques"],
    },
    {
        id: 2,
        name: "Marcus Chen",
        role: "Wellness Coach",
        specialty: "Work-Life Balance",
        experience: "8 Years",
        rating: 4.8,
        sessions: 210,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
        email: "mentor2@mindease.edu", // Replace with real mentor email
        bio: "Marcus is a certified wellness coach who guides students in building sustainable habits, managing time effectively, and finding harmony between academic demands and personal wellbeing.",
        tags: ["Work-Life Balance", "Habit Building", "Time Management", "Burnout Prevention"],
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "CBT Specialist",
        specialty: "Stress Management",
        experience: "10 Years",
        rating: 5.0,
        sessions: 280,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
        email: "mentor3@mindease.edu", // Replace with real mentor email
        bio: "Elena uses Cognitive Behavioral Therapy to help students reframe negative thought patterns and develop powerful coping strategies for stress, overwhelm, and exam pressure.",
        tags: ["Cognitive Behavioral Therapy", "Stress Reduction", "Thought Patterns", "Exam Anxiety"],
    },
    {
        id: 4,
        name: "James Wilson",
        role: "Relationship Mentor",
        specialty: "Conflict Resolution",
        experience: "15 Years",
        rating: 4.7,
        sessions: 420,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
        email: "mentor4@mindease.edu", // Replace with real mentor email
        bio: "James brings 15 years of relationship counseling expertise to help students manage interpersonal conflicts, build healthy communication skills, and navigate complex social dynamics.",
        tags: ["Conflict Resolution", "Communication", "Relationships", "Social Skills", "Peer Dynamics"],
    },
    {
        id: 5,
        name: "Dr. Anika Sharma",
        role: "Trauma-Informed Therapist",
        specialty: "Emotional Healing",
        experience: "9 Years",
        rating: 4.9,
        sessions: 195,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
        email: "mentor5@mindease.edu", // Replace with real mentor email
        bio: "Dr. Sharma creates a deeply safe and nurturing environment for emotional healing. She specializes in trauma-informed care, helping students process difficult experiences and rebuild confidence.",
        tags: ["Trauma Healing", "Emotional Safety", "Self-Compassion", "Resilience Building"],
    },
    {
        id: 6,
        name: "Dr. David Park",
        role: "Motivational Psychologist",
        specialty: "Self-Growth & Confidence",
        experience: "11 Years",
        rating: 4.8,
        sessions: 310,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
        email: "mentor6@mindease.edu", // Replace with real mentor email
        bio: "Dr. Park uses positive psychology and motivational interviewing to help students unlock their inner potential, build self-confidence, and pursue their goals with purpose and drive.",
        tags: ["Self-Growth", "Confidence", "Positive Psychology", "Goal Setting", "Motivation"],
    },
];
