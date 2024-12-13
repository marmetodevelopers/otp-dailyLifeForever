import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import emailRoutes from "./routes/emailRoutes.js"
import submitRoutes from "./routes/submitRoutes.js"
import "./util/scheduler.js"
import path from "path";
import {rateLimit} from "express-rate-limit"
dotenv.config();
const app = express();
app.set('trust proxy', 1);

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    limit: 60, // Limit each IP to 60 requests per `window`
    message: 'Too many requests from this IP, please try again later.',
})

const corsOptions = {
    origin: ['https://otp-marmeto.forever52bharat.tech/'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

//middlewares
// app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());
app.use(apiLimiter)

//database connection
connectDB();


//routes
app.use("/api/otp", emailRoutes);
app.use("/api/submit", submitRoutes)

// Serve static files from the public folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//server
const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});