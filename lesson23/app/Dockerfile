# Builds and runs the AhmedShaykh/Expense-Tracker-App-With-React.JS app under test.
FROM node:18-alpine

RUN apk add --no-cache git wget

WORKDIR /usr/src/app

RUN git clone --depth 1 https://github.com/AhmedShaykh/Expense-Tracker-App-With-React.JS.git .

RUN npm install

ENV BROWSER=none
ENV CI=true
ENV PORT=3000

EXPOSE 3000

HEALTHCHECK --interval=5s --timeout=5s --retries=30 --start-period=20s \
    CMD wget -q --spider http://localhost:3000 || exit 1

CMD ["npm", "run", "start"]
