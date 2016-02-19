# LMSappVideoWall
LiveMediaStreamer web application example for SPLITT streaming

##Installation

**Clone the repository to the desired path to work with**

        git clone https://github.com/ua-i2cat/LMSappVideoWall /path/to/LMSappVideoWall

##Requirements
1. [liveMediaStreamer](https://github.com/ua-i2cat/liveMediaStreamer/wiki) installed and running _((This app it's working over splitter branch.))_
2. [LMStoREST](https://github.com/ua-i2cat/LMStoREST/wiki) installed and running
3. HTTP server (e.g.: nginx) installed and running.


##HTTP Server example

Nginx server

        sudo apt-get install nginx
Nginx configuration file

        # this sets the user nginx will run as,
        #and the number of worker processes
        user nobody nogroup;
        worker_processes  1;

        # setup where nginx will log errors to
        # and where the nginx process id resides
        error_log  /var/log/nginx/error.log;
        pid        /var/run/nginx.pid;

        events {
          worker_connections  1024;
          # set to on if you have more than 1 worker_processes
          accept_mutex off;
        }

        http {
          include       /etc/nginx/mime.types;

          default_type application/octet-stream;
          access_log /tmp/nginx.access.log combined;

          # use the kernel sendfile
          sendfile        on;
          # prepend http headers before sendfile()
          tcp_nopush     on;

          keepalive_timeout  5;
          tcp_nodelay        on;

          gzip  on;
          gzip_vary on;
          gzip_min_length 500;

          gzip_disable "MSIE [1-6]\.(?!.*SV1)";
          gzip_types text/plain text/xml text/css
             text/comma-separated-values
             text/javascript application/x-javascript
             application/atom+xml image/x-icon;

          # configure the virtual host
          server {
            # replace with your domain name
            server_name localhost;
            # replace with your path to the LMSappVWALL folder
            root /path/to/LMSappVWALL;
            # port to listen for requests on
            listen 80;
            # maximum accepted body size of client request
            client_max_body_size 4G;
            # the server will close connections after this time
            keepalive_timeout 5;

            location / {
                add_header Access-Control-Allow-Origin *;
                add_header Cache-Control no-cache;
                include /etc/nginx/mime.types;
            }
          }
        }

Once configuration file is edited (remember to change the root directory path)

        sudo service nginx reload