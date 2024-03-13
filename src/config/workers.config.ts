export default {
  host: process.env!.WORKERS_HOST!,
  port: Number(process.env!.WORKERS_PORT!),
  enabledModules: process.env.ENABLED_WORKER_MODULES?.split(';') ?? [],
};
