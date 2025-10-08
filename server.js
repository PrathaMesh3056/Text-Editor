import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const PORT = process.env.PORT || 3001;

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the prompts for the AI
const prompts = {
  summarize: "Summarize the following text concisely:",
  improve: "Proofread and improve the following text for clarity, grammar, and style, while preserving its original meaning. Provide at least two different options, labeled as **Option 1** and **Option 2**.",
  formatCitation: `Based on the following text, which could be a URL, book title, or journal article, generate a full academic citation. Provide the citation in the three major formats: APA, MLA, and Chicago. Label each one clearly as "APA:", "MLA:", and "Chicago:". If you cannot determine a source from the text, respond with "Could not generate citation from the provided text."`
};

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
