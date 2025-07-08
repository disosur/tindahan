FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies first
COPY package*.json ./

RUN npm install

# Copy the rest of the code
COPY . .

EXPOSE 3000

# Start the service
CMD ["npm", "run", "dev"]
