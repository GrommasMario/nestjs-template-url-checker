/* eslint-disable no-param-reassign */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<Record<string, unknown>> {
  skipValidateTypes = [String, Boolean, Number, Array, Object];
  async transform<T = unknown>(
    value: T,
    argumentMetadata: ArgumentMetadata,
  ): Promise<T | Record<string, unknown>> {
    if (
      !argumentMetadata.metatype ||
      this.skipValidateTypes.find((t) => t === argumentMetadata.metatype)
    ) {
      return value;
    }

    const object = plainToInstance(argumentMetadata.metatype, value);
    const validationErrors = await validate(object, { whitelist: true });
    if (validationErrors.length > 0) {
      throw new BadRequestException(validationErrors);
    }

    return object;
  }
}
