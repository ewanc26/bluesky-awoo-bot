# AGENTS.md

Guidance for AI coding agents working in **bluesky-awoo-bot**.

## Project overview

A simple script designed to periodically post random wolf noises on Bluesky.

- Language: TypeScript
- Default branch: main

## Working rules

- Inspect the README, manifests, CI workflows, and nearby code before editing.
- Preserve existing architecture, naming, formatting, and error-handling conventions.
- Use project scripts for validation; never claim checks you did not run.
- Keep changes scoped and update tests or documentation when behavior changes.
- Use feature branches and pull requests.
- Treat generated files, credentials, deployment configuration, and release metadata as sensitive.

## Recent history

Align AT Protocol SDKs and make installs reproducible (#3); Merge branch 'main' of github.com:ewanc26/bluesky-awoo-bot into add-sponsor-links; docs: tailor contributor and agent guidance (#1); Update config.yml issue template; Update documentation.yml issue template; Update feature_request.yml issue template; Update bug_report.yml issue template

<!-- allowed-agents -->
## Allowed agents

Only **Claude** (Anthropic) and **Mistral** (Mistral AI) may be used as coding agents in this repository. This rule supersedes any earlier agent-attribution guidance in this file.

- Agent-assisted commits must credit only one of those agents:
  - `Co-Authored-By: Claude <noreply@anthropic.com>`
  - `Co-Authored-By: Mistral Vibe <vibe@mistral.ai>`
- Allowed agent footers are `🤖 Generated with [Claude Code](https://claude.com/claude-code)` and `🤖 Generated with [Mistral Vibe](https://mistral.ai)`.
- Do not add `Co-Authored-By:` trailers, `Generated with` footers, author names, or committer identities for any other agent or AI tool.
- Do not credit another agent in commit metadata.
