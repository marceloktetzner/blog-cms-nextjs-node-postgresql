# Identity & Profiles

Blog + CMS full‑stack com Next.js, Node e PostgreSQL

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

## Endpoints da API

- **`GET /health`**
  - Verifica se a API está ativa.
  - Resposta 200:
    ```json
    { "status": "ok" }
    ```

- **`POST /auth/register`**
  - Cria um usuário.
  - Body (JSON):
    ```json
    { "email": "user@example.com", "password": "secret123", "name": "User" }
    ```
  - Exemplo (curl):
    ```bash
    curl -X POST http://localhost:4000/auth/register \
      -H "Content-Type: application/json" \
      -d '{"email":"user@example.com","password":"secret123","name":"User"}'
    ```
  - Respostas:
    - 201 Created:
      ```json
      { "id": "uuid", "email": "user@example.com", "name": "User" }
      ```
    - 409 Conflict: `{ "error": "email already in use" }`

- **`POST /auth/login`**
  - Autentica um usuário e retorna um JWT.
  - Body (JSON):
    ```json
    { "email": "user@example.com", "password": "secret123" }
    ```
  - Exemplo (curl):
    ```bash
    curl -X POST http://localhost:4000/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email":"user@example.com","password":"secret123"}'
    ```
  - Resposta 200:
    ```json
    { "accessToken": "<JWT>" }
    ```

- **`GET /me`**
  - Retorna dados do usuário autenticado.
  - Header: `Authorization: Bearer <JWT>` (use o token do `/auth/login`).
  - Exemplo (curl):
    ```bash
    TOKEN=$(curl -s -X POST http://localhost:4000/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email":"user@example.com","password":"secret123"}' | jq -r .accessToken)

    curl http://localhost:4000/me -H "Authorization: Bearer $TOKEN"
    ```
  - Resposta 200:
    ```json
    { "id": "uuid", "email": "user@example.com", "name": "User", "createdAt": "..." }
    ```
  - Erros comuns:
    - 401 `{ "error": "unauthorized" }` (sem header)
    - 401 `{ "error": "invalid token" }` (token inválido/expirado)

## Variáveis de ambiente (apps/api/.env)
```dotenv
PORT=4000
JWT_SECRET=change-me-in-production
# PostgreSQL local (Docker Compose)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/identity_profiles?schema=public"
```

Se usar Postgres gerenciado (Neon/Supabase), substitua a `DATABASE_URL` pela connection string do provedor (geralmente com `sslmode=require`).

## Roadmap curto
- Auth (JWT) e RBAC
- CRUD de usuários e perfis
- Observabilidade (logs/traces/métricas)
- CI/CD
