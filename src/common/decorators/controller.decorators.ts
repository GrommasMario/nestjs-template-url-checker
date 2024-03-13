import { applyDecorators, Controller, UsePipes } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';

export const PublicController = (prefix: string, tag?: string) => {
  const decorators = [
    Controller(prefix),
    ApiInternalServerErrorResponse(),
    UsePipes(ValidationPipe),
  ];
  if (tag) {
    decorators.push(ApiTags(tag.toUpperCase()));
  }

  return applyDecorators(...decorators);
};
