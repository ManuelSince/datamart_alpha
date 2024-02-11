export default () => ({
  app_host: process.env.REDIS_HOST,
  app_port: parseInt(process.env.REDIS_PORT, 10) || 6379,
});
