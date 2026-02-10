# TODOS.md

## How to Use
- Keep this list prioritized from top to bottom.
- Prefer converting items into GitHub issues with owner + target milestone.
- Move completed entries to a changelog or `DONE` section.

## Next Up (P0)
- [ ] Expand root `README.md` with complete setup instructions for `client` and `server`.
- [ ] Remove sensitive auth logging in `server/src/server/utils/getUser.ts` (`authHeader` and token are currently logged).
- [ ] Require a strong `JWT_SECRET` and remove insecure fallback default in `server/src/models/AuthToken/model.ts`.
- [ ] Add baseline backend tests for auth/login/rate-limit behavior.
- [ ] Add baseline frontend tests for auth routing and dashboard load states.

## Product Tasks from Existing Notes
- [ ] Add "My Reports" experience.
- [ ] Autosave notes.
- [ ] Improve/define "Subjects" feature scope and UX.

## Reliability and Developer Experience (P1)
- [ ] Add shared root docs for environment variables (server + client), including AI/Jira/GitHub integrations.
- [ ] Clarify and validate dev scripts (`start-dev`, build, codegen) in docs.
- [ ] Add CI pipeline for lint + typecheck + tests.
- [ ] Add `.env.sample` coverage for all required server vars (`MONGO_URI`, `JWT_SECRET`, AI/API keys).
- [ ] Remove `// @ts-nocheck` in resolver paths where possible (start with `server/src/models/User/Query/dashboard.ts`).

## Architecture and Data (P2)
- [ ] Review GraphQL schema boundaries and module ownership (`server/src/schema/index.ts` + model folders).
- [ ] Evaluate pagination and query performance for large teams/people lists.
- [ ] Add observability for GraphQL errors and resolver timings.
- [ ] Define migration/seeding strategy for local and staging datasets.

## Cleanup Candidates
- [ ] Replace placeholder/template docs (`client/README.md`) with project-specific content.
- [ ] Audit legacy/commented code in AI insight generator and remove dead paths.
- [ ] Normalize TypeScript and ESLint versions across client/server where practical.
