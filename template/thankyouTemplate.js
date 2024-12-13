export const welcomeEmailTemplate =(userId)=>`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You template</title>
</head>
<body style="overflow: hidden; display: flex; justify-content: center; align-items: center; font-family: 'Trebuchet MS', sans-serif;">
    <div style="width: auto; height: auto; overflow: hidden; padding: calc(1.25rem + ((1vw - 2.68px) * 2.6042)); background-color: #EDC4C3; border-radius: 7px; display: flex; justify-content: center; align-items: center;">
        <div style="background-color: white; display: block; padding: calc(1.2375rem + ((1vw - 2.68px) * 1.3021)); box-shadow: 0 0 10px rgba(0,0,0,0.4); width: auto; height: auto; border-radius: 7px; text-align: center;">
            <h1 style="font-size: calc(1.8625rem + ((1vw - 3.68px) * 2.34)); margin-block: calc(0.825rem + ((1vw - 4.68px) * 0.9549)); color: goldenrod;">Thank You</h1>
            <p style="font-size: calc(0.8375rem + ((1vw - 4.68px) * 0.5604)); margin-block: calc(1.125rem + ((1vw - 4.68px) * 0.6944)); margin-inline: auto; line-height: 1.5; color: black;"><i>Thank you for registering for Khoobsurat Bharat Ki Khoobsurat Betiya. Your registration (ID: <b>${userId}</b>) has been successfully received. Stay tuned for updates as we celebrate and empower the brilliance of our daughters.</i></p>
            <h1 style="font-size: calc(1.3625rem + ((1vw - 7.68px) * 0.434)); margin-inline: auto; line-height: 1.4; color: black; margin-top: 25px"><i>All The Best<br>Forever52 India Team</i></h1>
        </div>
    </div>
</body>
</html>
`;



