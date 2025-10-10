# Identity & Profiles

Monorepo para o projeto Identity & Profiles (API em TypeScript com Express).

## Estrutura
- `apps/api`: API REST (Express + TS)

## Como rodar (após instalar deps)
```bash
npm run dev:api
```

Healthcheck:
```
GET http://localhost:4000/health -> { "status": "ok" }
```

## Roadmap curto
- Auth (JWT) e RBAC
- CRUD de usuários e perfis
- Observabilidade (logs/traces/métricas)
- CI/CD
