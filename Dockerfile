FROM node:20-bullseye

# ⬇️ ДОДАТИ ЦЕ
RUN apt-get update \
 && apt-get install -y --no-install-recommends openjdk-17-jre-headless \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm i -g allure-commandline@2.34.1
ENV CI=true
CMD ["npm","run","docker:test"]
