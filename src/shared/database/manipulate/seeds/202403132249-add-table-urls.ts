import { QueryInterface } from 'sequelize';

const table = 'urls';
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.insert(null, table, {
      id: '89b9e70a-89b1-4b92-8ec6-dac53a0ab08f',
      url: 'https://google.com',
    });
  },

  down: (queryInterface: QueryInterface) =>
    queryInterface.delete(null, table, {
      id: '89b9e70a-89b1-4b92-8ec6-dac53a0ab08f',
    }),
};
