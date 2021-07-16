const nodemailer = require('nodemailer');
const Email = require('email-templates');

const email = new Email({
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
  sendMail(to, template, locals) {
    email
      .send({
        template,
        message: {
          to,
        },
        locals,
      })
      .then(console.log)
      .catch(console.error);
  },
};
