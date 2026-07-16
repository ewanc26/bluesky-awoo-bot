# AGENTS.md

Guidance for agents working on Bluesky Awoo Bot, an unmaintained TypeScript process that posts randomized wolf noises.

## Current implementation

- `src/index.ts` loads `src/config.env` relative to the process working directory, logs in to the fixed `https://bsky.social` service on every iteration, posts immediately, then sleeps for a randomized whole-second delay.
- `src/wolf-noise-generator.ts` synchronously reloads `src/wolf-noises.json` for every post, selects `howl`/`playful`/`scared` with 40/30/30 weighting, and builds a 1-5-word, 70-140-character, or 280-character noise plus category punctuation.
- The declared `cron` dependency is unused; scheduling is an infinite async loop using `setTimeout`.

## Invariants

- Validate delay parsing explicitly. The current `parseInt(...) || default` accepts negatives, and `getRandomDelay` can loop forever when minimum exceeds maximum.
- Validate non-empty category arrays and keep output within AT Protocol limits; an empty selected array can currently generate `undefined`-based text.
- `main` catches login/post errors and still schedules the next iteration. Preserve bounded retries and avoid logging SDK errors that may contain sensitive response data.
- Never commit `src/config.env` or log passwords, sessions, and authorization headers.

## Validation

Install with `npm install` and type-check with an explicit Node-compatible TypeScript setup; the repository has no `tsconfig.json` or TypeScript devDependency today. Run from the repository root because JSON/env paths are CWD-relative. Mock `BskyAgent`, filesystem, timers, and randomness for each length mode, empty data, login/post failures, invalid/min-greater-than-max delays, and shutdown. The placeholder `npm test` intentionally fails and is not evidence.
