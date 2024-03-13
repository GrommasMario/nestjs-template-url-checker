import { CoordinatorModule } from '@api/coordinator/coordinator.module';
import { HealthModule } from '@api/health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CoordinatorModule, HealthModule],
})
export class AppCoordinatorModule {}
