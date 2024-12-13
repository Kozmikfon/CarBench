const express = require("express");
const Car = require("../models/Car"); // Car modelini dahil edin
const router = express.Router();

// Tüm araçları listeleme
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find(); // Tüm araçları getir
    res.json({ total: cars.length, data: cars }); // Toplam sayıyı ve araçları döndür
  } catch (error) {
    res.status(500).json({ error: "Veri alınırken bir hata oluştu." });
  }
});

// Filtreleme ile araç getir
router.get("/filter", async (req, res) => {
  const { marka, fiyatMin, fiyatMax, yil, yakitTipi, kasaTipi, sortBy, order } = req.query;

  try {
    const query = {};

    // Marka filtresi (case-insensitive)
    if (marka) query["Marka"] = { $regex: new RegExp(marka, "i") };

    // Kasa Tipi filtresi
    if (kasaTipi) query["Kasa Tipi"] = { $regex: new RegExp(kasaTipi, "i") };

    // Fiyat filtresi
    if (fiyatMin || fiyatMax) {
      query["Fiyat"] = {};
      if (fiyatMin) query["Fiyat"].$gte = parseInt(fiyatMin);
      if (fiyatMax) query["Fiyat"].$lte = parseInt(fiyatMax);
    }

    // Yıl filtresi
    if (yil) query["Yıl"] = yil;

    // Yakıt Tipi filtresi
    if (yakitTipi) query["Yakıt Tipi"] = { $regex: new RegExp(yakitTipi, "i") };

    // Sıralama
    const sortField = sortBy || "Fiyat"; // Varsayılan sıralama alanı
    const sortOrder = order === "desc" ? -1 : 1; // Sıralama düzeni (asc/desc)

    const filteredCars = await Car.find(query).sort({ [sortField]: sortOrder });
    res.json(filteredCars);
  } catch (error) {
    console.error("Filtreleme hatası:", error);
    res.status(500).json({ error: "Filtrelenmiş veri alınırken bir hata oluştu." });
  }
});

module.exports = router; // Router'ı dışa aktar
