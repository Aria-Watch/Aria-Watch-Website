import React from 'react';
import {render, screen, within} from '@testing-library/react';

/**
 * Component test for the Homepage CTA_Section (task 5.2).
 *
 * Validates: Requirements 5.1, 5.3, 5.5
 * - 5.1: the CTA renders a non-empty heading, non-empty supporting text, and a
 *        single action control that links to the contribution destination.
 * - 5.3: when activated, the action control opens the destination in a new
 *        browser tab (`target="_blank"`) while retaining the current tab
 *        safely (`rel="noopener noreferrer"`).
 * - 5.5: when the destination is empty/unset, the control renders in a disabled,
 *        non-activatable state (no `href`, `aria-disabled="true"`) and the
 *        visitor is told the action is unavailable.
 *
 * Docusaurus modules are mocked so the page renders in isolation under jsdom:
 * - `@theme/Layout`  -> passthrough wrapper that renders its children.
 * - `@docusaurus/Link` -> anchor that maps the `to` prop onto `href`.
 *
 * The contribution destination is a single configured value sourced from
 * `src/contributionUrl.js`. Because it is its own module, the disabled branch
 * (Requirement 5.5) can be exercised by mocking that module with an empty value
 * and re-importing the page inside an isolated module registry.
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

const CTA_HEADING = 'Join the Movement';
const CTA_ACTION_LABEL = 'Get Involved on GitHub';

/**
 * Render the Homepage with a specific CONTRIBUTION_URL value by mocking the
 * contribution-destination module before re-importing the page in an isolated
 * registry. This lets each test exercise either the enabled or disabled branch.
 */
function renderHomeWithContributionUrl(url) {
  let Home;
  jest.isolateModules(() => {
    jest.doMock('../src/contributionUrl', () => ({
      __esModule: true,
      CONTRIBUTION_URL: url,
    }));
    // eslint-disable-next-line global-require
    Home = require('../src/pages/index.js').default;
  });
  return render(<Home />);
}

afterEach(() => {
  jest.resetModules();
});

describe('Homepage CTA_Section', () => {
  describe('enabled state (destination configured)', () => {
    test('renders a non-empty heading and supporting text (Requirement 5.1)', () => {
      renderHomeWithContributionUrl(
        'https://github.com/Aria-Watch/Aria-Watch-Borino-PCB',
      );

      const heading = screen.getByRole('heading', {level: 2, name: CTA_HEADING});
      expect(heading).toBeInTheDocument();
      expect(heading.textContent.trim().length).toBeGreaterThan(0);

      expect(
        screen.getByText(/Contribute, build, and make a difference/i),
      ).toBeInTheDocument();
    });

    test('renders a single action control linking to the destination (Requirement 5.1)', () => {
      renderHomeWithContributionUrl(
        'https://github.com/Aria-Watch/Aria-Watch-Borino-PCB',
      );

      const actions = screen.getAllByRole('link', {name: CTA_ACTION_LABEL});
      expect(actions).toHaveLength(1);
      expect(actions[0]).toHaveAttribute(
        'href',
        'https://github.com/Aria-Watch/Aria-Watch-Borino-PCB',
      );
    });

    test('action control opens in a new tab safely (Requirement 5.3)', () => {
      renderHomeWithContributionUrl(
        'https://github.com/Aria-Watch/Aria-Watch-Borino-PCB',
      );

      const action = screen.getByRole('link', {name: CTA_ACTION_LABEL});
      expect(action).toHaveAttribute('target', '_blank');
      expect(action).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('does not show the unavailable message (Requirement 5.5)', () => {
      renderHomeWithContributionUrl(
        'https://github.com/Aria-Watch/Aria-Watch-Borino-PCB',
      );

      expect(
        screen.queryByText(/contribution link is currently unavailable/i),
      ).not.toBeInTheDocument();
    });
  });

  describe('disabled state (destination empty/unset)', () => {
    test('renders the action control disabled and non-activatable (Requirement 5.5)', () => {
      renderHomeWithContributionUrl('');

      const disabledControl = screen.getByText(CTA_ACTION_LABEL);

      // The disabled control keeps the link role for assistive technology but
      // is marked disabled and exposes no destination, so it cannot be
      // activated (no navigation occurs).
      expect(disabledControl).toHaveAttribute('aria-disabled', 'true');
      expect(disabledControl).not.toHaveAttribute('href');
      expect(disabledControl).not.toHaveAttribute('target');
      // It is rendered as a non-navigable element rather than an anchor.
      expect(disabledControl.tagName).not.toBe('A');
    });

    test('indicates to the visitor that the action is unavailable (Requirement 5.5)', () => {
      renderHomeWithContributionUrl('');

      expect(
        screen.getByText(/contribution link is currently unavailable/i),
      ).toBeInTheDocument();
    });

    test('still renders the heading and supporting text (Requirement 5.1)', () => {
      renderHomeWithContributionUrl('');

      expect(
        screen.getByRole('heading', {level: 2, name: CTA_HEADING}),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Contribute, build, and make a difference/i),
      ).toBeInTheDocument();
    });
  });
});
