import { AppCoordinatorModule } from '@bootstraps/coordinator/module';
import { Logger } from '@common/logger/logger';
import commonConfig from '@config/common.config';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const logger = Logger('Application');

  const app = await NestFactory.create(AppCoordinatorModule, { logger });
  await app.listen(commonConfig.port, commonConfig.host);
  logger.log(
    `Coordinator started. Url: ${commonConfig.host}:${commonConfig.port}`,
  );
}
bootstrap();
