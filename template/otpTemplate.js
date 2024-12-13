export const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP template</title>
</head>
<body style="overflow: hidden; display: flex; justify-content: center; align-items: center; font-family: 'Trebuchet MS', sans-serif;">
    <div style="width: auto; height: auto; overflow: hidden; padding: calc(1.25rem + ((1vw - 2.68px) * 2.6042)); background-color: #EDC4C3; border-radius: 7px; display: flex; justify-content: center; align-items: center;">
        <div style="background-color: white; display: block; padding: calc(1.4375rem + ((1vw - 2.68px) * 1.3021)); box-shadow: 0 0 10px rgba(0,0,0,0.4); width: auto; height: auto; border-radius: 7px; text-align: center;">
            <p style="font-size: calc(1.0375rem + ((1vw - 4.68px) * 0.2604)); font-weight: 600; margin-block: calc(1.125rem + ((1vw - 4.68px) * 0.6944)); margin-inline: auto;">Here is your One Time Password</p>
            <p style="font-size: calc(1.0375rem + ((1vw - 4.68px) * 0.2604)); margin-block: calc(1.125rem + ((1vw - 4.68px) * 0.6944)); margin-inline: auto;">to validate email address</p>
            <h1 style="margin-block: calc(0.825rem + ((1vw - 4.68px) * 0.9549)); margin-inline: auto;"><b>${otp}</b></h1>
            <p style="font-size: calc(1.0375rem + ((1vw - 4.68px) * 0.2604)); color: crimson; margin-block: calc(1.125rem + ((1vw - 4.68px) * 0.6944)); margin-inline: auto;">Valid for 10 minutes only</p>
        </div>
    </div>
</body>
</html>
`;
