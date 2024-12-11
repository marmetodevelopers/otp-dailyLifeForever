import cron from 'node-cron';
import { clearUnwantedSessions } from "./clearUnwantedSessons.js";

// Schedule the task to run every day at midnight
cron.schedule('0 0 * * *', () => {
    console.log('Running scheduled task to clear unwanted login sessions');
    clearUnwantedSessions();
});
