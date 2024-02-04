FROM node:21-bullseye

LABEL maintainer="juintination"

LABEL email="juintin@kakao.com"

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "run", "docker:start" ]
ENTRYPOINT [ "npm" ]