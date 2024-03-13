import { DataTypes, literal, QueryInterface } from 'sequelize';

const table = 'urls';
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(table, {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: literal('gen_random_uuid()'),
      },
      url: { type: DataTypes.TEXT, allowNull: false },
      responseCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      checked: { type: DataTypes.DATE, allowNull: true },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: literal('now()'),
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: literal('now()'),
      },
    });
  },

  down: (queryInterface: QueryInterface) => queryInterface.dropTable(table),
};
