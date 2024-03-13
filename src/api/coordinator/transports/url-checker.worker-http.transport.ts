import { CoordinatorTransport } from '@api/coordinator/coordinator.interfaces';
import { Logger } from '@common/logger/logger';
import workersConfig from '@config/workers.config';
import { CheckUrlDto } from '@domain/url/url-checker/url-checker.dto';
import { Injectable } from '@nestjs/common';
import { request } from 'undici';

@Injectable()
export class UrlCheckerWorkerHttpTransport
  implements CoordinatorTransport<CheckUrlDto, void>
{
  private readonly logger = Logger(UrlCheckerWorkerHttpTransport.name);
  send(message: CheckUrlDto): void {
    request(`http://${workersConfig.host}:${workersConfig.port}/UrlChecker`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((e) => {
      this.logger.error(e);
    });
  }
}
