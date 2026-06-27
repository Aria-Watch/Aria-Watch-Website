import React from 'react';
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

/**
 * Automated accessibility / keyboard audit for the Homepage (task 11.2).
 *
 * Validates: Requirements 1.5, 2.4, 4.8, 5.2, 6.7, 7.3, 8.3, 8.4, 11.1, 11.2,
 *            11.3, 11.4, 11.5, 12.5
 *
 * SCOPE OF THIS AUTOMATED CHECK
 * -----------------------------
 * This suite runs the axe-core accessibility engine (via jest-axe) over the
 * rendered Homepage to assert there are no structural a11y violations:
 * image alternatives, link/button accessible names, ARIA usage, heading
 * structure, and document landmarks. It runs in both Light_Mode and Dark_Mode
 * by toggling `data-theme` on the document root before each render.
 *
 * WHAT IS AND IS NOT AUTOMATED HERE
 * ---------------------------------
 * - Structural a11y (alt text, accessible names, ARIA, roles): AUTOMATED below
 *   with axe-core. This is the part axe can evaluate reliably under jsdom.
 * - Color/UI contrast and focus-indicator contrast/thickness (Requirements 1.5,
 *   2.4, 4.8, 5.2, 6.7, 7.3, 8.3, 8.4, 11.1, 11.3): axe-core's `color-contrast`
 *   rule needs a real layout/paint engine (computed geometry + rendered colors)
 *   that jsdom does not provide, so it is DISABLED here to avoid non-
 *   deterministic "incomplete" results. Contrast is instead verified at the
 *   token level by the design-time audit in task 1.3 (every text/background
 *   role pair passes WCAG AA: Light_Mode text #16231c on #f7faf8 >= 12:1, accent
 *   focus ring #0e7490 on #f7faf8 ~4.7:1; Dark_Mode text #e9efea on #121615
 *   ~13:1, accent focus ring #38bdf8 on #121615 ~9:1), and the focus indicator
 *   is specified in src/css/custom.css as a 2px solid outline on the accent role
 *   token with a 2px offset (Requirement 11.1 thickness, 11.3 contrast).
 * - Keyboard reachability/activation and no-focus-trap (Requirements 11.2,
 *   11.4, 11.5): verified below via native-semantics assertions — Docusaurus and
 *   the Homepage emit real <a href> / <button> elements, which carry baseline
 *   Tab / Shift+Tab / Enter (and Space for buttons) support and participate in
 *   the natural tab order with no trap. Navbar and Footer controls are rendered
 *   by the Docusaurus Layout (mocked out here for isolation); their native
 *   anchor/button semantics give them the same baseline keyboard support.
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

// axe-core's color-contrast rule requires a real rendering engine (layout +
// painted colors) that jsdom cannot supply; contrast is verified at the token
// level by the task 1.3 audit instead. All structural rules remain enabled.
const AXE_OPTIONS = {
  rules: {
    'color-contrast': {enabled: false},
  },
};

afterEach(() => {
  document.documentElement.removeAttribute('data-theme');
});

describe('Homepage automated accessibility audit (jest-axe)', () => {
  test('has no structural a11y violations in Light_Mode', async () => {
    document.documentElement.setAttribute('data-theme', 'light');
    const {container} = render(<Home />);

    const results = await axe(container, AXE_OPTIONS);
    expect(results).toHaveNoViolations();
  });

  test('has no structural a11y violations in Dark_Mode', async () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    const {container} = render(<Home />);

    const results = await axe(container, AXE_OPTIONS);
    expect(results).toHaveNoViolations();
  });
});

describe('Homepage keyboard reachability and activation (native semantics)', () => {
  /**
   * Collect the interactive controls present on the Homepage itself. The hero
   * primary/secondary actions and the CTA action are the focusable controls
   * rendered by index.js (the Navbar and Footer controls come from the
   * Docusaurus Layout, mocked out here).
   */
  function getHomepageInteractiveControls() {
    const getStarted = screen.getByRole('link', {name: 'Get Started'});
    const learnMore = screen.getByRole('link', {name: 'Learn More'});
    const cta = screen.getByRole('link', {name: 'Get Involved on GitHub'});
    return {getStarted, learnMore, cta};
  }

  test('hero actions and CTA are native anchors reachable and activatable via keyboard (Requirements 11.2, 11.4)', () => {
    render(<Home />);
    const {getStarted, learnMore, cta} = getHomepageInteractiveControls();

    // Real <a href> elements participate in the native tab order (reachable via
    // Tab / Shift+Tab) and activate on Enter without any custom handling.
    for (const control of [getStarted, learnMore, cta]) {
      expect(control.tagName).toBe('A');
      expect(control).toHaveAttribute('href');
    }

    // Destinations resolve to their configured targets (activation outcome).
    expect(getStarted).toHaveAttribute('href', '/docs');
    expect(learnMore).toHaveAttribute('href', '/about');
    expect(cta).toHaveAttribute('href');
    expect(cta).toHaveAttribute('target', '_blank');
  });

  test('no interactive control distorts the tab order with a positive tabindex (Requirements 11.2, 11.5)', () => {
    const {container} = render(<Home />);

    // A positive tabindex would reorder/trap the natural focus flow. Every
    // focusable control must rely on the document order (no tabindex > 0).
    const positiveTabIndex = Array.from(
      container.querySelectorAll('[tabindex]'),
    ).filter((el) => Number(el.getAttribute('tabindex')) > 0);

    expect(positiveTabIndex).toHaveLength(0);
  });

  test('no Homepage interactive control is removed from the tab order (no focus trap) (Requirement 11.5)', () => {
    render(<Home />);
    const {getStarted, learnMore, cta} = getHomepageInteractiveControls();

    // None of the controls opts out of the tab order (tabindex="-1"), so focus
    // can move both to and away from each one — there is no trap.
    for (const control of [getStarted, learnMore, cta]) {
      expect(control).not.toHaveAttribute('tabindex', '-1');
    }

    // Sanity-check that focus can actually be placed on and moved off a control.
    getStarted.focus();
    expect(document.activeElement).toBe(getStarted);
    cta.focus();
    expect(document.activeElement).toBe(cta);
  });
});
