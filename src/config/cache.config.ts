export default () => ({
  redis_host: process.env.REDIS_HOST,
  redis_port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  redis_pwd: process.env.REDIS_PASSWORD,
});
