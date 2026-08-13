# Multi-stage Dockerfile for TanStack Start application

# Stage 1: Dependencies
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy source code and config files
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY drizzle.config.ts ./
COPY tailwind.config.js* ./
COPY src ./src
COPY public ./public
COPY db ./db
COPY netlify ./netlify
COPY index.html ./

# Build the application
ENV NODE_ENV=production
RUN npm run build

# Stage 3: Runtime (Production)
FROM node:20-alpine AS runtime
WORKDIR /app

# Install dumb-init to handle signals properly
RUN apk add --no-cache dumb-init

# Copy dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# Expose port
EXPOSE 3000

# Use dumb-init to handle signals
ENTRYPOINT ["dumb-init", "--"]

# Start the application with vite preview or custom server
# For production, you may need to implement a custom Node.js server to handle SSR
# or use: npm run dev (for development with hot reload in Docker)
CMD ["vite", "preview", "--port", "3000"]
