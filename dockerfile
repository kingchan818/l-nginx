FROM node
WORKDIR /app
COPY /app/package.json .
RUN yarn
COPY /app .
VOLUME [ "/app/node_modules" ]
EXPOSE 9999

RUN [ "yarn", "build" ]
CMD ["yarn", "start"]