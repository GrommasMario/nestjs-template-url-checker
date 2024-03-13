import { UrlCheckerService } from '@domain/url/url-checker/url-checker.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UrlCheckerWorkerNestTcp {
  constructor(private readonly service: UrlCheckerService) {}

  @MessagePattern('UrlChecker/check')
  async handle(@Payload() payload: any): Promise<void> {
    await this.service.check(payload);
  }
}
