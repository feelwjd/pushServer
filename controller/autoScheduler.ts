import schedule from 'node-schedule';
import {LogSet} from "../module/logset";
import dotenv from 'dotenv';
dotenv.config();
const serviceAccount = require("../config/mcnc-2team-firebase-adminsdk-stv3k-e9837e834a");

export function job(){
    const rule = new schedule.RecurrenceRule();
    rule.second = 1;
    schedule.scheduleJob(rule,async () => {
        console.log("test");
    });
}