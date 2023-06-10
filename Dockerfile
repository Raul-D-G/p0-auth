FROM node:20-alpine

WORKDIR /app

ADD sourceCode/package.json .
RUN npm install

ADD sourceCode/ .

EXPOSE 8001
EXPOSE 8443

CMD node server.js --stack-trace-limit 100 --max-old-space-size 450