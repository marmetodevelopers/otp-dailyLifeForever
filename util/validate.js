

export const validateUserData = (data) => {
    const errors = {};

    if (!data.firstName || typeof data.firstName !== 'string' || /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(data.firstName)) {
        errors.firstName = 'First name is required, should be a string, and should not contain special characters';
    }
    
    if (!data.lastName || typeof data.lastName !== 'string' || /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(data.lastName)) {
        errors.lastName = 'Last name is required, should be a string, and should not contain special characters';
    }
    

    if (!data.phoneNumber || !/^\d{10}$/.test(data.phoneNumber)) {
        errors.phoneNumber = 'Valid 10-digit phone number is required';
    }

    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = 'Valid email is required';
    }

    if (!data.addressOne) {
        errors.addressOne = 'Address line 1 is required';
    }

    if (!data.city) {
        errors.city = 'City is required';
    }

    if (!data.state) {
        errors.state = 'State is required';
    }

    if (!data.pincode || !/^\d{6}$/.test(data.pincode)) {
        errors.pincode = 'Valid 6-digit pincode is required';
    }

    if (data.instagramId && typeof data.instagramId !== 'string') {
        errors.instagramId = 'Instagram ID should be a string if provided';
    }

    if (data.campaignSource && typeof data.campaignSource !== 'string') {
        errors.campaignSource = 'Campaign source should be a string if provided';
    }

    if (data.otherValue && typeof data.otherValue !== 'string') {
        errors.otherValue = 'Other value should be a string if provided';
    }

    if (data.passport && typeof data.passport !== 'string') {
        errors.passport = 'Passport should be a string if provided';
    }

    const isValid = Object.keys(errors).length === 0;
    if (!isValid) {
        return errors;
    }
    return null;
    
};
