import express from "express";
import { emit } from "nodemon";
import chatbotController from "../controller/chatbotController";

let router = express.Router();
let initRouter = (app) => {
    router.get("/", chatbotController.getHomePage);
    router.get("/webhook", chatbotController.getWebhook);
    router.post("/webhook", chatbotController.postWebhook);
    return app.use("/", router);
}
module.exports = initRouter;