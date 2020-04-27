import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Couldn't find .env filr");
}

export default {
  port: parseInt(process.env.PORT, 10),

  jwtSecret: process.env.JWT_SECRET,

  // MongoDB URL connection string
  databaseURL: process.env.MONGODB_URI,

  // For winston
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  // Agenda.js stuff
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },

  // Mailgun email credentials
  emails: {
    apiKey: '340c8696542b47438853156db2950008-f135b0f1-a348f6e2',
    domain: 'sandbox5ba4dd2bedb34dc7bb1a8d5956793794.mailgun.org',
  },

  // API configs
  api: {
    prefix: '/api',
  },
};
