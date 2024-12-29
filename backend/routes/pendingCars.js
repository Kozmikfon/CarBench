const express = require("express");
const PendingCar = require("../models/PendingCar"); // Bekleyen ilan modeli
const router = express.Router();

// Kullanıcı tarafından ilan verme
router.post("/", async (req, res) => {
  try {
    const newPendingCar = new PendingCar({
      urunAdi: req.body.urunAdi,
      marka: req.body.marka,
      model: req.body.model,
      fiyat: req.body.fiyat,
      yil: req.body.yil,
      kilometre: req.body.kilometre,
      yakitTipi: req.body.yakitTipi,
      vitesTipi: req.body.vitesTipi,
      renk: req.body.renk,
      motorHacmi: req.body.motorHacmi,
      motorGucu: req.body.motorGucu,
      kasaTipi: req.body.kasaTipi,
      aciklama: req.body.aciklama,
      resimURL: req.body.resimURL,
    });

    const savedCar = await newPendingCar.save();
    res.status(201).json({ message: "İlan başarıyla kaydedildi, admin onayı bekliyor.", data: savedCar });
  } catch (error) {
    console.error("İlan kaydedilirken hata:", error.message);
    res.status(500).json({ error: "Bir hata oluştu. İlan kaydedilemedi." });
  }
});

module.exports = router;
