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
