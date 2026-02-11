# Changelog

## 2026-02-11

### Removed
- Deleted legacy GitHub, Jira, and AI integration modules from server and client.
- Removed integration-specific GraphQL operations, schema fields, and UI pages/components.
- Removed unused `updateCurrentUser` mutation path tied to integration-era account settings.

### Changed
- Simplified app focus to core CRUD workflows for teams, people, roles, notes, goals, feedback, and check-ins.
- Updated GraphQL codegen workflow to load schema from local files instead of `http://localhost:4000`.
- Updated root docs and TODOs to reflect new scope and next priorities.

### Validation
- `client`: `npm run generate`, `npm run build`
- `server`: `npm run build`
