# Runs the Playwright UI tests against the "app" service from docker-compose.yml.
FROM mcr.microsoft.com/playwright:v1.55.0-jammy

WORKDIR /usr/src/tests

COPY package*.json ./
RUN npm ci

COPY playwright.config.ts tsconfig.json ./
COPY tests ./tests

CMD ["npx", "playwright", "test"]
