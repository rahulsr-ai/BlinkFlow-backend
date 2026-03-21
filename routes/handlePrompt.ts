import express from "express";
import { answerFrontendPrompt, saveResultToDB } from "../controllers/handleAiRouter.js";

const AiRouter = express.Router();


AiRouter.post("/ask-ai", answerFrontendPrompt);
AiRouter.post("/save-result", saveResultToDB);


export default AiRouter;
