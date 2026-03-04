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
        name: "Priya Katariya",
        role: "Team Leader",
        specialty: "Anxiety & Mindfulness",
        experience: "12+ Years",
        rating: 4.9,
        sessions: 340,
        image: "https://i.ibb.co/KzNQ4DCX/IMG-20251022-WA0013.jpg",
        email: "mentor1@mindease.edu", // Replace with real mentor email
        bio: "Led the project.",
        tags: ["Mindfulness", "CBT", "Anxiety Relief", "Academic Stress", "Breathing Techniques"],
    },
    {
        id: 2,
        name: "Amica Aggarwal",
        role: "Team Member",
        specialty: "Work-Life Balance",
        experience: "8 Years",
        rating: 4.8,
        sessions: 210,
        image: "https://ibb.co/rKGjPdpL",
        email: "mentor2@mindease.edu", // Replace with real mentor email
        bio: "Worked on the project.",
        tags: ["Work-Life Balance", "Habit Building", "Time Management", "Burnout Prevention"],
    },
    {
        id: 3,
        name: "Trishna Saini",
        role: "Team Member",
        specialty: "Stress Management",
        experience: "10 Years",
        rating: 5.0,
        sessions: 280,
        image: "https://ibb.co/tr7QXTw",
        email: "mentor3@mindease.edu", // Replace with real mentor email
        bio: "Worked on the project.",
        tags: ["Cognitive Behavioral Therapy", "Stress Reduction", "Thought Patterns", "Exam Anxiety"],
    },
    {
        id: 4,
        name: "Krishna Kumar",
        role: "Team Member",
        specialty: "Conflict Resolution",
        experience: "15 Years",
        rating: 4.7,
        sessions: 420,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
        email: "mentor4@mindease.edu", // Replace with real mentor email
        bio: "Worked on the project.",
        tags: ["Conflict Resolution", "Communication", "Relationships", "Social Skills", "Peer Dynamics"],
    },
    {
        id: 5,
        name: "Hariram Chembra",
        role: "Team Member",
        specialty: "Emotional Healing",
        experience: "9 Years",
        rating: 4.9,
        sessions: 195,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
        email: "mentor5@mindease.edu", // Replace with real mentor email
        bio: "Worked on the project.",
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
