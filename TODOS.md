# TODOS.md

## How to Use
- Keep this list prioritized from top to bottom.
- Prefer converting items into GitHub issues with owner + target milestone.
- Move completed entries to a changelog or `DONE` section.

## DONE
- [x] Remove legacy GitHub/Jira/OpenAI/Anthropic integration modules and UI surfaces.
- [x] Simplify GraphQL schema to core CRUD entities (people, teams, roles, notes, goals, check-ins, feedback).
- [x] Move GraphQL codegen to local schema files so generation does not depend on a running API.
- [x] Remove unused `updateCurrentUser` integration-oriented mutation path.

## Next Up (P0)
- [ ] Frontend CRUD UX pass: improve create/edit/delete flows and empty/loading/error states for people/teams/roles.
- [ ] Remove sensitive auth logging in `server/src/server/utils/getUser.ts` (`authHeader` and token are currently logged).
- [ ] Add baseline backend tests for auth/login/rate-limit behavior.
- [ ] Add baseline frontend tests for auth routing and dashboard load states.

## Product Tasks from Existing Notes
- [ ] Add "My Reports" experience.
- [ ] Autosave notes.
- [ ] Improve/define "Subjects" feature scope and UX.

## Reliability and Developer Experience (P1)
- [ ] Add shared root docs for environment variables (server + client) and mark required vs optional values.
- [ ] Clarify and validate dev scripts (`start-dev`, build, codegen) in docs.
- [ ] Add CI pipeline for lint + typecheck + tests.
- [ ] Add `.env.sample` coverage for all required server vars (`MONGO_URI`, `JWT_SECRET`).
- [ ] Remove `// @ts-nocheck` in resolver paths where possible (start with `server/src/models/User/Query/dashboard.ts`).

## Architecture and Data (P2)
- [ ] Review GraphQL schema boundaries and module ownership (`server/src/schema/index.ts` + model folders).
- [ ] Evaluate pagination and query performance for large teams/people lists.
- [ ] Add observability for GraphQL errors and resolver timings.
- [ ] Define migration/seeding strategy for local and staging datasets.

## Cleanup Candidates
- [ ] Replace placeholder/template docs (`client/README.md`) with project-specific content.
- [ ] Normalize TypeScript and ESLint versions across client/server where practical.
