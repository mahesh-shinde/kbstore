module.exports = {
    preset: 'ts-jest',
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '/tests/.*\\.test.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: ['<rootDir>/src/tests/setupTests.ts']
  };