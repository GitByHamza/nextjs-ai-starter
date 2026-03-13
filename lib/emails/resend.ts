import { Resend } from 'resend';

// Make sure you added RESEND_API_KEY to your .env.local
export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
    to,
    subject,
    react
}: {
    to: string;
    subject: string;
    react: React.ReactElement;
}) => {
    try {
        const data = await resend.emails.send({
            from: 'Your SaaS Name <onboarding@resend.dev>', // Change to your verified domain later
            to,
            subject,
            react,
        });
        return { success: true, data };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error };
    }
};
