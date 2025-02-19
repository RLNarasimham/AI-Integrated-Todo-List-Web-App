require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const PORT = 5000;  // ✅ Keep it on port 5000

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: message }] }]
            }
        );

        const aiReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

        res.json({ reply: aiReply });
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "AI assistant failed to respond. Try again later." });
    }
});

app.listen(PORT, () => console.log(`Gemini API Server running on port ${PORT}`));