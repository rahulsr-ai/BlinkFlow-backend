import type { Request, Response } from 'express';
import { OpenRouter } from '@openrouter/sdk';
import UserPrompt from '../models/userPrompts.js';


const openRouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});


/*
FREE MODELS 
stepfun/step-3.5-flash:free
nvidia/nemotron-3-super-120b-a12b:free
arcee-ai/trinity-large-preview:free
openai/gpt-oss-20b:free
*/


export async function answerFrontendPrompt(req: Request, res: Response) {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: true, msg: "Prompt is missing" });
        }

        const existingData = await UserPrompt.findOne({ prompt: prompt.toLowerCase().trim() });

        if (existingData) {
            console.log("Serving from Database Cache ⚡");
            return res.status(200).json({
                error: false,
                data: existingData.response,
            });
        }

        const completion = await openRouter.chat.send({
            chatGenerationParams: {
                model: "arcee-ai/trinity-large-preview:free",
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            }

        });


        const aiResponse = completion.choices[0]!.message.content;


        return res.status(200).json({
            error: false,
            data: aiResponse,
        });

    } catch (error: any) {
        console.error("SDK Error:", error);
        return res.status(500).json({
            error: true,
            msg: "AI service error",
            details: error.message
        });
    }
}



export async function saveResultToDB(req: Request, res: Response) {
    try {
        const { result, prompt } = req.body;

        if (!result || !prompt) {
            return res.status(400).json({
                error: true,
                msg: "Please provide both result and user prompt"
            });
        }


        const existingData = await UserPrompt.findOne({ response: result });

        if (existingData) {
            return res.status(200).json({
                error: false,
                msg: "Result already exists in database",
                data: existingData.response,
            });
        }


        // Save new entry
        const saveResultIntoDB = await UserPrompt.create({
            prompt,
            response: result
        });



        return res.status(201).json({
            error: false,
            msg: 'Response saved successfully!',
            data: saveResultIntoDB
        });

    } catch (error) {
        console.error("DB Error:", error);
        return res.status(500).json({
            error: true,
            msg: 'Failed to save result in DB'
        });
    }
}