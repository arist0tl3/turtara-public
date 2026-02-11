# Engineering Manager Dashboard

People Manager is a full-stack web app for engineering managers to track people, teams, one-on-ones, goals, feedback, and check-ins.

## Stack
- Client: React 18, TypeScript, Vite, Apollo Client, MUI Joy/Material
- Server: Node.js, TypeScript, Apollo Server, Express middleware, Mongoose
- Data: MongoDB

## Repository Structure
- `client/`: frontend app
- `server/`: GraphQL API and domain logic
- `AGENTS.md`: contributor and coding-agent guardrails
- `TODOS.md`: prioritized backlog

## Prerequisites
- Node.js `23.x` (required by `server/package.json` engines)
- npm `10+`
- MongoDB instance (local or remote)

## Environment Variables

### Server (`server/.env`)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: secret used for auth token signing/verification (required)
- `PORT`: API port (optional, defaults to `4000`)
- `NODE_ENV`: `development` or `production` (optional)

### Client (`client/.env.development`)
- `VITE_GRAPHQL_ENDPOINT`: GraphQL endpoint URL (example: `http://localhost:4000/`)

## Local Setup
1. Install server dependencies:
```bash
cd server
npm install
```
2. Create server env file:
```bash
cp .env.sample .env
```
3. Start API in dev mode:
```bash
npm run start-dev
```
4. In a second terminal, install client dependencies:
```bash
cd client
npm install
```
5. Ensure `client/.env.development` has the correct API URL.
6. Start client:
```bash
npm run dev
```

Default local URLs:
- Client: `http://localhost:5173`
- API: `http://localhost:4000/`

## Key Scripts

### Client (`client/package.json`)
- `npm run dev`: start Vite dev server
- `npm run build`: production build
- `npm run lint`: eslint
- `npm run generate`: GraphQL codegen and copy generated server types

### Server (`server/package.json`)
- `npm run start-dev`: start via nodemon + ts runtime
- `npm run start-dev:force`: ts runtime without type checks
- `npm run build`: compile TypeScript to `dist/`
- `npm run start`: run compiled output

## GraphQL Codegen Workflow
When GraphQL operations or schema types change:
1. Update operation files under `client/src/graphql/**`.
2. Run:
```bash
cd client
npm run generate
```
This project uses local schema files for codegen (`client/src/graphql/schema-base.graphql` + `server/src/models/**/typeDefs.ts`), so a running API is not required.
3. Commit generated updates in:
- `client/src/generated.ts`
- `server/src/generated.ts`

## Current Project Status
- Core CRUD for people, teams, roles, notes, goals, check-ins, and feedback exists.
- Dashboard and reporting flows are implemented.
- Legacy GitHub/Jira/OpenAI/Anthropic integration code paths have been removed to simplify the baseline.
- Root documentation and test coverage are still early-stage and being improved.

## Security Notes
- `JWT_SECRET` is required and should be high-entropy in every environment.
- Never log bearer tokens or auth headers.
- Keep API tokens in environment variables only.

## Near-Term Priorities
See `TODOS.md` for prioritized work, including:
- Frontend CRUD UX polish for people/teams/roles/notes
- Baseline test coverage and CI
- Additional security and reliability hardening
