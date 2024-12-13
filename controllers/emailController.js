
import { v4 as uuidv4 } from 'uuid';
import LoginSession from '../models/loginSession.js';
import { generateOTP } from '../util/generateOtp.js';
import { sendEmail } from '../util/sendEmail.js';
import { sendSms } from '../util/sendSms.js';
import Registration from '../models/registration.js';

//send otp
export const sendOtp = async (req, res) => {
    try {
        const { data, type } = req.body;

        if (!data || !type) {
            return res.status(400).json({ message: 'Invalid input data' });
        }
        const email = type === 'email' ? data : null;
        const phone = type === 'phone' ? data : null;

       // Check if the email or phone is already registered
        const existingUser = await Registration.findOne({
            $or: [{ email }, { phoneNumber: phone }],
        });

        if (existingUser) {
            return res.status(400).json({
                message: type === 'email'
                    ? 'Email is already registered'
                    : 'Phone number is already registered',
                userId: existingUser.userId,
            });
        }

        // Generate OTP
        const otp = generateOTP();
        const sessionId = uuidv4();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
       
        let session;
        if (type === 'email') {
            
            const emailResponse=await sendEmail(email, otp);
            if (!emailResponse.success) {
                return res.status(500).json({ 
                    message: emailResponse.message, 
                    error: emailResponse.error 
                });
            }
            
            session = new LoginSession({
                id: sessionId,
                type: 'email',
                email,
                otp: otp,
                otpCount: 1,
                sendOtpAt: new Date(),
                otpExpiresAt
            });
            

        } else if (type === 'phone') {
           
            const smsResponse=await sendSms(phone, otp);
            if (!smsResponse.success) {
                return res.status(500).json({ 
                    message: smsResponse.message, 
                    error: smsResponse.error 
                });
            }
            
            
            session = new LoginSession({
                id: sessionId,
                type: 'phone',
                phone,
                otp: otp,
                otpCount: 1,
                sendOtpAt: new Date(),
                otpExpiresAt
            });
        }

        // Save the session to the database
        await session.save();

        console.log(`Session created: ${JSON.stringify(session)}`);
        return res.status(200).json({ 
            message: 'OTP sent successfully', 
            ...(type === 'phone' ? { phoneSessionId: session.id } : { emailSessionId: session.id})
         })
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ message: 'Internal server error.Please try again' });
    }
};


//verify otp
export const verifyOtp = async (req, res) => {
    try {
        const { sessionId, otp } = req.body;
        if (!sessionId || !otp) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const session = await LoginSession.findOne({ id: sessionId });

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        
        if (new Date() > session.otpExpiresAt) { 
            return res.status(400).json({ message: 'OTP has expired' }); 
        }
       
        let isOtpValid = false;
       
        if (session.otp === otp) {
            isOtpValid = true;
            session.isVerified = true;
        }

        if (!isOtpValid) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        session.verifiedAt = new Date();
        await session.save();

        console.log(`Session verified: ${JSON.stringify(session)}`);
        return res.status(200).json({ message: `${session.type} verification successful` });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal server error.Please try again' });
    }
};


//otp resend
export const resendOtp = async (req, res) => {
    const { sessionId} = req.body;
    const otp = generateOTP();

    try {
        const session = await LoginSession.findOne({ id: sessionId });

        if (!session) {
            return res.status(400).json({ message: 'Invalid session ID' });
        }
       
        if (session.otpCount >= 3) {
            return res.status(400).json({ message: 'Maximum OTP limit reached' });
        }

        if (session.type === 'email') {
            const emailResponse=await sendEmail(session.email, otp);
            if (!emailResponse.success) {
                return res.status(500).json({ 
                    message: emailResponse.message, 
                    error: emailResponse.error 
                });
            }
            
        } else if (session.type === 'phone') {
           const smsResponse= await sendSms(session.phone, otp);
           if (!smsResponse.success) {
            return res.status(500).json({ 
                message: smsResponse.message, 
                error: smsResponse.error 
            });
        }
        
        } else {
            return res.status(400).json({ message: 'Invalid type provided, must be "email" or "phone"' });
        }

        const updatedSession = {
            otp: otp,
            otpCount: session.otpCount + 1,
            sendOtpAt: new Date(),
        };

        await LoginSession.findOneAndUpdate(
            { id: sessionId },
            updatedSession,
            { upsert: true, new: true }
        );

       return  res.status(200).json({ message: `OTP resent successfully. You have ${3 - session.otpCount} attempts left.`, 
        ...(session.type === 'phone' ? { phoneSessionId: session.id } : { emailSessionId: session.id })});
    } catch (error) {
        console.error('Error resending OTP:', error.message);
        res.status(500).json({ message: 'Failed to resend OTP' });
    }
};




