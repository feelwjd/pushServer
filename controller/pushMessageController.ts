import { Request, Response, NextFunction } from "express";
import {LogSet} from "../module/logset";
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import schedule from 'node-schedule';
import { PushList } from "../model/pushList";
import { PushToken } from "../model/pushToken";
import { AppDataSource } from "../config/config";
const serviceAccount = require("../config/mcnc-2team-firebase-adminsdk-stv3k-e9837e834a");
dotenv.config();

export = {
    send:async (req: Request, res: Response, next: NextFunction) => {
        const pushList = new PushList();
        pushList.name = "인턴회의";
        pushList.date = 11;
        pushList.start_time = "now";
        const pushListRepository = AppDataSource.getRepository(PushList);
        await pushListRepository.save(pushList);
        
        const startTime = new Date(Date.now()+1000);
        const endTime = new Date(startTime.getTime()+1000);
        schedule.scheduleJob({minute: 50, hour: 17},async () => {
            let deviceToken = "cOfP7kuqSiOJk1Q6cBG7no:APA91bGcDApqg62v9_OsEDHX4whUA4CFTrHDnxEgTrdsjHuNBTY1-Fk2PtR4UTuiD0LIESA2C8MY3p-7ElbUN4ITGVNITv4wG1FfU0yCX71AZj8WOdPrL3ohGwtQptGoVQIqCFFz15Ba"
            let message = {
                notification: {
                    title: "Company",
                    body: "Push Message",
                },
                token: deviceToken
            }
            admin
                .messaging()
                .send(message)
                .then(function (response){
                    LogSet("i","PUS101","send","SSPUSH");
                    console.log(response);
                    return res.status(200).json({success: true});
                })
                .catch(function (err){
                    LogSet("e","PUS101","send","ESPUSH");
                    console.log(err);
                    return res.status(400).json({success: false});
                })
            })
    }
}