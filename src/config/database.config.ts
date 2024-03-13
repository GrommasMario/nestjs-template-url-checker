export default {
  postgres: {
    port: Number(process.env.PG_PORT!),
    host: process.env.PG_HOST!,
    database: process.env.PG_DB!,
    username: process.env.PG_USERNAME!,
    password: process.env.PG_PASSWORD!,
    logging: process.env.PG_LOGGING! === '1',
  },
};
