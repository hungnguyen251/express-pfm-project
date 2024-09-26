const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve('./views/mail-templates/'),
    defaultLayout: false
  },
  viewPath: path.resolve('./views/mail-templates/'),
  extName: '.hbs'
};

transporter.use('compile', hbs(handlebarOptions));

const sendEmail = (to, subject, template, context) => {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    template,
    context
  };

  return transporter.sendMail(mailOptions);
};

const send2FACode = (to, context) => {
  const template = 'send-2fa-code';
  const subject = 'TCCN Registration Notice - Verification Code';
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    template,
    context
  };

  return transporter.sendMail(mailOptions);
};

const sendPasswordResetRequest = (to, context) => {
  const template = 'password-reset-request';
  const subject = 'TCCN - Password Reset Request';
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    template,
    context
  };

  return transporter.sendMail(mailOptions);
};

const sendPasswordResetConfirmation = (to, context) => {
  const template = 'password-reset-confirmation';
  const subject = 'TCCN - Password Reset';
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    template,
    context
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmail,
  send2FACode,
  sendPasswordResetRequest,
  sendPasswordResetConfirmation
};