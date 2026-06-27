/**
 * Minimal Jest configuration for component and accessibility tests.
 *
 * The Babel transform is declared inline here (with `configFile: false` /
 * `babelrc: false`) so it is scoped to Jest only. This deliberately avoids a
 * root `babel.config.js`, which would override Docusaurus's own Babel preset
 * and break `npm run build`.
 */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      {
        configFile: false,
        babelrc: false,
        presets: [
          ['@babel/preset-env', {targets: {node: 'current'}}],
          ['@babel/preset-react', {runtime: 'automatic'}],
        ],
      },
    ],
  },
  moduleNameMapper: {
    // Docusaurus / CSS modules and plain stylesheets are not needed in unit tests.
    '\\.(css|less|scss|sass)$': '<rootDir>/test/__mocks__/styleMock.js',
    // Static assets resolve to a stub filename.
    '\\.(jpg|jpeg|png|gif|svg|webp|avif|mp4|webm|woff|woff2|ttf|eot)$':
      '<rootDir>/test/__mocks__/fileMock.js',
  },
  testMatch: [
    '**/?(*.)+(test|spec).[jt]s?(x)',
  ],
};
