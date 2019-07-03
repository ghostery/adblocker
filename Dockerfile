FROM node:lts

COPY . .

RUN npm install --global yarn@latest lerna@latest
RUN ./run_tests.sh
