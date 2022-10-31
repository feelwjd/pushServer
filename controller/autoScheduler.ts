import schedule from 'node-schedule';
import {LogSet} from "../module/logset";
import admin, { database } from 'firebase-admin';
import dotenv from 'dotenv';
import { AppDataSource } from '../config/config';
import { PushList } from '../model/pushList';
import { PushToken } from '../model/pushToken';
dotenv.config();

export function job(){
    const rule = new schedule.RecurrenceRule();
    rule.minute = new schedule.Range(0,59,1);
    schedule.scheduleJob(rule,async () => {
        let datetime = new Date;
        let nowTime = datetime.getHours() + ':' + datetime.getMinutes();
        let nowDate = datetime.getFullYear()+'-'+(datetime.getMonth()+1)+'-'+datetime.getDate();
        const pushListRepository = AppDataSource.getRepository(PushList);
        const tokenListRepository = AppDataSource.getRepository(PushToken);
        let pushList = await pushListRepository.find({where: {date : nowDate, start_time : nowTime}});
        for (let i = 0 ; i<pushList.length ; i++){
            let tokenList = await tokenListRepository.find({where : {list : pushList[i]}});
            
            for (let x = 0; x<tokenList.length ; x++){
                let message = {
                    notification: {
                        title: "bizRoom",
                        body: pushList[i].name,
                    },
                    token: tokenList[x].token
                }
                admin
                    .messaging()
                    .send(message)
                    .then(function (response){
                        LogSet("i","SND001","FCMS","SS");
                    })
                    .catch((error)=>{
                        LogSet("e","SND001","FCMS",error);
                    })
            }
        }
    });
}