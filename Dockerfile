FROM nginx:latest
MAINTAINER Xavier Blanc <blancxav@gmail.com>

COPY nginx.conf /etc/nginx/nginx.conf
COPY ops/app /var/www/public


