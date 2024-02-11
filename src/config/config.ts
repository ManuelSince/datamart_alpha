export default () => ({
  app_host: process.env.APP_HOST,
  app_port: parseInt(process.env.APP_PORT, 10) || 3000,
});
