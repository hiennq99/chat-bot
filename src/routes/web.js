import express from "express";
import chatbotController from "../controller/chatbotController";
import questionController from "../controller/questionController";
import answerController from "../controller/anwserController";
import contentController from "../controller/contentController";
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
    router.post("/api/v1/question/create", questionController.create);
    router.post("/api/v1/question/update/:id", questionController.update);
    router.post("/api/v1/question/delete/:id", questionController.deletes);

    // answer
    router.get("/api/v1/answer/search/:id", answerController.search);
    router.get("/api/v1/answer/list", answerController.gets);
    router.post("/api/v1/answer/create", answerController.create);
    router.post("/api/v1/answer/update/:id", answerController.update);
    router.post("/api/v1/answer/delete/:id", answerController.deletes);

    //content
    router.get("/api/v1/content/search/:id", contentController.search);
    router.get("/api/v1/content/list", contentController.gets);
    router.post("/api/v1/content/create", contentController.create);
    router.post("/api/v1/content/update/:id", contentController.update);
    router.post("/api/v1/content/delete/:id", contentController.deletes);

    router.get("*", userController.index)
    return app.use("/", router);
}
module.exports = initRouter;