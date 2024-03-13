import { Logger } from '@common/logger/logger';
import coordinatorConfig from '@config/coordinator.config';
import { Inject, OnApplicationBootstrap } from '@nestjs/common';
import { Op } from 'sequelize';
import { Repository } from 'sequelize-typescript';
import { UrlDataModel } from '../../shared/database/models/url-data.model';
import { CoordinatorTransport } from './coordinator.interfaces';

export class CoordinatorWorker implements OnApplicationBootstrap {
  private readonly logger = Logger(CoordinatorWorker.name);
  constructor(
    @Inject('URL_CHECKER_TRANSPORT')
    private readonly urlTransport: CoordinatorTransport,
    @Inject(UrlDataModel)
    private readonly urlRepository: Repository<UrlDataModel>,
  ) {}

  onApplicationBootstrap() {
    this.startCron();
  }

  startCron() {
    this.logger.log('Starting cron');
    if (coordinatorConfig.tasks.checkEstimatedUrls.enabled) {
      this.logger.log('Starting cron checkEstimatedUrl');
      setInterval(
        this.checkEstimatedUrl.bind(this),
        coordinatorConfig.tasks.checkEstimatedUrls.interval,
      );
    }
  }

  async checkEstimatedUrl(): Promise<void> {
    const limit = 500;
    let offset = 0;

    while (true) {
      const urlsToCheck = await this.urlRepository.findAll({
        attributes: ['id', 'url'],
        raw: true,
        limit,
        offset,
        order: [['created', 'desc']],
        where: {
          checked: {
            [Op.or]: [
              { [Op.lte]: new Date(new Date().getTime() - 1000 * 60 * 2) },
              { [Op.is]: null },
            ],
          },
        },
      });
      if (!urlsToCheck.length) {
        break;
      }
      this.logger.log(`Urls to checking: ${urlsToCheck.length}`);
      for (const url of urlsToCheck) {
        this.urlTransport.send(url);
      }
      offset += limit;
    }
  }
}
