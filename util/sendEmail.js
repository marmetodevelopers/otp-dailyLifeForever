import dotenv from 'dotenv';
dotenv.config();
import sgMail from '@sendgrid/mail';
const SENDGRID_API_KEY=process.env.SENDGRID_API_KEY
sgMail.setApiKey(SENDGRID_API_KEY);
import { otpEmailTemplate } from '../template/otpTemplate.js'; 
export const sendEmail = async (email, otp) => {
const emailHtml = otpEmailTemplate(otp);
    const msg = {
        to: email,
        from: 'Noreply@futuremakeup.com',
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
        html: emailHtml,
    };
    try {
        const response = await sgMail.send(msg);
	return { success: true, message: 'OTP sent successfully', status: response[0].statusCode };
        
    } catch (error) {
        
        
        return { success: false, message: 'Failed to send OTP', error: error.response ? error.response.data : error.message };
    }
}
