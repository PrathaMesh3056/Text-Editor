// server.js
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- Initialization ---
const app = express();
const PORT = process.env.PORT || 3001; // Render provides the PORT env var

// Get the API key from environment variables
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the prompts for the AI
const prompts = {
  summarize: "Summarize the following text concisely:",
  improve: "Proofread and improve the following text for clarity, grammar, and style, while preserving its original meaning:",
};

// --- Middleware ---
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// --- Routes ---

// ✨ New Health Check Route ✨
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

// Main AI generation route
app.post('/api/generate', async (req, res) => {
  try {
    const { text, action } = req.body;

    if (!text || !action || !prompts[action]) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const fullPrompt = `${prompts[action]}\n\n---\n\n${text}`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const aiResult = response.text();

    return res.status(200).json({ result: aiResult });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return res.status(500).json({ error: 'Failed to generate content from AI' });
  }
});

// --- Server Activation ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});