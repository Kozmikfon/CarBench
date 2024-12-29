const express = require("express");
const cors = require("cors"); // CORS kütüphanesini dahil et
const fetch = require("node-fetch"); // fetch'i kullanmak için node-fetch kütüphanesi
const connectDB = require("./config/db"); // Veritabanı bağlantı dosyasını dahil et
require("dotenv").config(); // dotenv kütüphanesini yükleyin ve .env dosyasını okuyun

// MongoDB bağlantısını başlat
connectDB();

const app = express(); // `app` değişkenini burada başlatın

// Middleware
app.use(cors({
  origin: "*", // Tüm kaynaklara izin ver
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));
app.use(express.json()); // JSON formatındaki veri desteği

const pendingCarsRoute = require("./routes/pendingCars");
app.use("/api/pendinCars", pendingCarsRoute);

// Routes
const carRoutes = require("./routes/cars");
app.use("/api/cars", carRoutes); // Araç rotalarını ekle

// Test endpointi
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Chat Route
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mesaj eksik!" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // .env'den gelen API anahtarını kullanın
      },
      body: JSON.stringify({
        model: "gpt-4", // Kullanmak istediğiniz model
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.status(response.status).json({
        error: data.error.message || "OpenAI API'den hata alındı.",
      });
    }
  } catch (error) {
    console.error("Chat API hatası:", error.message);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

// Sunucuyu başlat
const PORT = 5019; // Port numarası
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
