import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const LIMECHAT_ACCESS_TOKEN = process.env.LIMECHAT_ACCESS_TOKEN
const LIMECHAT_ACCOUNT_ID = process.env.LIMECHAT_ACCOUNT_ID
const LIMECHAT_API_URL = process.env.LIMECHAT_API_URL

export const sendSms = async (phoneNumber, otp) => {

    const phoneNo = phoneNumber.replace("91", "");
    try {
        const response = await axios.post(LIMECHAT_API_URL, {
            distinct_id: phoneNumber,
            phone: phoneNumber,
            event: 'otp_send',
            data: {
                "otp": otp,
                "phone": phoneNo
            },
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-limechat-uat': LIMECHAT_ACCESS_TOKEN,
                'x-fb-account-id': LIMECHAT_ACCOUNT_ID
            }
        });

        console.log(response);

        if (response.status === 201) {
            return { success: true, message: 'OTP sent successfully', otp };
        } else {
            return { success: false, message: 'Failed to send OTP', details: response.data };
        }
    } catch (error) {
        console.error('Error sending OTP:', error.response ? error.response.data : error.message);
        return { success: false, message: 'Failed to send OTP', error: error.response ? error.response.data : error.message };
    }
};

