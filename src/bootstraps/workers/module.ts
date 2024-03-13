import { HealthModule } from '@api/health/health.module';
import { workersDynamicModules } from '@api/workers/workers.modules';
import { Logger } from '@common/logger/logger';
import workersConfig from '@config/workers.config';
import { Module } from '@nestjs/common';

const logger = Logger('DynamicModuleBuilder');
const imports = [HealthModule];
const toEnableModules = new Set(workersConfig.enabledModules);

for (const dynamicModule of workersDynamicModules) {
  if (toEnableModules.has(dynamicModule.name)) {
    imports.push(dynamicModule);
    logger.log(`Worker module: ${dynamicModule.name} will be initialize`);
    toEnableModules.delete(dynamicModule.name);
  }
}

if (toEnableModules.size) {
  logger.log(`Worker modules: ${toEnableModules.keys()} not initialized`);
}

@Module({
  imports,
})
export class AppWorkersModule {}
