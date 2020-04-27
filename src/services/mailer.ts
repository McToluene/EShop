import { Service, Inject } from 'typedi';

@Service()
export default class MailerService {
  constructor(@Inject('emailClient') private emailClient) {}

  async sendWelcomeEmail(email: String) {
    // using mailgun
    const data = {
      from: 'Mailgun Sandbox <postmaster@sandbox5ba4dd2bedb34dc7bb1a8d5956793794.mailgun.org>',
      to: email,
      subject: 'Welcome to EShop',
      text: 'Good to have you on board',
    };

    this.emailClient.messages().send(data);
    return { delivered: 1, status: 'Ok' };
  }
}
