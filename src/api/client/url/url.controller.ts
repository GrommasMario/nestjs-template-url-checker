import { PublicController } from '@common/decorators/controller.decorators';
import { UrlData } from '@domain/url/entities/url-data.entity';

import {
  CreateUrlDto,
  RemoveUrlDto,
} from '@domain/url/url-checker/url-checker.dto';
import { UrlCheckerService } from '@domain/url/url-checker/url-checker.service';
import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@PublicController('urls', 'urls')
export class ApiClientUrlController {
  constructor(private readonly urlService: UrlCheckerService) {}

  @Post()
  @ApiOperation({ summary: 'Add url' })
  @ApiCreatedResponse()
  async addUrl(@Body() body: CreateUrlDto): Promise<void> {
    return await this.urlService.add(body);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Remove url' })
  @ApiOkResponse()
  async removeUrl(@Param() param: RemoveUrlDto): Promise<void> {
    return await this.urlService.remove(param);
  }

  @Get()
  @ApiOperation({ summary: 'Get all urls' })
  @ApiOkResponse({ type: [UrlData] })
  async getAll(): Promise<Array<UrlData>> {
    return await this.urlService.get();
  }
}
