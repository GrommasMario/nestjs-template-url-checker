import { Logger } from '@common/logger/logger';
import workersConfig from '@config/workers.config';
import { NestFactory } from '@nestjs/core';
import { AppWorkersModule } from './module';

async function bootstrap() {
  const logger = Logger('Application');
  const app = await NestFactory.create(AppWorkersModule, { logger });
  await app.listen(workersConfig.port, workersConfig.host);
  logger.log(
    `Workers started. Url: ${workersConfig.host}:${workersConfig.port}`,
  );
}
bootstrap();
