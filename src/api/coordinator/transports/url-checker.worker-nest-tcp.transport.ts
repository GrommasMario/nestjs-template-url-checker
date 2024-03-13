import { CoordinatorTransport } from '@api/coordinator/coordinator.interfaces';
import { CheckUrlDto } from '@domain/url/url-checker/url-checker.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';

@Injectable()
export class UrlCheckerWorkerNestTcpTransport
  implements CoordinatorTransport<CheckUrlDto, void>
{
  constructor(@Inject('URL_CHECKER_CLIENT_TCP') private client: ClientTCP) {}

  send(message: CheckUrlDto): void {
    this.client.send('UrlChecker', message);
  }
}
