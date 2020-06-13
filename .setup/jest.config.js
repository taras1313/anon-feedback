// To have consistent date time parsing both in local and CI environments we set
// the timezone of the Node process.
process.env.TZ = 'GMT';

module.exports = {
  displayName: 'test',
  rootDir: '../',
  setupFilesAfterEnv: ['<rootDir>/node_modules/jest-enzyme/lib/index.js'],
  testPathIgnorePatterns: ['node_modules'],
  bail: true,
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  // note: this config have to have in sync with moduleNameMapper in jest.config.server.js
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^.+\\.(gif|ttf|eot|svg|woff|woff2|ico|png|jpg)$': '<rootDir>/.setup/file.stub.js',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['<rootDir>/.setup/jest.setup.js'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/serviceWorker.js',
    '!<rootDir>/src/**/*.container.js',
    '!<rootDir>/src/**/external/**/*.js',
  ],
};
