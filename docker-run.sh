#!/bin/bash

docker run -d --restart unless-stopped -it -v $PWD:/app -p 43654:43654 meals /bin/bash
