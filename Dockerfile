FROM nginx:latest
MAINTAINER Xavier Blanc <blancxav@gmail.com>

COPY nginx.conf /etc/nginx/nginx.conf
COPY dev/ops/app /var/www/public


