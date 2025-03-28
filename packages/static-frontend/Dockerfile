# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Cache dependencies layer - use npm install instead of npm ci
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps  # More forgiving with peer dependencies

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

EXPOSE 4137

# Serve the dist folder on port 4137
CMD ["serve", "-s", "dist", "-l", "4137"]