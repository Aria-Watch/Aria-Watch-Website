# syntax=docker/dockerfile:1

# ============================================================================
# Stage 1 — Build the static Docusaurus site
# ----------------------------------------------------------------------------
# A Debian-slim Node image is used for the build (best native-module
# compatibility). Everything in this stage is discarded; only the generated
# static files in /app/build are carried into the runtime image.
# ============================================================================
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Install dependencies first (cached layer): only re-runs when the manifests
# change. `npm ci` is reproducible and uses the committed package-lock.json.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Copy the rest of the source and produce the optimized production build.
COPY . .
RUN npm run build

# ============================================================================
# Stage 2 — Serve the static files with a minimal nginx image
# ----------------------------------------------------------------------------
# The final image contains ONLY nginx + the built static site (a few tens of
# MB) — no Node toolchain, no node_modules, no source. This is what fixes the
# bloated-image / "no space left on device" problem with the Nixpacks build.
# ============================================================================
FROM nginx:1.27-alpine AS runtime

# Static-site-friendly nginx config (clean URLs, gzip, asset caching, 404).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Only the build output is copied from the builder stage.
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

# nginx:alpine ships a default CMD that runs nginx in the foreground.
CMD ["nginx", "-g", "daemon off;"]
