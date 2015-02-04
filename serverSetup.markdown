# Hostname config

Check the server's IP address via `ifconfig`.

`$ sudo vi /etc/hosts`

Add line with the IP address and hostname: `188.40.99.15 cs.8b.nu`


# Create database

Create the `workdimension` DB:
`$ sudo -u postgres createdb workdimension`

Install pgcrypto extension:

    $ sudo -u postgres psql workdimension
    # CREATE EXTENSION pgcrypto;


# Web server

`$ sudo cp /etc/nginx/sites-available/8b /etc/nginx/sites-available/careerstudio`

`$ sudo vi /etc/nginx/sites-available/careerstudio`

    # Career Studio
    server {
            listen 80;
            server_name cs.8b.nu;

            location / {
                    proxy_pass http://localhost:9004;
                    proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
                    proxy_redirect off;
                    proxy_buffering off;
                    proxy_set_header Host $host;
                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            }
    }

`$ sudo ln -s /etc/nginx/sites-available/careerstudio /etc/nginx/sites-enabled/careerstudio`

`$ sudo service nginx restart`

Copy the following source files to `~/career-studio/website`:

* app
* conf
* project (cleaned from the `target` directories)
* public
* activator
* activator-launch-X.Y.Z.jar
* build.sbt

Make the `activator` script executable:

    $ cd ~/career-studio/website
    $ dos2unix activator
    $ chmod u+x activator


# Start web server

    $ screen -dR
    Ctrl + a, c
    $ cd ~/career-studio/website
    $ ./activator
    $ start -Dhttp.port=9004

(`run` for auto reload, `start` for better perf)
