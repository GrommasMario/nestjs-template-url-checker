import { UrlData } from '@domain/url/entities/url-data.entity';
import { PickType } from '@nestjs/swagger';

export class CreateUrlDto extends PickType(UrlData, ['url']) {}

export class RemoveUrlDto extends PickType(UrlData, ['id']) {}
export class CheckUrlDto extends PickType(UrlData, ['id', 'url']) {}
