const path = require('path');
const removeImports = require('next-remove-imports')();
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  removeImports({
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.target = 'electron-renderer';
      }

      if (config?.node) {
        config.node.__dirname = true;
      }

      return config;
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    reactStrictMode: false,
    experimental: { esmExternals: true },
  })
);
