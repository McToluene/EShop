import Agenda from 'agenda';
import config from '../config';
import handler from '../jobs/emailSequence';

export default ({ agenda }: { agenda: Agenda }) => {
  agenda.define('send-email', { priority: 'high', concurrency: config.agenda.concurrency }, handler);
  agenda.start();
};
