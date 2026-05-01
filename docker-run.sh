#!/bin/bash

docker run --name meals -d --restart unless-stopped -v $(pwd):/app -p 43654:43654 meals /bin/bash

