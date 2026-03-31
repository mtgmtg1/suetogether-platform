# SueTogether Platform

차세대 B2B SaaS 기반 집단분쟁 및 다중지역소송(MDL) 초자동화 플랫폼

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Backend**: NestJS 11 (Modular Monolith)
- **Database**: PostgreSQL 16 + Prisma ORM + PostGIS + pgvector
- **AI/ML**: Python FastAPI + LayoutLMv3 + Donut + LangChain
- **Queue**: BullMQ + Redis 7
- **Infra**: Docker + Kubernetes

## Getting Started

```bash
# 1. Clone
git clone https://github.com/mtgmtg1/suetogether-platform.git
cd suetogether-platform

# 2. Install dependencies
npm install

# 3. Start infrastructure
docker-compose up -d postgres redis

# 4. Run migrations
cd apps/api && npx prisma migrate dev

# 5. Start development
npm run dev
```

## Architecture

See [docs/architecture.md](docs/architecture.md) for the full architecture diagram.

## License

Private - All rights reserved.
