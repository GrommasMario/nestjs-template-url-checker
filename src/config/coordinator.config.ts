import * as process from 'process';

export default {
  tasks: {
    checkEstimatedUrls: {
      enabled: process.env!.COORDINATOR_TASKS_CEU_ENABLED === '1',
      interval: Number(process.env!.COORDINATOR_TASKS_CEU_INTERVAL) * 1000,
    },
  },
};
