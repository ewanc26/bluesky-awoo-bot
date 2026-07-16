# AGENTS.md

Guidance for agents working on Bluesky Awoo Bot, a small TypeScript process that posts randomized wolf noises on a configurable schedule.

## Repository shape

- `src/index.ts` owns configuration, login, posting, and scheduling.
- `src/wolf-noise-generator.ts` selects content from `src/wolf-noises.json`.
- `src/config.env` is local secret state and must never be committed.

## Invariants

- Validate that minimum and maximum delays are finite, positive, and ordered.
- Schedule one future post at a time and avoid duplicate timers or immediate retry storms after failure.
- Keep generated posts within AT Protocol text limits and ensure the noise data remains valid JSON with non-empty categories.
- Never log passwords, session tokens, or authorization headers.
- Handle authentication, rate limiting, and network errors without crashing loops or reporting false success.
- The README marks the project unmaintained; prefer small compatibility and safety fixes over architectural expansion.

## Validation

Install with `npm install`, run the TypeScript compiler directly (`npx tsc --noEmit`), and exercise the generator with deterministic randomness in tests. Mock the Bluesky client and timers for scheduling, login failure, post failure, min/max boundaries, and clean shutdown. Do not use the placeholder `npm test` as evidence—it intentionally fails because no test script is configured.
