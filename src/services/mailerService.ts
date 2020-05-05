import { Service, Inject } from 'typedi';
import Mailgun from 'mailgun-js';

@Service()
export default class MailerService {
  constructor(@Inject('emailClient') private emailClient: Mailgun.Mailgun) {}

  async sendWelcomeEmail(email: string, subject: string, message: string) {
    // using mailgun
    const data = {
      from: 'Mailgun Sandbox <postmaster@sandbox5ba4dd2bedb34dc7bb1a8d5956793794.mailgun.org>',
      to: email,
      subject: subject,
      text: message,
    };

    this.emailClient.messages().send(data);
    return { delivered: 1, status: 'Ok' };
  }
}
