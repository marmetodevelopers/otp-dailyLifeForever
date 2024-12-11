export const generateUniqueId= () =>{
    const prefix = '2024-25/KBKB0$';
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
    const randomThreeDigits = Math.floor(100 + Math.random() * 900); // Random 3-digit number
    return `${prefix}${timestamp}${randomThreeDigits}`;
  }
  
