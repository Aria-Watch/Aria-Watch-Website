# syntax=docker/dockerfile:1

# ============================================================================
# Stage 1 — Build the static Astro site
# ----------------------------------------------------------------------------
# Images live in the repository (content/**/images, src/assets) and are
# optimised at build time into responsive WebP variants, so the final image is
# fully self-contained: no external image storage is needed at runtime.
# ============================================================================
FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Dependencies first (cached layer, re-runs only when the manifests change).
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# Google Analytics 4 measurement ID (optional). Without it the site has no
# analytics and no cookie banner. Usage:
#   docker build --build-arg PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX .
ARG PUBLIC_GA_MEASUREMENT_ID=""
ENV PUBLIC_GA_MEASUREMENT_ID=${PUBLIC_GA_MEASUREMENT_ID}

RUN npm run build && node scripts/check-site.mjs

# ============================================================================
# Stage 2 — Serve the static files with nginx
# ----------------------------------------------------------------------------
# The runtime image contains only nginx + the built site (no Node, no sources).
# ============================================================================
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Health check used by Coolify (it picks up the Dockerfile HEALTHCHECK).
# wget is already part of the nginx alpine image.
HEALTHCHECK --interval=60s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
