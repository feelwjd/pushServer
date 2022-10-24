import "reflect-metadata"
import { DataSource } from "typeorm"
import { PushList } from "../model/pushList"
import { PushToken } from "../model/pushToken"
import dotenv from 'dotenv'
dotenv.config();

export const AppDataSource = new DataSource({
    type: "oracle",
    host: "localhost",
    username: "C##"+process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 1521,
    sid: "xe",
    synchronize: true,
    logging: false,
    entities: [PushList, PushToken],
    migrations: [],
    subscribers: [],
})
