const path = require('path');

module.exports = (options, webpack) => {
  const config = {
    ...options,
    resolve: {
      ...options.resolve,
      alias: {
        ...options.resolve.alias,
        '@endpoints': path.resolve(__dirname, 'src/endpoints'),
        '@shared': path.resolve(__dirname, 'src/shared')
      }
    }
  };
  return config;
};