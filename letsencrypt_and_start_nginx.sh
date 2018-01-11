#!/bin/bash
echo "deb http://ftp.debian.org/debian stretch-backports main" >> /etc/apt/sources.list
cat /etc/apt/sources.list
apt-get update 
apt-get install -y python-certbot-nginx -t stretch-backports
certbot --nginx certonly -n -m blancxav@gmail.com --agree-tos -d wat.promyze.com
nginx -g "daemon off;"