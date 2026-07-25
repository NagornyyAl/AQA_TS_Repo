FROM mcr.microsoft.com/playwright:v1.61.1-noble

RUN apt-get update \
  && apt-get install -y --no-install-recommends default-jre-headless \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /work

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .

CMD ["sh", "-c", "pnpm run test; status=$?; pnpm run report:allure; exit $status"]
