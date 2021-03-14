import express from "express";
import chatbotController from "../controller/chatbotController";
import questionController from "../controller/questionController";
import answerController from "../controller/anwserController";
import scriptController from "../controller/scriptController";
import userController from "../controller/userController";

let router = express.Router();
let initRouter = (app) => {
    router.get("/", chatbotController.getHomePage);
    router.get("/webhook", chatbotController.getWebhook);
    router.post("/webhook", chatbotController.postWebhook);

    router.get("/admin", userController.index)

    // question
    router.get("/api/v1/question/search/:id", questionController.search);
    router.get("/api/v1/question/list", questionController.gets);
    router.get("/api/v1/question/list/data", questionController.getQuestion);
    router.post("/api/v1/question/create", questionController.create);
    router.post("/api/v1/question/update/:id", questionController.update);
    router.post("/api/v1/question/delete/:id", questionController.deletes);

    // answer
    router.get("/api/v1/answer/search/:id", answerController.search);
    router.get("/api/v1/answer/list", answerController.gets);
    router.post("/api/v1/answer/create", answerController.create);
    router.post("/api/v1/answer/update/:id", answerController.update);
    router.post("/api/v1/answer/delete/:id", answerController.deletes);

    //script
    router.get("/api/v1/script/search/:id", scriptController.search);
    router.get("/api/v1/script/list", scriptController.gets);
    router.post("/api/v1/script/create", scriptController.create);
    router.post("/api/v1/script/update/:id", scriptController.update);
    router.post("/api/v1/script/delete/:id", scriptController.deletes);

    router.get("/api/v1/scriptQuestion/list", scriptController.getScriptQuestion);

    router.get("*", userController.index)
    return app.use("/", router);
}
module.exports = initRouter;