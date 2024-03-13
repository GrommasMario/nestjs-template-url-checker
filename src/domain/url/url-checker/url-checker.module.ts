import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { UrlCheckerService } from './url-checker.service';

@Module({
  providers: [UrlCheckerService],
  exports: [UrlCheckerService],
  imports: [DatabaseModule],
})
export class UrlCheckerModule {}
