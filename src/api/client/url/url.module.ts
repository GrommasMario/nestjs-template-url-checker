import { UrlModule } from '@domain/url/url.module';
import { Module } from '@nestjs/common';
import { ApiClientUrlController } from './url.controller';

@Module({
  controllers: [ApiClientUrlController],
  imports: [UrlModule],
})
export class ApiClientUrlModule {}
