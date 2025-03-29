# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Cache dependencies layer
COPY package.json package-lock.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built assets
COPY --from=builder /app/dist ./dist

# Install http-server globally
RUN npm install -g http-server

EXPOSE 3000

# Serve the dist folder on port 3000 with http-server
CMD ["http-server", "dist", "-p", "3000", "-d", "false"]