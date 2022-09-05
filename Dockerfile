FROM nginx:alpine


COPY ./dist/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY default.conf.template /etc/nginx/templates/

