import databaseConfig from '@config/database.config';

module.exports = {
  master: {
    dialect: 'postgres',
    seederStorage: 'sequelize',
    ...databaseConfig.postgres,
  },
};
