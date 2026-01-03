import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/generate/skin", async (req, res) => {
  try {
    const { prompt, type } = req.body;

    const fullPrompt =
      type === "skin"
        ? `Minecraft skin 512x512 PNG, flat UV layout, no background, clean pixel art, ${prompt}`
        : `Minecraft character fanart, front view, realistic lighting, studio photo, ${prompt}`;

    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt: fullPrompt,
      size: "512x512"
    });

    res.json({ image: image.data[0].url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("AI running on port " + PORT);
});
