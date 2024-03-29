FROM nginx
RUN apt-get -y update
RUN apt-get install -y jq
COPY ./dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./generate_env_js.sh /
COPY ./entrypoint.sh /
RUN chmod +x ./generate_env_js.sh ./entrypoint.sh
ENTRYPOINT ./entrypoint.sh
