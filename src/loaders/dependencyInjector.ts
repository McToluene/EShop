import LoggerInstance from './logger';
import Container from 'typedi';
import config from '../config';
import agendaFactory from './agenda';
import mailgun, { ConstructorParams } from 'mailgun-js';

export default async function ({
  mongoConnection,
  models,
}: {
  mongoConnection;
  models: { name: string; model: any }[];
}) {
  try {
    models.forEach((m) => {
      Container.set(m.name, m.model);
    });

    const agendaInstance = agendaFactory({ mongoConnection });

    Container.set('agendaInstance', agendaInstance);
    Container.set('logger', LoggerInstance);
    const value: ConstructorParams = {
      apiKey: config.emails.apiKey,
      domain: config.emails.domain,
    };
    Container.set('emailClient', mailgun(value));

    LoggerInstance.info('Agenda injected into container');
    return { agenda: agendaInstance };
  } catch (error) {
    LoggerInstance.error('Error on dependency injector loader: %o', error);
    throw error;
  }
}
