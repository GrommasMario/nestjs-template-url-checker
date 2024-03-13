import { UrlCheckerWorkerHttpTransport } from '@api/coordinator/transports/url-checker.worker-http.transport';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { CoordinatorWorker } from './coordinator.worker';

@Module({
  providers: [
    CoordinatorWorker,
    // example: 1
    // {
    //   provide: 'URL_CHECKER_CLIENT_TCP',
    //   useFactory: () => {
    //     return new ClientTCP({
    //       host: workersConfig.host,
    //       port: workersConfig.port + 1,
    //     });
    //   },
    // },
    // example: 2
    // {
    //   provide: 'URL_CHECKER_TRANSPORT',
    //   useClass: UrlCheckerWorkerThreadTransport,
    // },
    // example 3
    {
      provide: 'URL_CHECKER_TRANSPORT',
      useClass: UrlCheckerWorkerHttpTransport,
    },
  ],
  imports: [DatabaseModule],
})
export class CoordinatorModule {}
