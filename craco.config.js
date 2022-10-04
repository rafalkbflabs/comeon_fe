const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: { 
              '@gray-1': '#ffffff',
              '@gray-2': '#fafafa',
              '@gray-3': '#f5f5f5',
              '@gray-4': '#f0f0f0',
              '@gray-5': '#d9d9d9',
            },
          },
        },
      },
    },
  ],
};
