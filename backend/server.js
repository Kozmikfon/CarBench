const express = require("express");
const cors = require("cors"); // CORS kütüphanesini dahil et
const connectDB = require("./config/db"); // Veritabanı bağlantı dosyasını dahil et

// MongoDB bağlantısını başlat
connectDB();

const app = express(); // `app` değişkenini burada başlatın

// Middleware
app.use(cors()); // CORS middleware'ini ekle
app.use(express.json()); // JSON formatındaki veri desteği

// Routes
const carRoutes = require("./routes/cars");
app.use("/api/cars", carRoutes); // Araç rotalarını ekle

// Test endpointi
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Sunucuyu başlat
const PORT = 5007; // Port numarası
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
