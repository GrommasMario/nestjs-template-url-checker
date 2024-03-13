import { Logger } from '@common/logger/logger';
import commonConfig from '@config/common.config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClientAppModule } from './module';

async function bootstrap() {
  const logger = Logger('Application');
  const app = await NestFactory.create(ClientAppModule, { logger });
  const config = new DocumentBuilder()
    .setTitle('Urls api')
    .setDescription('Checking urls')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(commonConfig.port, commonConfig.host);
  logger.log(
    `Application started. Url: ${commonConfig.host}:${commonConfig.port}`,
  );
}
bootstrap();
