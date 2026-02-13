# Specification

## Summary
**Goal:** Fix Draft Version 7 frontend build/runtime issues so it compiles cleanly, doesn’t crash on gallery/editor edge cases, and correctly validates required static assets in production.

**Planned changes:**
- Fix all TypeScript/compile-time errors preventing the frontend from building (including React event handler typing issues under the automatic JSX runtime).
- Harden the Memories gallery and Edit Panel against mismatched array lengths (`images`, `memoryCaptions`, `reasons`) to avoid out-of-bounds access and invalid array-length calculations while still rendering expected UI (e.g., 6 memory tiles).
- Correct/align production asset smoke-check URL pathing and ensure the Deployment Health overlay only appears for genuinely missing assets and lists failures without crashing.

**User-visible outcome:** The app builds successfully, the Memories gallery and editor remain stable even with incomplete/extra data, and the site loads normally when required assets are present (with a clear, non-crashing overlay only when assets are truly missing).
