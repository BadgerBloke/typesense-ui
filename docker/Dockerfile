# syntax=docker.io/docker/dockerfile:1
FROM oven/bun:1.2.4-alpine AS base
# 1. Install dependencies only when needed
FROM base AS deps
# Install libc6-compat for compatibility
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Install dependencies using Bun
COPY package.json bun.lock* .npmrc* ./
RUN SKIP_HUSKY=1 bun install --frozen-lockfile
# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Define a build arg for the env file path
ARG ENV_FILE=.env.production
# Copy the specified env file to .env.production
COPY ${ENV_FILE} .env.production

# Note: We've removed the COPY line for .env.production here
# The environment file will be mounted as a volume at runtime

RUN bun run build
# 3. Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
# Copy built files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD HOSTNAME="0.0.0.0" bun run server.js
