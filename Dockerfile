FROM node:latest
WORKDIR /app
COPY ./backend ./
RUN npm install
CMD ["node", "server"]