import express from "express";
import pushMessageController from "../controller/pushMessageController";
const pushMessageRouter = express.Router();

pushMessageRouter.post("/send",pushMessageController.send);

module.exports = pushMessageRouter;