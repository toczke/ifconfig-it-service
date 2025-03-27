# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built assets and package files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install production dependencies including Vite
RUN npm install --omit=dev && \
    npm install vite@latest

EXPOSE 4173

# Only run preview server
CMD ["npm", "run", "preview", "--", "--host"] 