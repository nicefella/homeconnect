var cron = require('node-cron');
var publicIp = require('public-ip');
const mailer = require('./mailer');

const ping = (template) => {
    publicIp.v4().then(IP => {
        mailer.sendMail(process.env.TO_EMAIL, template, { IP });
      });
}

// 

ping('start');

cron.schedule('* * * * *', () => {
  console.log('running every minute');
  ping('standard');
});

