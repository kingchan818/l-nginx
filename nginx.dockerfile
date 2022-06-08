FROM nginx

# COPY default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx /etc/nginx/
# COPY /keys /etc/cert/nginx-dockerize.ddns.net/

EXPOSE 80
# EXPOSE 443