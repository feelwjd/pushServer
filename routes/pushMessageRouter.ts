import express from "express";
import pushMessageController from "../controller/pushMessageController";
const pushMessageRouter = express.Router();

pushMessageRouter.post("/send",pushMessageController.send);

pushMessageRouter.post("/receive",pushMessageController.receive);

pushMessageRouter.post("/delete",pushMessageController.delete);

pushMessageRouter.post("/update",pushMessageController.update);

module.exports = pushMessageRouter;