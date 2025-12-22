const path = require('path');
const pak = require('../package.json');

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            // [수정됨] pak.source가 없어서 에러나던 것을 'src'로 직접 연결
            [pak.name]: path.join(__dirname, '../src'),
          },
        },
      ],
    ],
  };
};
