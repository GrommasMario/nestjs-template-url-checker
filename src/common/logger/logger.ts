import logConfig from '@config/log.config';
import { LoggerService } from '@nestjs/common';
import * as log4js from 'log4js';

log4js.configure({
  appenders: { console: { type: 'console' } },
  categories: {
    default: { appenders: ['console'], level: logConfig.level },
  },
});

export function Logger(ctx: string): LoggerService {
  return log4js.getLogger(ctx);
}
