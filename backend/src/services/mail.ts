import nodemailer, { Transporter } from 'nodemailer';
import { Service } from 'typedi';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';
import { EMAIL_PATH_DEFAULT } from '../utils/constants/common';

@Service()
export default class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.hbs',
          partialsDir: path.resolve(EMAIL_PATH_DEFAULT),
          defaultLayout: false,
        },
        viewPath: path.resolve(EMAIL_PATH_DEFAULT),
        extName: '.hbs',
      })
    );
  }

  sendEmail = async (to: string, subject: string, template: string, context?: any) => {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to,
      subject,
      template,
      context
    };
  
    return this.transporter.sendMail(mailOptions);
  };
}

// const handlebarOptions = {
//   viewEngine: {
//     extName: '.hbs',
//     partialsDir: path.resolve('./utils/mail-templates/'),
//     defaultLayout: false
//   },
//   viewPath: path.resolve('./utils/mail-templates/'),
//   extName: '.hbs'
// };

// transporter.use('compile', hbs(handlebarOptions));

// const sendEmail = (to, subject, template, context) => {
//   const mailOptions = {
//     from: process.env.MAIL_FROM,
//     to,
//     subject,
//     template,
//     context
//   };

//   return transporter.sendMail(mailOptions);
// };

// const send2FACode = (to, context) => {
//   const template = 'send-2fa-code';
//   const subject = 'TCCN Registration Notice - Verification Code';
//   const mailOptions = {
//     from: process.env.MAIL_FROM,
//     to,
//     subject,
//     template,
//     context
//   };

//   return transporter.sendMail(mailOptions);
// };

// const sendPasswordResetRequest = (to, context) => {
//   const template = 'password-reset-request';
//   const subject = 'TCCN - Password Reset Request';
//   const mailOptions = {
//     from: process.env.MAIL_FROM,
//     to,
//     subject,
//     template,
//     context
//   };

//   return transporter.sendMail(mailOptions);
// };

// const sendPasswordResetConfirmation = (to, context) => {
//   const template = 'password-reset-confirmation';
//   const subject = 'TCCN - Password Reset';
//   const mailOptions = {
//     from: process.env.MAIL_FROM,
//     to,
//     subject,
//     template,
//     context
//   };

//   return transporter.sendMail(mailOptions);
// };

// module.exports = {
//   sendEmail,
//   send2FACode,
//   sendPasswordResetRequest,
//   sendPasswordResetConfirmation
// };