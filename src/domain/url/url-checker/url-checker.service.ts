import { Logger } from '@common/logger/logger';
import { UrlData } from '@domain/url/entities/url-data.entity';
import { Inject, Injectable } from '@nestjs/common';
import { UrlDataModel } from '@shared/database/models';
import { Repository } from 'sequelize-typescript';
import * as undici from 'undici';
import { CheckUrlDto, CreateUrlDto, RemoveUrlDto } from './url-checker.dto';

@Injectable()
export class UrlCheckerService {
  private readonly logger = Logger(UrlCheckerService.name);

  constructor(
    @Inject(UrlDataModel)
    private readonly urlRepository: Repository<UrlDataModel>,
  ) {}

  async add(data: CreateUrlDto): Promise<void> {
    await this.urlRepository.create({ url: data.url });
  }

  async remove(data: RemoveUrlDto): Promise<void> {
    await this.urlRepository.destroy({ where: { id: data.id } });
  }

  async get(): Promise<Array<UrlData>> {
    return await this.urlRepository.findAll({
      raw: true,
      order: [['created', 'asc']],
    });
  }

  async check(data: CheckUrlDto): Promise<void> {
    this.logger.log(`Start check url: ${data.url}`);
    try {
      const response = await undici.request(data.url);
      const updateData = {
        responseCode: response.statusCode,
        checked: new Date(),
      };
      await this.urlRepository.update(updateData, { where: { id: data.id } });
    } catch (e) {
      this.logger.error(data, e);
    }
  }
}
