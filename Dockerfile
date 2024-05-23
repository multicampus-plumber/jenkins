# react-dockerizing/Dockerfile

# base image 설정(as build 로 완료된 파일을 밑에서 사용할 수 있다.)
FROM node:16.20.2 as build

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app

# app dependencies
# 컨테이너 내부로 package.json 파일들을 복사
COPY frontend/package*.json ./

# package.json 및 package-lock.json 파일에 명시된 의존성 패키지들을 설치
RUN npm install

# 호스트 머신의 현재 디렉토리 파일들을 컨테이너 내부로 전부 복사
COPY ./frontend .

# npm build
RUN npm run build








# prod environment
FROM ubuntu:22.04

WORKDIR ./backend
COPY ./backend .

RUN apt-get -qq update
RUN apt-get -qq upgrade --yes 
RUN apt-get -qq install curl --yes
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get -qq install nodejs --yes

RUN npm install -g pm2

RUN apt-get install nginx -y

# 이전 빌드 단계에서 빌드한 결과물을 /usr/share/nginx/html 으로 복사한다.
COPY --from=build /app/build /usr/share/nginx/html

# 기본 nginx 설정 파일을 삭제한다. (custom 설정과 충돌 방지)
# RUN rm /etc/nginx/conf.d/default.conf

# custom 설정파일을 컨테이너 내부로 복사한다.
COPY nginx/nginx.conf /etc/nginx/conf.d

RUN rm /etc/nginx/nginx.conf
COPY nginx/nginx_sub.conf /etc/nginx/nginx.conf

# 컨테이너의 80번 포트를 열어준다.
EXPOSE 80

RUN npm install
RUN pm2 start server.js

RUN nginx -s reload

# nginx 서버를 실행하고 백그라운드로 동작하도록 한다.
CMD ["nginx", "-g", "daemon off;"]
