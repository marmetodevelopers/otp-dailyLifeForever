import mongoose from 'mongoose';

const loginSessionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    type: { 
        type: String, 
        required: true, 
        enum: ['email', 'phone'] 
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    otp: {
        type: String,
        required: false
    },
   
    sendOtpAt: {
        type: Date,
        required: false
    },
  
    verifiedAt: {
        type: Date,
        required: false
    },
   
    otpCount: {
        type: Number,
        default: 0
    },
  
    isVerified: {
        type: Boolean,
        default: false
    },
    otpExpiresAt: { type: Date, required: false },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const LoginSession = mongoose.model('LoginSession', loginSessionSchema);
export default LoginSession;
