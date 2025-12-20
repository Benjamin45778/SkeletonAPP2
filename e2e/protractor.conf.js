const path = require('path');

exports.config = {
  directConnect: true,
  framework: 'jasmine',
  specs: ['./src/**/*.e2e-spec.ts'],
  baseUrl: 'http://localhost:8100/',
  SELENIUM_PROMISE_MANAGER: false,

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless=new', '--disable-gpu', '--window-size=1280,800']
    }
  },

  onPrepare() {
    require('ts-node').register({
      project: path.join(__dirname, 'tsconfig.e2e.json'),
    });
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
  },
};
