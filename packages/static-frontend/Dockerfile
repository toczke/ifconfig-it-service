# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Cache dependencies layer
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built assets
COPY --from=builder /app/dist ./dist

# Install serve globally
RUN npm install -g serve

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4137 || exit 1

EXPOSE 4137

# Serve the dist folder on port 4137
CMD ["serve", "-s", "dist", "-l", "4137"]