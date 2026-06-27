# Requirements Document

## Introduction

This feature delivers a complete graphic and user-interface restyling of the Aria Watch website, a Docusaurus 3.7.0 static site for an open-hardware, crowdsourced air-quality monitoring project (tagline: "Breathe the truth"). The goal is a modern, polished, visually appealing presentation that reinforces the brand's environmental and open-source identity across every page and surface, in both light and dark themes, on desktop and mobile.

The restyling covers the global theme (color palette, typography, spacing), the homepage (hero, feature cards, call-to-action), the navbar and footer, content pages (Docs, Blog, About, API, Privacy), iconography and imagery, responsive layout, and accessibility. The work builds on the existing stack (Docusaurus classic preset, React 19, Infima, FontAwesome, react-icons) and may introduce additional libraries where they improve the result, provided the site continues to build and serve correctly.

The scope of this feature is visual and presentational. It does not change site content, information architecture, routing, or backend behavior except where required to render the restyled UI.

## Glossary

- **Website**: The Aria Watch Docusaurus static site as a whole.
- **Theme_System**: The set of global CSS custom properties, fonts, and overrides defined in `src/css/custom.css` that control site-wide appearance.
- **Color_Palette**: The defined set of brand and semantic colors applied across the Website, including primary, accent, surface, text, and state colors for both light and dark modes.
- **Light_Mode**: The Website appearance when `data-theme` is `light`.
- **Dark_Mode**: The Website appearance when `data-theme` is `dark`.
- **Homepage**: The landing page rendered by `src/pages/index.js`.
- **Hero_Section**: The top banner area of the Homepage containing the title, subtitle, and primary action buttons.
- **Feature_Cards**: The set of highlighted capability cards on the Homepage.
- **CTA_Section**: The "Join the Movement" call-to-action area of the Homepage.
- **Navbar**: The site-wide top navigation bar configured in `docusaurus.config.js` and styled in `src/css/custom.css`.
- **Footer**: The site-wide footer configured in `docusaurus.config.js`.
- **Content_Pages**: The Docs, Blog, About, API, and Privacy pages rendered with Docusaurus layouts.
- **Icon_Set**: The collection of icons used across the Website, sourced from FontAwesome and/or react-icons.
- **Breakpoint_Mobile**: A viewport width of 480 pixels or less.
- **Breakpoint_Tablet**: A viewport width between 481 and 996 pixels.
- **Breakpoint_Desktop**: A viewport width of 997 pixels or more.
- **WCAG_AA_Contrast**: A text contrast ratio of at least 4.5:1 for normal text and at least 3:1 for large text and meaningful non-text UI elements, per WCAG 2.1 Level AA.
- **Build_Process**: The Docusaurus production build invoked by `npm run build`.

## Requirements

### Requirement 1: Modern Global Visual Theme

**User Story:** As a visitor, I want a cohesive modern visual theme across the site, so that the Website looks professional and trustworthy.

#### Acceptance Criteria

1. THE Theme_System SHALL define a Color_Palette that specifies exactly one color value for each of the following roles: primary, accent, surface, background, and text, for each of Light_Mode and Dark_Mode.
2. WHEN the Navbar, Footer, Homepage, or any Content_Page is rendered, THE Theme_System SHALL apply the Color_Palette role values defined for the active mode such that no role on that surface uses a color value other than the single value defined for that role.
3. THE Theme_System SHALL define exactly one heading typeface and exactly one body typeface, and apply the heading typeface to all heading text and the body typeface to all non-heading text across the Website.
4. THE Theme_System SHALL define a spacing scale of at least 4 discrete step values and a border-radius scale of at least 3 discrete step values, and SHALL apply spacing and border-radius values drawn only from those scales to all cards, buttons, and section containers.
5. WHERE a UI surface displays text over a colored or image background, THE Theme_System SHALL render that text at a contrast ratio of at least 4.5:1 for text smaller than 24px (or smaller than 18.66px if bold) and at least 3:1 for larger text, measured against the effective background color behind the text.
6. IF a text element on any UI surface resolves to a contrast ratio below the threshold defined in criterion 5, THEN THE Theme_System SHALL apply the text role color value defined for the active mode that satisfies that threshold against the effective background.

### Requirement 2: Light and Dark Mode Parity

**User Story:** As a visitor, I want both light and dark modes to look polished, so that I can use my preferred theme without a degraded experience.

#### Acceptance Criteria

1. WHILE the Website is in Light_Mode, THE Theme_System SHALL render all pages using only the Light_Mode Color_Palette for backgrounds, text, and interactive controls.
2. WHILE the Website is in Dark_Mode, THE Theme_System SHALL render all pages using only the Dark_Mode Color_Palette for backgrounds, text, and interactive controls.
3. WHEN a visitor toggles the theme, THE Theme_System SHALL update the displayed colors of the current page to match the selected mode within 300 milliseconds without reloading the page.
4. WHILE the Website is in Light_Mode or Dark_Mode, THE Theme_System SHALL render normal-size text at a contrast ratio of at least 4.5:1 and large-scale text (at least 18pt, or 14pt bold) and meaningful UI elements at a contrast ratio of at least 3:1 against their backgrounds.
5. WHEN a visitor changes pages or reloads the Website after selecting a mode, THE Theme_System SHALL render the page using the most recently selected mode.
6. WHEN a visitor opens the Website for the first time with no previously stored mode selection, THE Theme_System SHALL render the page using Light_Mode as the default mode.
7. IF a stored mode selection is missing or is not one of Light_Mode or Dark_Mode, THEN THE Theme_System SHALL render the page using Light_Mode as the default mode and replace the stored selection with the default mode.

### Requirement 3: Restyled Homepage Hero

**User Story:** As a first-time visitor, I want an attractive hero section, so that I immediately understand what Aria Watch is and what to do next.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the Website title, the project tagline, exactly one primary action control, and exactly one secondary action control, with all four elements visible without scrolling at page load.
2. WHILE the Website is in Light_Mode, THE Hero_Section SHALL render its title, tagline, primary action control, and secondary action control text at a contrast ratio of at least 4.5:1 against their immediate background.
3. WHILE the Website is in Dark_Mode, THE Hero_Section SHALL render its title, tagline, primary action control, and secondary action control text at a contrast ratio of at least 4.5:1 against their immediate background.
4. THE Hero_Section SHALL render the primary action control and the secondary action control with at least two distinct visual attributes (background fill, border, or text color) so that they are visually distinguishable, with a contrast ratio of at least 3:1 between the primary control and the secondary control.
5. WHEN a visitor activates the primary action control via pointer click or keyboard (Enter or Space while focused), THE Website SHALL navigate to the Docs entry page.
6. WHEN a visitor activates the secondary action control via pointer click or keyboard (Enter or Space while focused), THE Website SHALL navigate to the About page.
7. WHILE the viewport is at Breakpoint_Mobile, THE Hero_Section SHALL display its title, tagline, primary action control, and secondary action control without horizontal overflow and without clipping or truncating any of these elements.

### Requirement 4: Restyled Feature Cards

**User Story:** As a visitor, I want clear visual feature cards, so that I can quickly grasp the project's key capabilities.

#### Acceptance Criteria

1. THE Homepage SHALL display each Feature_Card containing exactly one illustration or icon, exactly one title, and exactly one description.
2. THE Homepage SHALL apply to every Feature_Card the same inner padding and corner radius values, both drawn from the Theme_System spacing and border-radius scales.
3. WHEN a visitor moves a pointing-device pointer over a Feature_Card, THE Homepage SHALL apply an observable hover state (a visible change in the card's background, border, elevation, or scale) to that card within 200 milliseconds.
4. WHEN the pointer leaves a Feature_Card that is in the hover state, THE Homepage SHALL revert that card to its non-hover state within 200 milliseconds.
5. WHILE the viewport width is at Breakpoint_Mobile, THE Homepage SHALL stack the Feature_Cards in a single column with no horizontal overflow beyond the viewport width.
6. WHILE the viewport width is at Breakpoint_Tablet, THE Homepage SHALL arrange the Feature_Cards in a multi-column grid in which all cards in the same row share equal height.
7. WHILE the viewport width is at Breakpoint_Desktop, THE Homepage SHALL arrange all Feature_Cards in a single horizontal row in which every card shares equal height.
8. THE Homepage SHALL render each Feature_Card's title and description text with a contrast ratio of at least 4.5:1 against the card background in both Light_Mode and Dark_Mode.

### Requirement 5: Restyled Call-to-Action Section

**User Story:** As a potential contributor, I want a prominent call-to-action, so that I know how to get involved.

#### Acceptance Criteria

1. THE CTA_Section SHALL display a non-empty heading, non-empty supporting text, and a single action control that links to the project contribution destination.
2. THE CTA_Section SHALL render its heading, supporting text, and action control at WCAG_AA_Contrast against their background in both Light_Mode and Dark_Mode.
3. WHEN a visitor activates the CTA_Section action control via pointer or keyboard, THE Website SHALL open the project contribution destination in a new browser tab while retaining the current tab on the originating page.
4. WHILE the CTA_Section action control has keyboard focus, THE CTA_Section SHALL display a visible focus indicator that meets WCAG_AA_Contrast against its adjacent background.
5. IF the project contribution destination is not configured or resolves to an empty value, THEN THE CTA_Section SHALL render the action control in a disabled state that cannot be activated and SHALL indicate to the visitor that the action is unavailable.

### Requirement 6: Restyled Navbar

**User Story:** As a visitor, I want a clean and modern navigation bar, so that I can move between sections easily.

#### Acceptance Criteria

1. THE Navbar SHALL display the Website logo and exactly five navigation items labeled About, Blog, Docs, App, and API, in that left-to-right order.
2. WHEN a visitor activates the Website logo, THE Navbar SHALL navigate the visitor to the Website home page.
3. THE Navbar SHALL display the external links for GitHub and Instagram using icons from the Icon_Set, and WHEN a visitor activates either external link, THE Navbar SHALL open the corresponding destination in a new browser tab.
4. WHEN a visitor hovers over a Navbar item using a pointing device, THE Navbar SHALL apply a hover state that changes at least one observable visual property (color, background, or underline) of that item within 200 milliseconds, and SHALL revert that item to its default appearance when the pointer leaves the item.
5. WHEN a Navbar item receives keyboard focus, THE Navbar SHALL display a visible focus indicator on that item that renders at WCAG_AA_Contrast against the adjacent Navbar background.
6. WHILE the viewport width is at or below Breakpoint_Mobile, THE Navbar SHALL make all navigation items and external links available through the Docusaurus mobile menu with zero horizontal overflow (no horizontal scrollbar on the Navbar container).
7. THE Navbar SHALL render its items and icons at WCAG_AA_Contrast against the Navbar background in both Light_Mode and Dark_Mode.

### Requirement 7: Restyled Footer

**User Story:** As a visitor, I want an organized footer, so that I can find secondary links and project information.

#### Acceptance Criteria

1. THE Footer SHALL display the Docs, Community, and More link groups, and each group SHALL display a group heading label and at least one link.
2. THE Footer SHALL display a copyright notice that contains the name "Aria Watch" and the current four-digit year.
3. THE Footer SHALL render its text, group headings, and links at WCAG_AA_Contrast against the Footer background in both Light_Mode and Dark_Mode.
4. WHILE the viewport is at any width from 320 to 480 CSS pixels (Breakpoint_Mobile), THE Footer SHALL arrange its link groups in a single vertical column and SHALL render them without horizontal scrolling.
5. WHILE the viewport is at Breakpoint_Desktop, THE Footer SHALL arrange its link groups in a horizontal row and SHALL render them without horizontal scrolling.
6. WHEN a visitor hovers over a Footer link using a pointing device, THE Footer SHALL apply a visual hover state to that link.

### Requirement 8: Restyled Content Pages

**User Story:** As a reader, I want the Docs, Blog, About, API, and Privacy pages to match the new theme, so that the experience feels consistent.

#### Acceptance Criteria

1. THE Content_Pages (Docs, Blog, About, API, and Privacy) SHALL render headings, body text, links, and code blocks using the Theme_System typography and Color_Palette.
2. THE Content_Pages SHALL render inline code and code blocks using one syntax-highlighting theme while Light_Mode is active and one syntax-highlighting theme while Dark_Mode is active.
3. THE Content_Pages SHALL render their primary text content at WCAG_AA_Contrast (contrast ratio of at least 4.5:1 for normal text and at least 3:1 for text at 18pt or 14pt bold and larger) against the page background in both Light_Mode and Dark_Mode.
4. THE Content_Pages SHALL render inline code and code block text at WCAG_AA_Contrast (contrast ratio of at least 4.5:1) against the code background in both Light_Mode and Dark_Mode.
5. WHEN the active mode is switched between Light_Mode and Dark_Mode, THE Content_Pages SHALL re-render headings, body text, links, and code blocks using the Color_Palette and syntax-highlighting theme corresponding to the newly active mode.
6. WHILE the viewport width is at or below Breakpoint_Mobile, THE Content_Pages SHALL render their main content without horizontal overflow, such that no horizontal scrollbar appears and no content extends beyond the viewport width.

### Requirement 9: Iconography and Imagery

**User Story:** As a visitor, I want meaningful icons and imagery, so that the Website feels vibrant and easy to scan.

#### Acceptance Criteria

1. THE Website SHALL render icons drawn exclusively from the Icon_Set for navigation items, feature highlights, and action affordances.
2. WHERE an image or illustration conveys meaning, THE Website SHALL provide alternative text that describes the image content, with a length between 1 and 125 characters.
3. WHERE an image is decorative and conveys no information, THE Website SHALL provide alternative text consisting of an empty string so that assistive technologies skip the image.
4. WHERE an icon conveys meaning not present in adjacent visible text, THE Website SHALL provide an accessible label of at least 1 character that conveys the icon's meaning.
5. WHEN an image or illustration is rendered within its container, THE Website SHALL scale the image to fit the container's bounds while preserving its original aspect ratio with no stretching or compression.
6. IF an image or illustration fails to load, THEN THE Website SHALL display its alternative text and SHALL retain the layout space allocated to the image without overlapping adjacent content.

### Requirement 10: Responsive Layout

**User Story:** As a mobile visitor, I want the Website to adapt to my screen, so that I can read and navigate comfortably.

#### Acceptance Criteria

1. WHILE the viewport is at Breakpoint_Mobile, THE Website SHALL render the Homepage and each Content_Page such that the rendered content width does not exceed the viewport width and no horizontal scrollbar is presented.
2. WHILE the viewport is at Breakpoint_Tablet, THE Website SHALL render the Homepage and each Content_Page such that the rendered content width does not exceed the viewport width and no horizontal scrollbar is presented.
3. WHILE the viewport is at Breakpoint_Desktop, THE Website SHALL render the Homepage and each Content_Page such that the rendered content width does not exceed the viewport width and no horizontal scrollbar is presented.
4. WHILE the viewport is at Breakpoint_Mobile, THE Website SHALL render each interactive target in the Navbar, Hero_Section, Feature_Cards, and CTA_Section at a minimum size of 44 by 44 CSS pixels.
5. WHILE the viewport is at Breakpoint_Mobile, THE Website SHALL render each interactive target in the Navbar, Hero_Section, Feature_Cards, and CTA_Section with no overlap between the touch areas of adjacent interactive targets.

### Requirement 11: Accessibility of Interactive Elements

**User Story:** As a keyboard or assistive-technology user, I want interactive elements to be perceivable and operable, so that I can use the Website without a mouse.

#### Acceptance Criteria

1. WHEN keyboard focus moves to an interactive element, THE Website SHALL display a focus indicator that surrounds or is adjacent to that element, is visually distinct from the element's unfocused appearance, and has a minimum thickness of 2 CSS pixels.
2. WHEN a keyboard user presses Tab or Shift+Tab, THE Website SHALL move focus to each of the Navbar items, Hero_Section actions, Feature_Cards links, CTA_Section action, and Footer links, such that every one of these elements is reachable using the keyboard alone.
3. THE Website SHALL render focus indicators at WCAG_AA_Contrast against their adjacent background.
4. WHEN a keyboard user presses Enter on a focused link, or presses Enter or Space on a focused button, among the Navbar items, Hero_Section actions, Feature_Cards links, CTA_Section action, and Footer links, THE Website SHALL perform that element's action.
5. WHILE a keyboard user navigates the Website using the keyboard alone, THE Website SHALL allow focus to move both to and away from every interactive element without becoming trapped.

### Requirement 12: Build and Runtime Integrity

**User Story:** As a maintainer, I want the restyled Website to build and run cleanly, so that I can deploy it with confidence.

#### Acceptance Criteria

1. WHEN the Build_Process runs, THE Website SHALL complete the production build, terminating with a success exit status and producing no error-level messages in the build output.
2. IF the Build_Process terminates with a non-success exit status or emits one or more error-level messages, THEN THE Website SHALL halt the build, retain the previous build output unchanged, and surface a build-failure indication identifying the failing step.
3. WHERE a new styling or icon library is introduced, THE Website SHALL declare that library in `package.json` with an exact version (no range operators such as `^`, `~`, `>`, or `*`).
4. WHEN the Website is served after a successful Build_Process, THE Website SHALL render the Homepage, Navbar, and Footer with every referenced asset returning a successful load response and with no failed-resource or broken-link errors reported in the browser console.
5. IF a referenced image or icon asset fails to load, THEN THE Website SHALL render that asset's descriptive alternative text in place of the asset while keeping the surrounding layout intact.
