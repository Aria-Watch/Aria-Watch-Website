import React from 'react';
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

/**
 * Smoke test verifying the component + accessibility test tooling is wired up:
 * - Babel transforms JSX (React automatic runtime)
 * - React Testing Library renders and queries the DOM (jsdom)
 * - jest-dom matchers are available
 * - jest-axe runs and its matcher is registered
 *
 * This validates the task 1.2 tooling setup; component-specific assertions live
 * in later tasks.
 */
function Sample() {
  return (
    <main>
      <h1>Aria Watch</h1>
      <button type="button">Get Started</button>
    </main>
  );
}

describe('test tooling', () => {
  test('React Testing Library + jest-dom render and query', () => {
    render(<Sample />);
    expect(
      screen.getByRole('heading', {name: 'Aria Watch'}),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {name: 'Get Started'}),
    ).toBeInTheDocument();
  });

  test('jest-axe accessibility matcher runs', async () => {
    const {container} = render(<Sample />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
