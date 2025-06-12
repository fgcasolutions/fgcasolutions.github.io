module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/packages'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: 'coverage'
};
