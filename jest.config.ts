process.env.TZ = 'UTC';
export default {
  clearMocks: true,
  setupFiles: ['<rootDir>/src/tests/set-env-vars.ts'],
  moduleDirectories: ['src', 'node_modules'],
  coverageProvider: 'babel',
  coverageReporters: ['json', 'text', 'html', 'cobertura', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  maxConcurrency: 10,
  maxWorkers: '50%',
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '~/controllers/(.*)': '<rootDir>/src/adapters/controllers/$1',
    '~/app/(.*)': '<rootDir>/src/app/$1',
    '~/domain/(.*)': '<rootDir>/src/domain/$1',
    '~/infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/.build/', '<rootDir>/node_modules/'],
  testMatch: ['**/?(*.)+(test).+(ts|js)'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        sourceMap: true,
      },
    ],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
};
