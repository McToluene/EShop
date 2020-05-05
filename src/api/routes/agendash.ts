// import { Router } from 'express';
// import { Container } from 'winston';
// import basicAuth from 'express-basic-auth';
// import config from '../../config'
// import agendash from 'agendash';

// export default (app: Router) => {
//   const agendaInstance = Container.get('agendaInstance');

//   app.use('/dash', basicAuth({
//     users: { [config.agendash.user]: config.agendash.password },
//     challenge: true
//   }),
//     agendash(agendaInstance)
//   );
// };
