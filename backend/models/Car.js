const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  urunAdi: { type: String, alias: "Ürün Adı" }, // Ürün Adı
  fiyat: { type: String, alias: "Fiyat" }, // Fiyat
  ilanNo: { type: String, alias: "İlan No" }, // İlan Numarası
  ilanTarihi: { type: String, alias: "İlan Tarihi" }, // İlan Tarihi
  marka: { type: String, alias: "Marka" }, // Marka
  seri: { type: String, alias: "Seri" }, // Seri
  model: { type: String, alias: "Model" }, // Model
  yil: { type: String, alias: "Yıl" }, // Yıl
  kilometre: { type: String, alias: "Kilometre" }, // Kilometre
  vitesTipi: { type: String, alias: "Vites Tipi" }, // Vites Tipi
  yakitTipi: { type: String, alias: "Yakıt Tipi" }, // Yakıt Tipi
  kasaTipi: { type: String, alias: "Kasa Tipi" }, // Kasa Tipi
  renk: { type: String, alias: "Renk" }, // Renk
  motorHacmi: { type: String, alias: "Motor Hacmi" }, // Motor Hacmi
  motorGucu: { type: String, alias: "Motor Gücü" }, // Motor Gücü
  cekis: { type: String, alias: "Çekiş" }, // Çekiş
  aracDurumu: { type: String, alias: "Araç Durumu" }, // Araç Durumu
  ortYakitTuketimi: { type: String, alias: "Ort. Yakıt Tüketimi" }, // Ortalama Yakıt Tüketimi
  depoHacmi: { type: String, alias: "Yakıt Deposu" }, // Yakıt Deposu
  boyaDegisen: { type: String, alias: "Boya-Değişen" }, // Boya/Değişen
  takasaUygun: { type: String, alias: "Takasa Uygun" }, // Takasa Uygunluk
  kimden: { type: String, alias: "Kimden" }, // Kimden
});

module.exports = mongoose.model("Car", carSchema, "car_listings");
