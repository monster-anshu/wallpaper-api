import * as nodemailer from 'nodemailer';
import { NODE_MAILER_PASSWORD, NODE_MAILER_USERNAME } from '@config';
import { logger } from '@utils/logger';
export default class EmailService {
  private emailTransporter = nodemailer.createTransport({
    host: 'imap.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: NODE_MAILER_USERNAME,
      pass: NODE_MAILER_PASSWORD,
    },
  });

  public sendOTP(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const mail: nodemailer.SendMailOptions = {
      from: "'Wallpaper' <himanshugunwant2312@gmail.com>",
      to: email,
      subject: 'OTP from wallpaper',
      text: `Your otp is ${otp}`,
    };
    this.emailTransporter.sendMail(mail, err => {
      if (err) {
        logger.error('Error while sending OTP :' + err.message);
        return;
      }
    });
    return otp;
  }
}
