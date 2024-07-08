FROM node
WORKDIR /app
COPY package.json /app

RUN npm install


ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install;  \
        else npm install --only=production; \
        fi

COPY . /app


RUN npm install

ENV PORT 3000
EXPOSE $PORT

CMD ["node","server/index.js"]
