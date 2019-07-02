FROM node:12

COPY . .

RUN npm install --global npm@latest yarn@latest lerna@latest
RUN ./run_test.sh
