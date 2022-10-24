import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import admin from 'firebase-admin';
import { AppDataSource } from "./config/config"
import "reflect-metadata"; 
const serviceAccount = require("./config/mcnc-2team-firebase-adminsdk-stv3k-e9837e834a");
const pushMessageRouter = require('./routes/pushMessageRouter');
dotenv.config();
AppDataSource.initialize()
    .then(async () => {
        console.log("✅ Connected to the database!");
    }).catch((error)=>{
        throw new Error(error);
    });
    
const app = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use("/push",pushMessageRouter);

app.listen(process.env.PORT,()=>{
    console.log(`
    ############################################
        🛡️  Server listening on port: ${process.env.PORT}🛡️
    ############################################
    `);
});


module.exports = app;