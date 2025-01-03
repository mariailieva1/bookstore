# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /server

# Copy package files
COPY server/package.json server/package-lock.json ./

# Install dependencies
RUN npm install

# Copy common and server files
COPY common /common
COPY server /server

# Build the project
RUN npm run build

# Start the application
CMD ["npm", "run", "start:dev"]