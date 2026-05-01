## How to use the app:
to edit a meal name, date, or count:  
Click it. Alter the text. Press enter or click out. Confirm the change.

## Docker
- build docker image: `docker build -t meals .`

develop:
- run in dev mode: `./docker-develop.sh`

serve in production:
- run docker image: `./docker-serve.sh`

## Config
to edit the configuration:  
Open: /shared/config.js

to edit environmental variables:  
Open: /.env-template and .env

to edit the meal database manually:  
Open: /database/meals.json
