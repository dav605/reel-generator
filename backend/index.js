const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

// ✅ Use the latest API with v1
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
aapp.use(cors({
  origin: "*",
  methods: ["GET", "POST","OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("backend");
})

app.post('/generate', async (req, res) => {
  const { prompt, tone, duration } = req.body;

  const fullPrompt = `
You are a professional script writer.
Generate a creative Instagram reel script based on:
- Prompt: "${prompt}"
- Tone: "${tone}"
- Duration: ${duration} seconds

Return output like:
1. Song: (song name)
2. Hashtags: #tag1 #tag2 #tag3
3. Script:
0s: ...
1s: ...
(Continue till ${duration - 1}s)
`;

  try {
    // ✅ This is now using Gemini Pro on v1
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash', // keep as is
    });

    const result = await model.generateContent(fullPrompt);

    const response = await result.response;
    const text = response.text();

    // ✅ Optional console log for debugging
    console.log("Generated output:\n", text);

    // Extract song, hashtags, and script
    const songMatch = text.match(/song\s*[:\-]\s*(.+)/i);
    const hashtagsMatch = text.match(/hashtags\s*[:\-]\s*(.+)/i);
    const lines = text.split('\n').filter(line => /^\d+s:/.test(line));

    const data = {
      song: songMatch ? songMatch[1].trim() : 'No song found',
      hashtags: hashtagsMatch
        ? hashtagsMatch[1].match(/#[^\s#]+/g) || []
        : [],
      script: lines,
    };

    res.json(data);
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate script' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at : http://localhost:${PORT}`));
