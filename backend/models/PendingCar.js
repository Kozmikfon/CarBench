const mongoose = require("mongoose");

const pendingCarSchema = new mongoose.Schema({
  urunAdi: { type: String, required: true },
  marka: { type: String, required: true },
  model: { type: String, required: true },
  fiyat: { type: String, required: true },
  yil: { type: Number, required: true },
  kilometre: { type: String, required: true },
  yakitTipi: { type: String },
  vitesTipi: { type: String },
  renk: { type: String },
  motorHacmi: { type: String },
  motorGucu: { type: String },
  kasaTipi: { type: String },
  aciklama: { type: String },
  resimURL: { type: String },
});

module.exports = mongoose.model("PendingCar", pendingCarSchema, "pending_listings");
