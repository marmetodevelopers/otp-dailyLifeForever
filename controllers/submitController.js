import Registration from '../models/registration.js';
import LoginSession from '../models/loginSession.js';
import { welcomeEmailTemplate } from '../template/thankyouTemplate.js';
import { generateUniqueId } from '../util/generateId.js';
import dotenv from 'dotenv';
import { v4 as uuidv4, validate } from 'uuid';
dotenv.config();
import sgMail from '@sendgrid/mail';
import { validateUserData } from '../util/validate.js';
import { storeInGoogleSheet } from '../util/sheets.js';
const SENDGRID_API_KEY=process.env.SENDGRID_API_KEY
sgMail.setApiKey(SENDGRID_API_KEY); 

// handle form submission
export const submit = async (req, res) => {
    
    try {
        const { phoneSessionId,emailSessionId } = req.body;
        const { formData:{ firstName, lastName, dob, phoneNumber, email, addressOne, addressTwo, city, state,country, pincode, instagramId, campaignSource, otherValue, passport,termsAndConditions}} = req.body;
       
        const userData = {
            firstName,  lastName,  dob, phoneNumber, email,
            addressOne, addressTwo, city, state,country, pincode,
            instagramId, campaignSource, otherValue, passport,termsAndConditions
        };
        
        const userCount = await Registration.countDocuments() ||0; 
        const uniqueId = `2024-25/KBKB0${userCount + 1}`;
        
        if (!phoneSessionId&&!emailSessionId) {
            return res.status(400).json({ message: 'Missing session ID' });
        }
        
        const phoneSession = await LoginSession.findOne({ id: phoneSessionId }); 
        const emailSession = await LoginSession.findOne({ id: emailSessionId }); 
        const isEmailVerified = emailSession && emailSession.isVerified; 
        const isPhoneVerified = phoneSession && phoneSession.isVerified;

        if (!isEmailVerified || !isPhoneVerified) {
            return res.status(400).json({ message: 'Both email and phone must be verified' });
        }
        
        const newUser = new Registration({
            userId: uniqueId,
            email: emailSession.email,
            phoneNumber: phoneSession.phone,
        });
        try {
            await newUser.save();
        } catch (error) {
            if (error.code === 11000) {
                console.error('Duplicate key error detected:', error);
                return res.status(401).json({ message: 'Error occurred. Please Register again.' });
            }
            throw error; 
        }
        
      // Store values in Google Sheets
        await storeInGoogleSheet({ uniqueId, ...userData });
        
        const emailHtml = welcomeEmailTemplate(newUser.userId);
      // Send the unique registration ID to the user's email
       const msg = {
        to: newUser.email,
        from: 'Noreply@futuremakeup.com',
        subject: 'Welcome to Daily life forever!',
        text: `Thank you for registering! Your unique ID is ${newUser.userId}. - The Daily life forever Team`,
        html: emailHtml
        };
    
        try {
            const response = await sgMail.send(msg);
            console.log(`Email sent with status: ${response[0].statusCode}`);
        } catch (error) {
            console.error('Error sending OTP:', error.message);
            res.status(500).json({ message: 'Failed to send OTP' });
        }
        // Clear both sessions from the database 
        await LoginSession.deleteOne({ id: phoneSessionId }); 
        await LoginSession.deleteOne({ id: emailSessionId });

        console.log(`User registered: ${JSON.stringify(newUser)}`);
        return res.status(201).json({ message: 'User registered successfully', userId: newUser.userId });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error.Please try again' });
    }
};
