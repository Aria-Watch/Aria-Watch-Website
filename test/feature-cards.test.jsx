import React from 'react';
import {render, screen, within} from '@testing-library/react';

/**
 * Component test for the Homepage Feature_Cards (task 4.2).
 *
 * Validates: Requirements 4.1
 * - 4.1: each Feature_Card renders exactly one illustration/icon, exactly one
 *        title, and exactly one description.
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

// The three feature cards defined on the Homepage, matched by their titles.
const FEATURE_TITLES = [
  'Open Hardware Devices',
  'Global Data Network',
  'Community Collaboration',
];

describe('Homepage Feature_Cards', () => {
  test('renders one card per defined feature (Requirement 4.1)', () => {
    render(<Home />);

    for (const title of FEATURE_TITLES) {
      expect(
        screen.getByRole('heading', {level: 2, name: title}),
      ).toBeInTheDocument();
    }
  });

  test.each(FEATURE_TITLES)(
    'card "%s" renders exactly one image, one title, and one description (Requirement 4.1)',
    (title) => {
      render(<Home />);

      // Locate the card via its title heading, then walk up to the card root.
      const heading = screen.getByRole('heading', {level: 2, name: title});
      const card = heading.parentElement;

      // Exactly one image/icon.
      const images = within(card).getAllByRole('img');
      expect(images).toHaveLength(1);

      // Exactly one title (the level-2 heading) bearing the feature name.
      const titles = within(card).getAllByRole('heading', {level: 2});
      expect(titles).toHaveLength(1);
      expect(titles[0]).toHaveTextContent(title);

      // Exactly one description paragraph, and it is non-empty.
      const paragraphs = card.querySelectorAll('p');
      expect(paragraphs).toHaveLength(1);
      expect(paragraphs[0].textContent.trim().length).toBeGreaterThan(0);
    },
  );

  test('each card image has a non-empty accessible name of 1-125 chars distinct from its title (Requirement 9.2)', () => {
    render(<Home />);

    for (const title of FEATURE_TITLES) {
      const heading = screen.getByRole('heading', {level: 2, name: title});
      const card = heading.parentElement;
      const image = within(card).getByRole('img');
      const alt = image.getAttribute('alt');

      // Per task 10.1 the alt text is descriptive and intentionally distinct
      // from the card title (Requirement 9.2): it must be a non-empty string of
      // 1-125 characters, but it is not required to equal the title.
      expect(alt).not.toBeNull();
      expect(alt.trim().length).toBeGreaterThanOrEqual(1);
      expect(alt.length).toBeLessThanOrEqual(125);
      expect(alt).not.toBe(title);
    }
  });
});
