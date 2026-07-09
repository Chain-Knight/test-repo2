# Use an official lightweight Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of your application code
COPY . .

# Expose the port your bot/app runs on (change if your app uses a different port)
EXPOSE 3000

# Command to run your application
CMD ["node", "index.js"]
