module.exports = {
    apps: [
        {
            name: 'API',
            instances: 4,
            script: 'server.js',
            watch: '.',
            watch_delay: 1000,
            ignore_watch: ['node_modules', 'public', 'uploads', 'logs'],
        },
    ],

    deploy: {
        production: {
            user: 'SSH_USERNAME',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy':
                'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': '',
        },
    },
};
