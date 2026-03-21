import express from "express";
import 'dotenv/config';
import AiRouter from "../routes/handlePrompt.js";
import connectDB from "./config/db.js";
import cors from "cors";
const app = express();
// Connect To Database 
connectDB();
app.use(cors());
// app.use(
//   cors({
//     origin: ["https://admin.nuhvibe.com", "http://localhost:3000", "http://localhost:5173"],
//     credentials: true,
//   })
// );
// Allows the server to understand and read JSON data sent from the frontend
app.use(express.json());
// Connects all AI-related routes with the prefix "/api"
// Example route: http://localhost:5000/api/chat
app.use("/api", AiRouter);
// --- SERVER CONFIGURATION ---
const PORT = process.env.PORT || 5000;
// Basic route to check if the server is working
app.get("/", (_, res) => {
    res.send("BlinkFlow AI Server is Running! 🚀");
});
const startServer = () => {
    try {
        if (!process.env.PORT) {
            console.warn('⚠️  Warning: PORT missing in .env, using default: 5000');
        }
        app.listen(PORT, () => {
            console.log(`
✅ Server is live!
📡 URL: http://localhost:${PORT}
📂 API Base: http://localhost:${PORT}/api
            `);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=app.js.map