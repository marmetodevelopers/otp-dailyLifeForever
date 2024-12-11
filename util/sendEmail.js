import dotenv from 'dotenv';
dotenv.config();
import sgMail from '@sendgrid/mail';
const SENDGRID_API_KEY=process.env.SENDGRID_API_KEY
sgMail.setApiKey(SENDGRID_API_KEY); 
export const sendEmail = async (email, otp) => {
    const msg = {
        to: email,
        from: 'Noreply@futuremakeup.com',
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
        html: `<strong>Your OTP code is ${otp}</strong>`,
    };
    try {
        const response = await sgMail.send(msg);
        console.log(`Email sent with status: ${response[0].statusCode}`);
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        
        return { success: false, message: 'Failed to send OTP', error: error.response ? error.response.data : error.message };
    }
}
