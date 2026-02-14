# Specification

## Summary
**Goal:** Publish Version 9 successfully by ensuring the live deployment uses a valid production domain/slug.

**Planned changes:**
- Add frontend validation for the production slug during the Version 9 publish flow (5–50 characters; only letters, numbers, and hyphens).
- If the slug is missing or invalid, block publishing and show a clear English error message explaining the rules and asking for a corrected slug.
- Allow publishing to proceed when a valid slug is provided (no slug-validation-related blockage).

**User-visible outcome:** When attempting to publish Version 9, users are prevented from going live with an invalid/missing slug and see an English message describing the required slug format; with a valid slug, publishing proceeds.
