// pm2 app for the upvotes P1 local-only service.
module.exports = {
  apps: [
    {
      name: 'grokbot-votes-api',
      cwd: __dirname,
      script: 'dist/src/index.js',
      interpreter: 'node',
      env: {
        NODE_ENV: 'production',
        VOTES_HOST: process.env.VOTES_HOST ?? '127.0.0.1',
        VOTES_PORT: process.env.VOTES_PORT ?? '4391',
      },
      node_args: ['--env-file=.env'],
      autorestart: true,
      max_restarts: 10,
    },
  ],
};
