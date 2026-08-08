FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose Vite dev port
EXPOSE 5173

# Start Vite dev server, bind to all interfaces for Docker access
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
