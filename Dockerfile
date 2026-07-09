# Use a lightweight Node.js LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package configuration files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy the rest of your application code
COPY index.js ./

# Start the bot
CMD [ "npm", "start" ]
