# Contributing

## Introduction

First, thank you for considering contributing! It is people like you that make the open source community such a great community! 😊

We welcome any type of contribution, not just code. You can help with:

- **QA**: file bug reports, the more details you can give the better (e.g. screenshots with the console open)
- **Marketing**: writing blog posts, how to's, printing stickers, ...
- **Community**: presenting the project at meetups, organizing a dedicated meetup for the local community, ...
- **Code**: take a look at the [open issues](https://github.com/IvaDey/enum-factory/issues). Even if you can't write code, commenting on them and showing that you care about a given issue matters. It helps us triage them.

## Your First Contribution

If you're new to open source, check out [How to Contribute to an Open Source Project on GitHub](https://opensource.guide/how-to-contribute/).

Steps for contributing:
1. Fork the repository and clone your fork.
2. Create a branch for your changes:
```shell
git checkout -b <type>/<short-description>
```
Example: feat/add-color-enum.
3. Make your changes, ensuring they pass all lint and test checks.
4. Push your changes and open a pull request.

## Submitting code

### Before You Begin
- Lint and type-check your code:
```shell
npm run check
```
- Add tests for your changes:
  - Unit tests for logic.
  - TypeScript tests for type validation.
  - Place tests next to the source files.

### Pull Request Guidelines
- Ensure your pull request contains:
  - A clear title and description:
    - What problem does this solve?
    - How can it be verified?
    - Any trade-offs or limitations.
  - Relevant tests for new or updated functionality.
  - Updated documentation if your changes affect public APIs, behavior, or usage.
- Keep your changes focused and well-scoped:
  - Break down large pull requests into smaller, manageable parts.
- Follow the [commit message guidelines](#commit-types).

### Review and Merge Process
- Once submitted, your pull request will be reviewed by a maintainer
- Ensure all CI checks pass before requesting a review.
- Discuss any feedback in the pull request comments and make necessary adjustments.

## Commit Types

We follow the [Conventional Commits](https://www.conventionalcommits.org) standard to ensure consistency in commit messages. Below is a list of commit types and their purposes:

Commit message structure is:
```text
<type>[optional scope]: <description>

[optional body]
```

### Main Types

- `feat` – Used for adding new features or significant changes. It is also used for removing functionality.<br />
  **Examples:**
    - feat: added a new filter to the search
    - feat: removed support for the old API

- `fix` – Used for bug fixes.<br />
  **Examples:**
    - fix: fixed form saving issue when the field is empty
    - fix: resolved a bug with incorrect date display

- `perf` – Used for performance optimizations without changing functionality.<br />
  **Examples:**
    - perf: improved database query performance
    - perf: optimized image loading on the homepage

- `ui` – Changes to the user interface or design.<br />
  **Examples:**
    - ui: updated the logo on the home page
    - ui: added new button styles

- `docs` – Documentation changes, including code comments.<br />
  **Examples:**
    - docs: updated README with descriptions of new features
    - docs: added a "How to contribute" section in CONTRIBUTING.md

- `refactor` – Changes to code structure without altering behavior.<br />
  **Examples:**
    - refactor: reorganized modules for easier navigation
    - refactor: removed duplicate code

- `style` – Code style or formatting changes that do not affect behavior.<br />
  **Examples:**
    - style: fixed code formatting according to eslint
    - style: replaced double quotes with single quotes

- `test` – Changes related to tests.<br />
  **Examples:**
    - test: added a test for error handling
    - test: updated snapshots after UI changes

- `ops` – Changes related to CI/CD configurations or build scripts.<br />
  **Examples:**
    - ops: updated GitHub Actions configuration
    - ops: added a deployment automation script

- `chore` – Routine changes that do not affect functionality.<br />
  **Examples:**
    - chore: updated project dependencies
    - chore: modified .gitignore file

### Additional Types

- `deprecate` – Used to mark functionality that will be removed in the future.<br />
  **Examples:**
    - deprecate: marked "email" field as deprecated
    - deprecate: deprecated validateUser method

- `revert` – Used to revert a previous commit.<br />
  **Examples:**
    - revert: revert commit feat: added support for charts
