import emailjs from '@emailjs/browser';

// ============================================================
// EMAILJS CONFIGURATION — Replace the values below
// Sign up free at https://www.emailjs.com/
// 1. Create a service (e.g. Gmail) → copy the Service ID
// 2. Create an email template → copy the Template ID
// 3. Go to Account → copy your Public Key
// ============================================================
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';   // ← Replace
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← Replace
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // ← Replace

// EmailJS template variables expected:
//   {{mentor_name}}    — mentor's name
//   {{mentor_email}}   — mentor's email (to field)
//   {{student_name}}   — student's name
//   {{student_email}}  — student's email
//   {{concern}}        — student's concern message

export interface AppointmentEmailParams {
    mentorName: string;
    mentorEmail: string;
    studentName: string;
    studentEmail: string;
    concern: string;
}

export async function sendAppointmentRequest(params: AppointmentEmailParams): Promise<void> {
    const templateParams = {
        mentor_name: params.mentorName,
        mentor_email: params.mentorEmail,
        student_name: params.studentName,
        student_email: params.studentEmail,
        concern: params.concern,
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
}
