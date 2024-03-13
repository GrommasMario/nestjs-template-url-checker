import { UrlCheckerModule } from '@domain/url/url-checker/url-checker.module';
import { Module } from '@nestjs/common';

@Module({ imports: [UrlCheckerModule], exports: [UrlCheckerModule] })
export class UrlModule {}
