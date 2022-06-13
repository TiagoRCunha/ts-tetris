FROM node:12-alpine
WORKDIR /tetris
COPY ./public .
RUN npm install
EXPOSE 7171
CMD ["node", "bundle.js"]