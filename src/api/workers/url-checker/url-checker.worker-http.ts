import { CheckUrlDto } from '@domain/url/url-checker/url-checker.dto';
import { UrlCheckerService } from '@domain/url/url-checker/url-checker.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('UrlChecker')
export class UrlCheckerWorkerHttp {
  constructor(private readonly service: UrlCheckerService) {}

  @Post()
  async handle(@Body() payload: CheckUrlDto): Promise<void> {
    await this.service.check(payload);
  }
}
