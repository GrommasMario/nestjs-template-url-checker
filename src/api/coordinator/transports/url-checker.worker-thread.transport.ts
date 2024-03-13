import { CheckUrlDto } from '@domain/url/url-checker/url-checker.dto';
import { Injectable } from '@nestjs/common';
import { Worker } from 'node:worker_threads';
import { CoordinatorTransport } from '../coordinator.interfaces';

@Injectable()
export class UrlCheckerWorkerThreadTransport
  implements CoordinatorTransport<CheckUrlDto, void>
{
  private worker: Worker = new Worker(
    require.resolve('../url-checker/url-checker.api.worker-thread'),
  );

  send(message: CheckUrlDto): void {
    this.worker.postMessage(message);
  }
}
