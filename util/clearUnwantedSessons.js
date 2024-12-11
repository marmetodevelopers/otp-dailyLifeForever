import LoginSession from '../models/loginSession.js';

export const clearUnwantedSessions = async () => {
    try {
        const timeLimit = 15 * 60 * 1000; 
        const currentTime = new Date();
        const criteria = {
            sendOtpAt: { $lt: new Date(currentTime - timeLimit) } // Sessions where sendOtpAt is more than 15 minutes old
        };
        const result = await LoginSession.deleteMany(criteria);

        console.log(`Deleted ${result.deletedCount} unwanted login sessions`);
    } catch (error) {
        console.error('Error clearing unwanted login sessions:', error);
    }
};
