FROM node:23-slim

WORKDIR /app

# Instala dependências necessárias para compilar o sqlite3
RUN apt-get update && apt-get install -y python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "src/server.js"]