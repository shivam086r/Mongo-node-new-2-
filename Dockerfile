# Stage 1: Build Node.js app
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Create a lightweight container
FROM node:14-alpine
WORKDIR /app
COPY --from=build /app .

# Expose the port
EXPOSE 3000

# Run the application
CMD ["node", "index.js"]
