// pm2 app for the §3.6 services process.
module.exports = {
  apps: [
    {
      name: 'grokbot-services',
      cwd: __dirname,
      script: 'src/index.mjs',
      env: {
        SERVICES_PORT: process.env.SERVICES_PORT ?? 4390,
        SERVICES_HOST: process.env.SERVICES_HOST ?? '127.0.0.1',
        DIST_DIR: process.env.DIST_DIR ?? '../dist',
      },
      autorestart: true,
      max_restarts: 10,
    },
  ],
};
