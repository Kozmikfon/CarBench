const express = require("express");
const PendingCar = require("../models/PendingCar");
const Car = require("../models/Car");
const router = express.Router();

// Admin ilan onayı
router.post("/approve/:id", async (req, res) => {
  try {
    const carId = req.params.id;

    // Bekleyen ilanı bul
    const pendingCar = await PendingCar.findById(carId);
    if (!pendingCar) {
      return res.status(404).json({ message: "İlan bulunamadı." });
    }

    // Bekleyen ilanı car_listings'e kaydet
    const newCar = new Car({
      urunAdi: pendingCar.urunAdi,
      marka: pendingCar.marka,
      model: pendingCar.model,
      fiyat: pendingCar.fiyat,
      yil: pendingCar.yil,
      kilometre: pendingCar.kilometre,
      yakitTipi: pendingCar.yakitTipi,
      vitesTipi: pendingCar.vitesTipi,
      renk: pendingCar.renk,
      motorHacmi: pendingCar.motorHacmi,
      motorGucu: pendingCar.motorGucu,
      kasaTipi: pendingCar.kasaTipi,
      aciklama: pendingCar.aciklama,
      resimURL: pendingCar.resimURL,
    });

    await newCar.save(); // `car_listings` koleksiyonuna ekle
    await PendingCar.findByIdAndDelete(carId); // Bekleyen ilanı sil

    res.status(200).json({ message: "İlan onaylandı ve car_listings'e eklendi.", data: newCar });
  } catch (error) {
    console.error("İlan onaylanırken hata:", error.message);
    res.status(500).json({ error: "İlan onaylanamadı. Bir hata oluştu." });
  }
});

module.exports = router;
