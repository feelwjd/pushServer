import moment from "moment-timezone"
import { AppDataSource } from "../config/config"
import { PushList } from "../model/pushList"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new PushList()
    user.name = "운영2팀"
    user.date = (moment("2022-10-25")).format('YYYY-MM-DD');
    user.start_time = "11:15"
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(PushList)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))