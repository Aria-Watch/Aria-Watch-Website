import React from 'react';
import {render, screen, within} from '@testing-library/react';

/**
 * Component test for the Homepage Hero_Section (task 3.2).
 *
 * Validates: Requirements 3.1, 3.5, 3.6
 * - 3.1: hero renders the title, tagline, exactly one primary control, and
 *        exactly one secondary control.
 * - 3.5: the primary control links to the Docs entry page (`/docs`).
 * - 3.6: the secondary control links to the About page (`/about`).
 *
 * Docusaurus modules are mocked so the page renders in isolation under jsdom:
 * - `@theme/Layout` -> passthrough wrapper that renders its children.
 * - `@docusaurus/Link` -> anchor that maps the `to` prop onto `href`.
 */

jest.mock(
  '@theme/Layout',
  () => ({
    __esModule: true,
    default: ({children}) => <div data-testid="layout">{children}</div>,
  }),
  {virtual: true},
);

jest.mock(
  '@docusaurus/Link',
  () => ({
    __esModule: true,
    default: ({to, href, children, ...rest}) => (
      <a href={to || href} {...rest}>
        {children}
      </a>
    ),
  }),
  {virtual: true},
);

// Imported after the mocks are registered.
import Home from '../src/pages/index.js';

describe('Homepage Hero_Section', () => {
  test('renders the title and tagline (Requirement 3.1)', () => {
    render(<Home />);

    // Title
    expect(
      screen.getByRole('heading', {level: 1, name: 'Aria Watch'}),
    ).toBeInTheDocument();

    // Tagline (rendered across a <br>, so match on its parts)
    expect(screen.getByText(/Know what you breathe\./)).toBeInTheDocument();
    expect(screen.getByText(/Act for the planet\./)).toBeInTheDocument();
  });

  test('renders exactly one primary and one secondary control (Requirement 3.1)', () => {
    render(<Home />);

    const primaryLinks = screen.getAllByRole('link', {name: 'Get Started'});
    const secondaryLinks = screen.getAllByRole('link', {name: 'Learn More'});

    expect(primaryLinks).toHaveLength(1);
    expect(secondaryLinks).toHaveLength(1);
  });

  test('primary control links to the Docs entry page (Requirement 3.5)', () => {
    render(<Home />);

    const primary = screen.getByRole('link', {name: 'Get Started'});
    expect(primary).toHaveAttribute('href', '/docs');
  });

  test('secondary control links to the About page (Requirement 3.6)', () => {
    render(<Home />);

    const secondary = screen.getByRole('link', {name: 'Learn More'});
    expect(secondary).toHaveAttribute('href', '/about');
  });

  test('primary and secondary controls are distinct elements (Requirement 3.1)', () => {
    render(<Home />);

    const primary = screen.getByRole('link', {name: 'Get Started'});
    const secondary = screen.getByRole('link', {name: 'Learn More'});

    expect(primary).not.toBe(secondary);
    // Both controls share a common hero buttons container.
    const container = primary.parentElement;
    expect(within(container).getByText('Learn More')).toBeInTheDocument();
  });
});
