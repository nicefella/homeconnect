const nodemailer = require('nodemailer');
const Email = require('email-templates');
const path = require('path');
const root = path.join(__dirname, 'emails');
const dotenv = require('dotenv');

dotenv.config();

const email = new Email({
  views: { root },
  message: {
    from: `⚡ HomeConnect ${process.env.SENDER_EMAIL}`,
  },
  // uncomment below to send emails in development/test env:

  send: true,
  transport: nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASS,
    },
  }),
});

module.exports = {
  sendMail(to, template, locals, imageData) {
    email
      .send({
        template,
        message: {
          to,
          attachments: [
            {
                 filename: 'ss.jpg',
                 content: imageData
            }
       ]
        },
        locals,
      })
      .then(console.log)
      .catch(console.error);
  },
};
