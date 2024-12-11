import express from "express";
import { sendOtp,verifyOtp ,resendOtp} from "../controllers/emailController.js";
const router = express.Router();

router.post("/send",sendOtp);
router.post("/verify",verifyOtp);
router.post("/resend",resendOtp);
export default router