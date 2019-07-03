FROM node:lts

COPY . .

RUN npm install --global yarn@latest
RUN ./run_tests.sh
