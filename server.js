import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/skin", (req, res) => {
  const { prompt } = req.body;

  res.json({
    image: "https://dummyimage.com/512x512/7ddcff/000.png&text=Skin+512"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
