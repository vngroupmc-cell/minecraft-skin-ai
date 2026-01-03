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

app.post("/api/skin", async (req, res) => {
  try{
    const { prompt } = req.body;

    const img = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "512x512"
    });

    res.json({ image: img.data[0].url });

  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("AI running on", PORT)
);
