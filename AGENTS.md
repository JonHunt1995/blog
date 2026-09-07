## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Research & Problem-Solving Workflow

1. **Autonomous Research & Diagnostics (Full Autonomy)**
   - **Research**: Search the web, read official docs, check GitHub issues/discussions, explore the codebase, and read files freely without needing permission.
   - **Diagnostics**: Run non-destructive inspection tools freely (e.g., `curl`, build dry-runs, log checks, and headless Chrome / CDP browser debugging) to pinpoint root causes.

2. **Workshop Before Mutating (The Hard Stop)**
   - Once an issue or requirement is understood, **STOP** before editing code, modifying configs, or refactoring files.
   - Present the diagnosis and lay out the viable solution paths with trade-offs.
   - Workshop the plan with the user so the user chooses the architectural and implementation direction.

3. **Execution & Version Control (Strictly Gated)**
   - Apply file changes and refactors only after the plan is explicitly agreed upon.
   - Never run `git commit`, `git push`, or alter git history unless explicitly requested by the user.

