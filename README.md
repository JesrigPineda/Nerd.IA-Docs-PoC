# Nerd.IA Developer Docs — Unofficial PoC

A small, bilingual developer-documentation proof of concept for the public Nerd.IA API. It demonstrates a goal-oriented path from Quickstart to guides and a verified API reference without attempting to reconstruct the full documentation set.

## Why this PoC exists

The project explores a clearer developer experience for a first integration:

`Goal → Quickstart → Guide → API Reference`

The primary goal is to help a developer authenticate, identify a user, send a first message, understand the published response, and find the corresponding technical contract.

## Goals

- Spanish at `/` with an equivalent English experience at `/en/`.
- Request and response examples together, using cURL and browser-native `fetch()`.
- A single traceable OpenAPI 3.1 document rendered by Scalar inside Starlight.
- Explicit documentation gaps instead of inferred API behavior.

## Scope

The PoC documents four operations only:

- `POST /login`
- `POST /{username}/user/createOrUpdate`
- `GET /{username}/user/variables`
- `POST /{username}/conversation/send_message`

No backend, SDK, CMS, analytics, mock server, chatbot, request execution, or credential storage is included.

## Architecture

```text
GitHub
   │
   ▼
Astro (static build)
   └── Starlight
       ├── Goal-oriented MDX content
       ├── Spanish root / English /en
       └── Scalar API Reference
           └── public/openapi.yaml
   │
   ▼
Vercel
```

## Stack

- Astro 7
- Starlight
- MDX
- `@scalar/astro`
- OpenAPI 3.1
- npm and Git
- Static Vercel deployment

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Build

```bash
npm run build
```

The static output is written to `dist/`. Preview it with `npm run preview`.

## Deploy

Push the repository to GitHub and import it into Vercel. Vercel detects Astro automatically; this static project needs neither a Vercel adapter nor `vercel.json`.

## Public sources

- [Nerd.IA API Doc](https://nerds.notion.site/API-Doc-77a08e24d2a34c098fcd24658041e842)
- [Login](https://nerds.notion.site/Login-Inicio-de-sesi-n-2b063162b29f4240bb38f042e3c06f69)
- [Users](https://nerds.notion.site/Users-Usuarios-af25bd7771bc4850a5ce4e0896bb6f6b)
- [Messages](https://nerds.notion.site/Messages-Mensajes-ca504f3e4ab7445ebf60794f7471214c)

Traceability for every included operation is recorded in [`research/api-audit.md`](research/api-audit.md).

## Known limitations

- Public sources do not publish HTTP status codes, complete errors, or several required/optional rules.
- The sources label some bodies as JSON but do not publish the required `Content-Type` header.
- `send_message` does not publish a conversation identifier in its example, so message history is outside the primary flow.
- `@scalar/astro` 0.4.14 has not widened its declared peer range to Astro 7. The official component is installed through the repository `.npmrc`; static build, client navigation, localization, and responsive rendering are covered by this PoC's QA.
- No production URL or GitHub repository URL is configured yet.

## Disclaimer

**Prueba de concepto no oficial construida exclusivamente con información disponible públicamente.**

Este proyecto no está afiliado, respaldado ni mantenido por Nerd.IA. Su propósito es educativo y demostrativo.

**Unofficial proof of concept built exclusively from publicly available information.**

This project is not affiliated with, endorsed by, or maintained by Nerd.IA. It is intended solely for educational and demonstration purposes.
