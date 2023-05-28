FROM node

WORKDIR /app

COPY client/package.json client/package-lock.json /app/client/

RUN cd /app/client && npm install

COPY server/package.json server/package-lock.json /app/server/

RUN cd /app/server && npm install

COPY . .

EXPOSE 3000
EXPOSE 1511

CMD npm run start --prefix client && npm start --prefix server
