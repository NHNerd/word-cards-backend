import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config();

class MailService {
  constructor() {
    //! What is secure?
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASS,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'The Word Cards: Account activation' + process.env.API_URL,
      text: '',
      html: `
          <div>
            <h1>For activate your account click on link</h1>
            <a href='${link}'>${link}</a>
          </div>
        `,
    });
  }
}

export default new MailService();
