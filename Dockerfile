FROM nginx:1.27-alpine

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/untitled/browser/ /usr/share/nginx/html/
RUN chmod -R a+rX /usr/share/nginx/html/

EXPOSE 80
