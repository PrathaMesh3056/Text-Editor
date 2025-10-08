// api/generate.js

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Get the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the prompts for the AI
const prompts = {
  summarize: "Summarize the following text concisely:",
  improve: "Proofread and improve the following text for clarity, grammar, and style, while preserving its original meaning:",
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
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
}