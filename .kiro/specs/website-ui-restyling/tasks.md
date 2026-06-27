# Implementation Plan: Website UI Restyling

## Overview

This plan converts the Aria Watch UI-restyling design into incremental coding steps. Work
is presentational and is delivered through three levers: global design tokens in
`src/css/custom.css` (the Theme_System), theme configuration in `docusaurus.config.js`, and
page/component styles for the Homepage (`src/pages/index.js` + `index.module.css`) and
content pages. Each step builds on the previous one and ends by wiring the surface into the
token-driven theme so there is no orphaned styling.

Because the feature is UI restyling, the design has no Correctness Properties section.
Per the design's Testing Strategy, verification uses example/component tests, automated
accessibility/contrast audits, and the production build as the primary automated gate.
Test sub-tasks are marked optional with `*`.

## Tasks

- [x] 1. Establish Theme_System tokens and test tooling
  - [x] 1.1 Define the design-token layer in `src/css/custom.css`
    - Define Color_Palette role tokens (`--aw-color-primary`, `--aw-color-accent`, `--aw-color-surface`, `--aw-color-background`, `--aw-color-text`) under `:root` (Light_Mode) and `[data-theme='dark']` (Dark_Mode), exactly one value per role per mode
    - Map the role tokens onto the corresponding `--ifm-*` variables so navbar, footer, and content surfaces inherit them
    - Retain the existing heading/body/mono font-family tokens (Space Grotesk / Inter / JetBrains Mono) and apply heading font to headings and body font to non-heading text site-wide
    - Add a spacing scale (`--aw-space-1`…`--aw-space-5`, ≥4 steps) and a radius scale (`--aw-radius-sm/md/lg`, ≥3 steps)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2_
  - [x] 1.2 Set up component and accessibility test tooling
    - Add Jest, React Testing Library, and jest-axe as dev dependencies pinned to exact versions (no `^`/`~`/`>`/`*`) in `package.json`, with a `test` script
    - Add a minimal Jest/Babel config compatible with the Docusaurus/React 19 setup
    - _Requirements: 12.3_
  - [x] 1.3 Audit token contrast pairs against WCAG AA
    - Verify each text/background role pair (Light_Mode and Dark_Mode) computes ≥4.5:1 for normal text and ≥3:1 for large text/meaningful UI elements; adjust token values until they pass
    - _Requirements: 1.5, 1.6, 2.4_

- [x] 2. Configure Docusaurus theme behavior in `docusaurus.config.js`
  - [x] 2.1 Set color mode, syntax themes, navbar, and footer configuration
    - Set `themeConfig.colorMode = { defaultMode: 'light', disableSwitch: false, respectPrefersColorScheme: false }` so the site defaults to Light_Mode and persists/restores the selected mode
    - Confirm `prism.theme` (light) and `prism.darkTheme` (dark) are set to the two chosen high-contrast themes
    - Verify navbar shows the five items in order About, Blog, Docs, App, API plus GitHub and Instagram external links
    - Verify footer declares the Docs, Community, and More link groups (each a heading + ≥1 link) and a copyright containing "Aria Watch" and the current year via `new Date().getFullYear()`
    - _Requirements: 2.5, 2.6, 2.7, 6.1, 6.3, 7.1, 7.2, 8.2_

- [x] 3. Restyle the Hero_Section (`src/pages/index.js`, `src/pages/index.module.css`)
  - [x] 3.1 Implement the token-driven hero
    - Render title, tagline, exactly one primary control ("Get Started" → `/docs`) and one secondary control ("Learn More" → `/about`), all visible without scrolling at load
    - Drive text and button colors from tokens so title/tagline/controls meet ≥4.5:1 contrast in both modes over the hero background (apply a gradient overlay on the background image)
    - Differentiate primary vs. secondary controls by ≥2 visual attributes with ≥3:1 contrast between them
    - Ensure mobile (≤480px) layout has no horizontal overflow and no clipping/truncation, and interactive targets are ≥44×44px with non-overlapping touch areas
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 10.4, 10.5_
  - [x] 3.2 Write component test for the hero
    - Assert the hero renders title, tagline, exactly one primary and one secondary control, primary links to `/docs` and secondary to `/about`
    - _Requirements: 3.1, 3.5, 3.6_

- [x] 4. Restyle the Feature_Cards (`src/pages/index.js`, `src/pages/index.module.css`)
  - [x] 4.1 Implement token-driven feature cards and responsive grid
    - Render each card with exactly one image/icon, one title, one description; apply uniform padding and corner radius drawn from the spacing/radius scales
    - Add a hover state (elevation/scale/background/border change) that applies within ≤200ms and reverts on pointer leave
    - Implement the responsive grid: single column at mobile (no overflow), multi-column equal-height at tablet, single equal-height row at desktop (flexbox `align-items: stretch` + media queries)
    - Ensure card title/description text meets ≥4.5:1 contrast against the card background in both modes
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 10.1, 10.2, 10.3_
  - [x] 4.2 Write component test for a feature card
    - Assert each card renders exactly one image/icon, one title, and one description
    - _Requirements: 4.1_

- [x] 5. Restyle the CTA_Section (`src/pages/index.js`, `src/pages/index.module.css`)
  - [x] 5.1 Implement the CTA with disabled-state handling
    - Render a non-empty heading, supporting text, and a single action control linking to the contribution destination, opening in a new tab with `rel="noopener noreferrer"`
    - Drive colors from tokens so heading/text/control meet WCAG AA contrast in both modes
    - Add a visible focus indicator meeting AA contrast against the adjacent background
    - When the contribution destination is empty/unset, render the control disabled (no `href`, `aria-disabled="true"`) and indicate unavailability
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  - [x] 5.2 Write component test for the CTA
    - Assert the CTA renders heading, supporting text, and an action control with `target="_blank"` + `rel="noopener noreferrer"`, and renders the disabled state when the destination is empty
    - _Requirements: 5.1, 5.3, 5.5_

- [x] 6. Checkpoint - Homepage review
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Restyle the Navbar styling (`src/css/custom.css`)
  - [x] 7.1 Apply token-driven navbar styles
    - Style navbar hover and keyboard-focus states from tokens; focus indicator meets AA contrast against the navbar background
    - Ensure items/icons meet AA contrast against the navbar background in both modes, the logo links home, and mobile (≤480px) shows all items via the Docusaurus mobile menu with no horizontal overflow
    - _Requirements: 6.2, 6.4, 6.5, 6.6, 6.7_

- [x] 8. Restyle the Footer styling (`src/css/custom.css`)
  - [x] 8.1 Apply token-driven footer styles
    - Style footer text, headings, and links from tokens to meet AA contrast in both modes, with an observable hover state on links
    - Ensure responsive layout: single vertical column at 320–480px (no horizontal scroll), horizontal row at desktop (no horizontal scroll)
    - _Requirements: 7.3, 7.4, 7.5, 7.6_

- [x] 9. Restyle Content_Pages and global focus indicators
  - [x] 9.1 Audit and align content-page styling (`src/pages/api.js`, `src/pages/api.module.css`, `src/pages/about.mdx`, `src/pages/privacy.md`)
    - Replace any hard-coded theme colors in `api.module.css` with Theme_System tokens so headings, body, links, and code use the palette/typography
    - Ensure content main area has no horizontal overflow at mobile
    - _Requirements: 8.1, 8.6_
  - [x] 9.2 Add global focus-indicator styling in `src/css/custom.css`
    - Define a focus indicator that surrounds/adjoins interactive elements, is ≥2px thick, visually distinct, and meets AA contrast against the adjacent background
    - _Requirements: 11.1, 11.3_
  - [x] 9.3 Verify content theme parity and code contrast
    - Toggle modes and confirm headings/body/links/code re-render with the active palette and syntax theme within 300ms without reload; confirm inline/code-block text meets ≥4.5:1 against the code background in both modes
    - _Requirements: 2.3, 8.3, 8.4, 8.5_

- [x] 10. Iconography and imagery (`src/pages/index.js` and other surfaces using icons/images)
  - [x] 10.1 Apply Icon_Set usage and image alternative text
    - Use icons exclusively from the Icon_Set (FontAwesome / react-icons) for nav items, feature highlights, and affordances
    - Give meaningful images descriptive `alt` (1–125 chars), decorative images `alt=""`, and meaning-bearing icons an accessible label; apply `object-fit` to preserve aspect ratio and reserve container space so a failed load shows alt text without reflow/overlap
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 12.5_
  - [x] 10.2 Write tests/audit for image and icon alternatives
    - Assert meaningful images have 1–125 char `alt`, decorative images have empty `alt`, and meaning-bearing icons expose an accessible label
    - _Requirements: 9.2, 9.3, 9.4_

- [x] 11. Integration, build, and accessibility verification
  - [x] 11.1 Run the production build as the primary gate
    - Run `npm run build` and require a zero exit status with no error-level output; rely on `onBrokenLinks: 'throw'` as the broken-link/asset check (build halts and leaves prior output unchanged on failure)
    - _Requirements: 12.1, 12.2, 12.4_
  - [x] 11.2 Run automated accessibility, contrast, and keyboard audits
    - Run an automated a11y/contrast checker (axe/jest-axe/pa11y/Lighthouse) on the Homepage and a representative Content_Page in both modes; verify text/UI contrast and focus-indicator contrast/thickness
    - Verify keyboard reachability and activation (Tab/Shift+Tab/Enter/Space) for navbar items, hero actions, feature-card links, CTA action, and footer links, with no focus trap
    - _Requirements: 1.5, 2.4, 4.8, 5.2, 6.7, 7.3, 8.3, 8.4, 11.1, 11.2, 11.3, 11.4, 11.5, 12.5_

- [x] 12. Final checkpoint - Ensure build passes
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional (component tests and accessibility/contrast audits) and can be skipped for a faster MVP; the production build in 11.1 is the minimum automated gate.
- This feature has no Correctness Properties section in the design, so there are no property-based test tasks; verification relies on example/component tests, accessibility audits, and the build gate per the design's Testing Strategy.
- Each task references specific requirement clauses for traceability.
- Theme switching, persistence, the mobile menu, routing, and link semantics are provided by Docusaurus and are configured (task 2.1) rather than reimplemented.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "2.1", "3.1", "9.1"] },
    { "id": 2, "tasks": ["1.3", "4.1", "7.1", "3.2"] },
    { "id": 3, "tasks": ["5.1", "8.1", "4.2"] },
    { "id": 4, "tasks": ["9.2", "10.1", "5.2"] },
    { "id": 5, "tasks": ["9.3", "10.2", "11.1"] },
    { "id": 6, "tasks": ["11.2"] }
  ]
}
```
