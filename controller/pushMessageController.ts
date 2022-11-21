import { Request, Response, NextFunction } from "express";
import {LogSet} from "../module/logset";
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import schedule from 'node-schedule';
import { PushList } from "../model/pushList";
import { PushToken } from "../model/pushToken";
import { AppDataSource } from "../config/config";
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
        try{
            const tokens = req.body.token;
            const pushList = new PushList();
            pushList.name = req.body.name;
            pushList.date = req.body.date;
            pushList.start_time = req.body.start_time;
            pushList.rsv_id = req.body.rsv_id;
            pushList.room = req.body.room;
            
            const pushListRepository = AppDataSource.getRepository(PushList);
            if (await pushListRepository.findOne({where: {name: req.body.name, date: req.body.date, start_time: req.body.start_time, rsv_id: req.body.rsv_id, room: req.body.room}}) == null){
                const tokenList:Array<PushToken> = [];
                for(let i = 0 ; i<tokens.length ; i++){
                    const pushToken = new PushToken();
                    pushToken.token = tokens[i];
                    await AppDataSource.getRepository(PushToken).save(pushToken);
                    tokenList.push(pushToken);
                }
                pushList.list = tokenList;
                await pushListRepository.save(pushList);
                LogSet("i","REC001","RECV","RS");
                res.send("receive Success.").status(201);
            }else{
                LogSet("e","REC001","RECV","RO");
                res.send("Already Exist.").status(400);
            }
        }catch(error){
            LogSet("e","REC001","RECV","RF");
            res.send("receive Fail.").status(400);
        }
    },
    delete:async (req: Request, res: Response, next: NextFunction) => {
        try{
            const rsv_id: number = req.body.rsv_id;
            
            const pushListRepository = AppDataSource.getRepository(PushList);
            const tokenListRepository = AppDataSource.getRepository(PushToken);

            const pushList = await pushListRepository.find({where: {rsv_id: rsv_id}});
            const tokenList = await tokenListRepository.find({where: {list : pushList[0]}});

            await tokenListRepository.remove(tokenList);
            await pushListRepository.remove(pushList);
            LogSet("i","DEL001","DELC","DS");
            res.send("delete success.").status(201);
        }catch(error){
            LogSet("e","DEL001","DELC","DF");
            res.send("delete Fail.").status(400);
        }
    },
    update:async (req: Request, res: Response, next: NextFunction) => {
        try{
            const rsv_id: number = req.body.rsv_id;
            const room: string = req.body.room;
            
            const new_name: string = req.body.new_name;
            const new_date: string = req.body.new_date;
            const new_start_time: string = req.body.new_start_time;
            const token = req.body.token;

            const pushListRepository = AppDataSource.getRepository(PushList);
            const tokenListRepository = AppDataSource.getRepository(PushToken);
            const pushList = await pushListRepository.find({where: {rsv_id: rsv_id, room: room}});
            const tokenList = await tokenListRepository.find({where: {list : pushList[0]}});
            await tokenListRepository.remove(tokenList);
            
            await AppDataSource.createQueryBuilder()
            .update(PushList)
            .set({name: new_name, date: new_date, start_time: new_start_time})
            .where("rsv_id = :rsv_id",{rsv_id: rsv_id})
            .execute();
            
            for (let i = 0; i<token.length; i++){
                const pushToken = new PushToken();
                pushToken.token = token[i];
                pushToken.list = pushList[0];
                await AppDataSource.getRepository(PushToken).save(pushToken);
            }
            
            LogSet("i","UPD001","UPDC","US");
            res.send("update success.").status(201);
        }catch(error){
            LogSet("e","UPD001","UPDC","UF");
            res.send("update Fail.").status(400);
        }
    }
}