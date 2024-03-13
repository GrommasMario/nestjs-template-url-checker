import { UrlCheckerWorkerHttp } from '@api/workers/url-checker/url-checker.worker-http';
import { UrlCheckerWorkerNestTcp } from '@api/workers/url-checker/url-checker.worker-nest-tcp';
import { UrlCheckerModule } from '@domain/url/url-checker/url-checker.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UrlCheckerWorkerHttp, UrlCheckerWorkerNestTcp],
  imports: [UrlCheckerModule],
})
export class UrlCheckerWorkerModule {}
