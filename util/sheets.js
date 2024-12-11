import { google } from "googleapis";
import dotenv from 'dotenv';
dotenv.config();
// import { credentials } from "../config/credentials.js";
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const SHEET_ID = process.env.SHEET_ID

const auth = new google.auth.GoogleAuth({
    credentials, 
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });
export const storeInGoogleSheet = async (data) => {
    try {
        
        const spreadsheetId = SHEET_ID;
        const range = 'Sheet1!A1:P1';

        const values = [
            [
                data.uniqueId, data.firstName, data.lastName, data.dob, data.phoneNumber, data.email,
                data.addressOne, data.addressTwo, data.city, data.state,data.country, data.pincode,data.instagramId, data.campaignSource, data.otherValue, data.passport,data.termsAndConditions
            ]
        ];
        

        const resource = {
            values,
        };

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
        });
        
        console.log('Data stored in Google Sheets successfully');
   
    } catch (error) {
        console.error('Error storing data in Google Sheets:', error);
        throw new Error('Failed to store data in Google Sheets');
    }
};

