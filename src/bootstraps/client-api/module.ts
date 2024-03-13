import { ApiClientUrlModule } from '@api/client/url/url.module';
import { HealthModule } from '@api/health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApiClientUrlModule, HealthModule],
})
export class ClientAppModule {}
