#!/bin/bash

docker run --rm -it -v $PWD:/app -p 43654:43654 meals /bin/bash

# PORT=43654 IP=0.0.0.0 node server/kuchnia-server.js