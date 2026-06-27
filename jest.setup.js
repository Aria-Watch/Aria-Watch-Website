// Extend Jest with DOM matchers (e.g. toBeInTheDocument, toHaveAttribute).
require('@testing-library/jest-dom');

// Extend Jest with the accessibility matcher (toHaveNoViolations) from jest-axe.
const {toHaveNoViolations} = require('jest-axe');
expect.extend(toHaveNoViolations);
