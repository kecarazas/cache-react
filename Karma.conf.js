module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: ['src/**/*.spec.js'],
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
              },
            },
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.(png|jpg|gif|svg)$/, type: 'asset/resource' },
        ],
      },
      resolve: { extensions: ['.js', '.jsx'] },
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};