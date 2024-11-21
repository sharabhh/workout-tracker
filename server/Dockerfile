# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source files
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose server port
EXPOSE 3000

# Start the server using the compiled files
CMD ["node", "dist/index.js"]
