FROM node:14
WORKDIR /home/node/app
COPY /app/package.json .
RUN yarn
COPY /app .
VOLUME [ "/app/node_modules" ]
EXPOSE 80
CMD ["node", "index.mjs"]