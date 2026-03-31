# [Flow: Base -> Builder (prune) -> Installer (deps & build) -> Runner]
# 이 Dockerfile은 프로젝트 루트 (suetogether-platform) 에서 실행해야 합니다.
# 실행 명령어: docker build -f apps/api/Dockerfile -t suetogether/api .

# 1. Base image
FROM node:22-alpine AS base

# 2. Builder stage: Turborepo pruning
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune @suetogether/api --docker

# 3. Installer stage: Install dependencies and build
FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies (as they change less often)
# Copy the package.json and package-lock.json pruned by turbo
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# (Optional) Prisma Generate - uncomment if API uses Prisma
# RUN npx prisma generate --schema=./apps/api/prisma/schema.prisma

RUN npx turbo build --filter=@suetogether/api

# 4. Runner stage: Production execution
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Copy hoisted node_modules and built output from the installer
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=installer /app/apps/api/dist ./apps/api/dist
COPY --from=installer /app/apps/api/package.json ./apps/api/package.json
# Uncomment if using Prisma
# COPY --from=installer /app/apps/api/prisma ./apps/api/prisma

EXPOSE 3001

ENV PORT=3001
ENV NODE_ENV=production

CMD ["node", "apps/api/dist/main.js"]
