import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUrl, IsUUID } from 'class-validator';

export class UrlData {
  @ApiProperty({ type: String, format: 'UUID' })
  @IsUUID()
  id!: string;
  @ApiProperty({ type: String, format: 'URL' })
  @IsUrl()
  url!: string;
  @ApiProperty({ type: Number })
  @IsInt()
  responseCode!: number;

  @ApiProperty({ type: Date })
  checked!: Date | null;
  @ApiProperty({ type: Date })
  created!: Date;
  @ApiProperty({ type: Date })
  updated!: Date;
}
