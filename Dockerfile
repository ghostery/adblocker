FROM node:12

COPY . .

RUN npm install --global yarn@latest lerna@latest
RUN ./run_tests.sh
