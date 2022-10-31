# pushServer

FCM push Server

## Getting Started

This is a simple push server that manages FCM Token through TypeORM.
It was constructed using intuitive code by indirectly accessing RDBMS (Oracle xe) through TypeORM.

### Installing

You just need to install the necessary dependency using this code.
```
npm i --save
```
And then..
```
"@types/express",
"@types/node",
"cookie-parser",
"cors",
"dotenv",
"express",
"firebase-admin",
"moment-timezone",
"node-cron",
"node-schedule",
"nodemon",
"oracledb",
"reflect-metadata",
"ts-node",
"typeorm",
"typescript",
"winston",
"winston-daily-rotate-file",
"@types/cookie-parser",
"@types/cors",
"@types/node-cron",
"@types/node-schedule"

```

### Setting

Create ecosystem.config.js and follow this Doc.[PM2](https://pm2.keymetrics.io/docs/usage/environment/#node_app_instance-pm2-25-minimum)

Download your Firebase Project adminsdk, and insert to config folder.

## Running

Run Node.js using PM2.

```
npm run dev
```


## Authors

* **Tony Min** - *Initial work* - [feelwjd](https://github.com/feelwjd)