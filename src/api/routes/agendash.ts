import { Router } from 'express';
import { Container } from 'winston';

export default (app: Router) => {
  const agendaInstance = Container.get('agendaInstance');

  app.use('/dash');
};
