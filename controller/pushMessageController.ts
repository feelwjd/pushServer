import { Request, Response, NextFunction } from "express";
import {LogSet} from "../module/logset";
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import schedule from 'node-schedule';
import { PushList } from "../model/pushList";
import { PushToken } from "../model/pushToken";
import { AppDataSource } from "../config/config";
import moment from "moment-timezone";
const serviceAccount = require("../config/mcnc-2team-firebase-adminsdk-stv3k-e9837e834a");
dotenv.config();

export = {
    send:async (req: Request, res: Response, next: NextFunction) => {
        let start_time = req.body.start_time;
        let token = req.body.token;
        let date = req.body.date;
        let setTime = start_time.split(':');

        schedule.scheduleJob({minute: parseInt(setTime[1]), hour: parseInt(setTime[0])},async () => {
            let message = {
                notification: {
                    title: "Company",
                    body: "Push Message",
                },
                token: token
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
    },
    receive:async (req: Request, res: Response, next: NextFunction) => {
        const tokens: string = req.body.token;
        try{
            const pushList = new PushList();
            pushList.name = req.body.name;
            pushList.date = req.body.date;
            pushList.start_time = req.body.start_time;
            const pushListRepository = AppDataSource.getRepository(PushList);
            if (await pushListRepository.findOne({where: {name: req.body.name, date: req.body.date, start_time: req.body.start_time}}) == null){
                await pushListRepository.save(pushList);
                const listId = await pushListRepository.findOne({
                    where: {name: req.body.name, date: req.body.date, start_time: req.body.start_time}
                });

                const pushTokenRepository = AppDataSource.getRepository(PushToken);
                for (let i =0 ; i<tokens.length; i++){
                    const tokenList = new PushToken();
                    tokenList.list_id = listId!.id
                    tokenList.token = tokens[i];
                    await pushTokenRepository.save(tokenList);
                }
                
                res.send("receive Success.").status(201);
            }else{
                LogSet("e","REC001","RECV","RO");
                res.send("Already Exist.").status(400);
            }
        }catch(error){
            LogSet("e","REC001","RECV","RF");
            res.send("receive Fail.").status(400);
        }
        
        
    }
}