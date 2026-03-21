import { model, Schema } from "mongoose";

const PromptSchema = new Schema({
    prompt: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        trim: true      
    },
    response: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // Taaki pata chale kab save hua tha

const UserPrompt = model('UserPrompt', PromptSchema);
export default UserPrompt;