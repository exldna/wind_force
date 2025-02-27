FROM nginx:latest

WORKDIR /etc/nginx

RUN rm -r ./conf.d
COPY ./conf.d ./conf.d
COPY ./nginx.conf ./nginx.conf
