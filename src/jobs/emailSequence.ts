import Container from 'typedi';
import MailerService from '../services/mailer';

export default async function (job, done): Promise<void> {
  const Logger: any = Container.get('logger');

  try {
    Logger.debug('Email Sequence Job Triggered!');
    const { email, name }: { [key: string]: string } = job.attrs.data;
    const mailerServiceInstance = Container.get(MailerService);
    await mailerServiceInstance.sendWelcomeEmail(email);
    done();
  } catch (error) {
    Logger.error('Error with email sequence job: %o', error);
  }
}
