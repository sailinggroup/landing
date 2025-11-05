# Sail — Frontend

This folder contains the Vite + Solid + TypeScript frontend for the Sail project.

## Quick start

```bash
cd frontend
npm install
npm run dev
```

## Available scripts

- `npm run dev` — start dev server (Vite)
- `npm run build` — build for production
- `npm run preview` — preview the production build
- `npm run typecheck` — run TypeScript type-check only

## Notes & assumptions

- You asked to ignore the backend; this scaffold focuses on the frontend only.
- **Migrated from React to SolidJS** — using Solid v1.8.0 + vite-plugin-solid
- Place any backend proxy configuration on your backend server. During development, you can configure a Vite proxy in `vite.config.ts` or simply run the frontend and backend on different ports and proxy at the backend.

## Next steps

- Add environment variables and proxy settings to `vite.config.ts` if you want Vite to forward API calls to your backend.
- Add routes, components, and tests as needed.
- Check out [SolidJS docs](https://www.solidjs.com/docs/latest) for reactive patterns and component APIs.
