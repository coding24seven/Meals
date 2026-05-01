#!/bin/bash

docker run --name meals-dev --rm -it -v $(pwd):/app -p 43654:43654 meals npm run develop

