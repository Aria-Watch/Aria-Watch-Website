/**
 * CTA_Section contribution destination (single configured value).
 *
 * This is intentionally kept in a standalone module (outside `src/pages`, so
 * Docusaurus does not turn it into a route) so the value can be sourced from a
 * single place and overridden in tests.
 *
 * When this resolves to an empty/falsy value, the CTA action control renders in
 * a disabled, non-activatable state and signals unavailability to the visitor
 * (Requirement 5.5).
 */
export const CONTRIBUTION_URL =
  'https://github.com/Aria-Watch/Aria-Watch-Borino-PCB';
