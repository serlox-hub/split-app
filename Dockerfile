# ---- Base ----
FROM node:20-alpine AS base
WORKDIR /app
# Install native libraries (e.g., sharp, OpenSSL)
RUN apk add --no-cache libc6-compat openssl
ENV NODE_ENV=production

# ---- Development dependencies ----
FROM base AS dev-deps
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN npm ci

# ---- Development runtime ----
FROM base AS dev
ENV NODE_ENV=development
# Copy only node_modules from dev-deps to avoid reinstall
COPY --from=dev-deps /app/node_modules /app/node_modules
COPY . .
# Useful for Windows/WSL if file watcher does not detect changes
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "-p", "3000"]

# ---- Production dependencies (pruned) ----
FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- Build (standalone) ----
FROM base AS builder
ENV NODE_ENV=production
COPY . .
# Use development dependencies to compile
COPY --from=dev-deps /app/node_modules /app/node_modules
RUN npm run build

# ---- Runner (slim production image) ----
FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
# Copy standalone build + static assets + public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
# Simple healthcheck
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000 || exit 1
USER nextjs
CMD ["node", "server.js"]
