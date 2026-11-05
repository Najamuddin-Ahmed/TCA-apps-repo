# Step 1: Use a lightweight official Node.js runtime as the base image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package files first to cache dependency installation
COPY package*.json ./

# Step 4: Install dependencies (production only)
RUN npm install --omit=dev

# Step 5: Copy the rest of the backend source files
COPY . .

# Step 6: Expose the port that the Express server listens on
EXPOSE 5000

# Step 7: Command to start the backend server
CMD ["node", "src/server.js"]
