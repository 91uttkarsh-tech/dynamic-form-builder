FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Use the same port as in your environment variable
EXPOSE 4000

# Use environment variable PORT for flexibility
CMD ["sh", "-c", "node src/server.js"]
