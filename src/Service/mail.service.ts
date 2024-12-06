import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configuration de l'envoi des emails (utilise Gmail)
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // utilisez true pour le port 465
      auth: {
        user: 'chatesprit3@gmail.com', // Remplacez par votre email
        pass: 'vdhu sqjt wuid vjkr',  // Remplacez par votre mot de passe d'application Gmail
      },
    });
  }

  async sendOtpEmail(to: string, otp: number) {
    const htmlTemplate = `
      <h1>Réinitialisation de mot de passe - OTP</h1>
      <p>Votre code OTP est : <strong>${otp}</strong></p>
      <p>Ce code expirera dans 10 minutes.</p>
    `;

    const mailOptions = {
      from: 'Auth Service <chatesprit3@gmail.com>',
      to,
      subject: 'Code OTP pour réinitialisation de mot de passe',
      html: htmlTemplate,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info)); // Utile pour tester avec Ethereal
  }
}
