# Portfólio Manuca — Monorepo

Monorepo com frontend Next.js (`apps/web`), API NestJS + Prisma (`apps/api`) e pacotes compartilhados (`packages/types`, `packages/config`).

## Banco de dados (Supabase ou local)

- **Produção / preferido:** use a connection string do **Supabase Postgres** em `DATABASE_URL` (Settings → Database).
- **Local:** `docker compose up -d` sobe Postgres 16 em `localhost:5432` (user/senha/db: `postgres` / `postgres` / `portfoliomanuca`).
- Uploads de imagens: configure **Supabase Storage** (bucket público ou signed URLs) e aponte as URLs nos campos `coverImage` / `gallery`.

## Setup rápido

```bash
# Instalar dependências
pnpm install

# Subir PostgreSQL
docker compose up -d

# Configurar API
cp apps/api/.env.example apps/api/.env
# Ajuste DATABASE_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

# Migrar e seed
pnpm --filter @portfoliomanuca/api prisma:migrate
pnpm --filter @portfoliomanuca/api prisma:seed

# Configurar web
cp apps/web/.env.example apps/web/.env
```

## Desenvolvimento

```bash
# Tudo (turbo)
pnpm dev

# Apenas frontend (porta 3000)
pnpm dev:web

# Apenas API (porta 3001)
pnpm dev:api
```

## Build

```bash
pnpm build
# ou
pnpm --filter @portfoliomanuca/web build
pnpm --filter @portfoliomanuca/api build
```

## Estrutura

| App / Package | Descrição |
|---------------|-----------|
| `apps/web` | Portfólio público + admin em `/admin` |
| `apps/api` | REST API com auth JWT (cookie `access_token`) |
| `packages/types` | Tipos compartilhados (`IProject`, `IProfile`, etc.) |

## Admin

### Primeiro acesso

1. Copie `apps/api/.env.example` para `apps/api/.env`.
2. Preencha `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL` e `ADMIN_PASSWORD`.
3. Prepare o banco e crie o usuário:

```bash
pnpm --filter @portfoliomanuca/api prisma:generate
pnpm --filter @portfoliomanuca/api exec prisma migrate deploy
pnpm --filter @portfoliomanuca/api prisma:seed
```

4. Inicie API e web em terminais separados:

```bash
pnpm dev:api
pnpm dev:web
```

5. Acesse `http://localhost:3000/admin/login` e use exatamente o email e a senha definidos no `.env`.

Sem alterar o `.env.example`, as credenciais locais padrão são:

- Email: `admin@portfolio.local`
- Senha: `changeme`

Troque esses valores antes de publicar. O seed recria o conteúdo inicial do portfólio; não o execute novamente em um banco com alterações que você queira preservar.

O middleware do Next verifica presença do cookie `access_token`; a API valida o JWT.

## Deploy

### API (Render)

Use `apps/api/render.yaml` ou configure manualmente:

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | PostgreSQL (Render ou externo) |
| `JWT_SECRET` | Segredo para assinar tokens |
| `FRONTEND_URL` | URL do Next (ex: `https://seu-app.vercel.app`) |
| `ADMIN_EMAIL` | Email do admin (seed) |
| `ADMIN_PASSWORD` | Senha do admin (seed) |
| `PORT` | `3001` |

Após deploy, rode migrations e seed no banco de produção.

### Web (Vercel)

- Root directory: `apps/web`
- Framework: Next.js
- Env: `NEXT_PUBLIC_API_URL=https://sua-api.onrender.com`

Configure `FRONTEND_URL` na API com a URL da Vercel para CORS/cookies.

## Scripts úteis

```bash
pnpm --filter @portfoliomanuca/api prisma:generate
pnpm --filter @portfoliomanuca/api prisma:migrate
pnpm --filter @portfoliomanuca/api prisma:seed
pnpm --filter @portfoliomanuca/web typecheck
```
