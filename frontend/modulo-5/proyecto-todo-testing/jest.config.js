module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/main.jsx'],
  coverageReporters: ['text', 'json-summary'],
};
