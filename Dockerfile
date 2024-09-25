# Base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json tsconfig.json ./

COPY . .

RUN npm install

RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the NestJS application
CMD ["node", "dist/main.js"]
