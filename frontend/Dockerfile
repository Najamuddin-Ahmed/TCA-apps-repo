# ==========================================
# STAGE 1: Build the Vite + React Frontend
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install all dependencies required for the Vite build
RUN npm install

# Copy all frontend source files
COPY . .

# Build the production-ready static assets into the 'dist' folder
RUN npm run build


# ==========================================
# STAGE 2: Serve the Static Files with Nginx
# ==========================================
FROM nginx:alpine

# Copy custom Nginx configuration for routing and API proxying
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from Stage 1 into the Nginx web root directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
