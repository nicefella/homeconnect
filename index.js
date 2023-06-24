var cron = require('node-cron');
var publicIp = require('public-ip');
const mailer = require('./mailer');
const dotenv = require('dotenv');
const Webcam = require('node-webcam');
dotenv.config();

const webcam = Webcam.create({
  //Picture related

  width: 1280,

  height: 720,

  quality: 100,

  // Number of frames to capture
  // More the frames, longer it takes to capture
  // Use higher framerate for quality. Ex: 60

  frames: 60,


  //Delay in seconds to take shot
  //if the platform supports miliseconds
  //use a float (0.1)
  //Currently only on windows

  delay: 0,


  //Save shots in memory

  saveShots: true,


  // [jpeg, png] support varies
  // Webcam.OutputTypes

  output: "jpeg",


  //Which camera to use
  //Use Webcam.list() for results
  //false for default device

  device: false,


  // [location, buffer, base64]
  // Webcam.CallbackReturnTypes

  callbackReturn: "buffer",


  //Logging

  verbose: false
});

const ping = (template) => {
  publicIp.v4().then(IP => {

    webcam.capture('photo', (err, imageData) => {

      console.log('imageData', imageData);
      console.log('user', process.env.SENDER_EMAIL, process.env.SENDER_EMAIL_PASS);

      const fileName = new Date(Date.now()).toISOString();

      if (err) {
        console.error(err);
        return;
      }
      mailer.sendMail(process.env.TO_EMAIL, template, { IP, fileName }, imageData, fileName);
    });
  });
}

//

ping('start');

cron.schedule('00 * * * *', () => {
  console.log('running every minute');
  ping('standard');
});

