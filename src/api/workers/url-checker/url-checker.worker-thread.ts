import { UrlCheckerWorkerModule } from '@api/workers/url-checker/url-checker.module';
import { UrlCheckerService } from '@domain/url/url-checker/url-checker.service';
import { NestFactory } from '@nestjs/core';
import { parentPort } from 'node:worker_threads';
import * as process from 'process';

async function bootstrap() {
  if (parentPort) {
    const applicationContext = await NestFactory.createApplicationContext(
      UrlCheckerWorkerModule,
    );
    await applicationContext.init();
    const service = await applicationContext.resolve(UrlCheckerService);
    parentPort.on('message', async (message: any) => {
      await service.check(message);
    });

    parentPort.on('close', async () => {
      await applicationContext.close();
      process.exit();
    });
  }
}
bootstrap();
