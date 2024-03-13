import databaseConfig from '@config/database.config';
import { Module } from '@nestjs/common';
import { ValueProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Sequelize } from 'sequelize-typescript';

import * as models from './models';

const modelValues = Object.values(models);
const providers = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        ...databaseConfig.postgres,
      });

      sequelize.addModels(modelValues);
      return sequelize;
    },
  },
  ...modelValues.map(
    (v): ValueProvider => ({
      provide: v,
      useValue: v,
    }),
  ),
];

@Module({
  providers,
  exports: providers.map(({ provide }) => ({
    useExisting: provide,
    provide: provide,
  })),
})
export class DatabaseModule {}
