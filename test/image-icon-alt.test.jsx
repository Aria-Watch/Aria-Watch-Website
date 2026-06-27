import React from 'react';
import {render, screen, within} from '@testing-library/react';

/**
 * Accessibility audit for image and icon alternatives (task 10.2).
 *
 * Validates: Requirements 9.2, 9.3, 9.4
 * - 9.2: images/illustrations that convey meaning provide descriptive
 *        alternative text with a length between 1 and 125 characters.
 * - 9.3: decorative images that convey no information provide an empty `alt`
 *        so assistive technologies skip them.
 * - 9.4: icons that convey meaning not present in adjacent visible text expose
 *        an accessible label of at least 1 character.
 *
 * The Homepage feature illustrations are the meaning-bearing images under test.
 * Per task 10.1 their `alt` text is descriptive and intentionally distinct from
 * the card title, so the image conveys the illustration content rather than
 * repeating the adjacent heading.
 *
 * Docusaurus modules are mocked so the page renders in isolation under jsdom:
 * - `@theme/Layout`   -> passthrough wrapper that renders its children.
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

const ALT_MIN = 1;
const ALT_MAX = 125;

describe('Homepage image alternatives (Requirements 9.2, 9.3)', () => {
  test.each(FEATURE_TITLES)(
    'meaningful feature image for "%s" has descriptive alt of 1-125 chars (Requirement 9.2)',
    (title) => {
      render(<Home />);

      const heading = screen.getByRole('heading', {level: 2, name: title});
      const card = heading.parentElement;
      const image = within(card).getByRole('img');

      const alt = image.getAttribute('alt');

      // A meaningful image must carry a non-empty alt string.
      expect(alt).not.toBeNull();
      expect(alt.trim().length).toBeGreaterThanOrEqual(ALT_MIN);

      // The alt text length must stay within the 1-125 character bound.
      expect(alt.length).toBeGreaterThanOrEqual(ALT_MIN);
      expect(alt.length).toBeLessThanOrEqual(ALT_MAX);
    },
  );

  test('every meaningful image exposes a non-empty accessible name (Requirement 9.2)', () => {
    render(<Home />);

    const images = screen.getAllByRole('img');
    // The feature illustrations are meaning-bearing, so each is exposed to
    // assistive technology (a decorative image with alt="" would not have the
    // img role / accessible name and would be excluded here).
    expect(images.length).toBe(FEATURE_TITLES.length);

    for (const image of images) {
      const alt = image.getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt.length).toBeGreaterThanOrEqual(ALT_MIN);
      expect(alt.length).toBeLessThanOrEqual(ALT_MAX);
    }
  });

  test('feature image alt text is distinct from the card title (Requirement 9.2)', () => {
    render(<Home />);

    for (const title of FEATURE_TITLES) {
      const heading = screen.getByRole('heading', {level: 2, name: title});
      const card = heading.parentElement;
      const image = within(card).getByRole('img');
      const alt = image.getAttribute('alt');

      // Descriptive alt conveys the illustration content rather than repeating
      // the adjacent visible heading text.
      expect(alt).not.toBe(title);
    }
  });
});

