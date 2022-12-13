FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY client/package*.json client/
RUN npm install --prefix client --only=production

COPY server/package*json server/
RUN npm install --prefix server --only-production

COPY server/ server/

COPY client/ client/
RUN npm run client-build --prefix client

CMD ["npm", "start"]

EXPOSE 5000