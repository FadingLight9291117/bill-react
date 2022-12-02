$server_path='fadinglight:/root/docker/caddy/site/www'

ssh fadinglight "rm ${server_path}/* -r"

scp -r dist/* $server_path