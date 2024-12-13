document.addEventListener("DOMContentLoaded", async function () {
    const carList = document.getElementById("car-list");
  
    async function fetchCars() {
      carList.innerHTML = "<p>Veriler yükleniyor...</p>";
  
      try {
        console.log("API çağrısı başlıyor...");
        const response = await fetch("http://localhost:5007/api/cars");
        console.log("API yanıtı alındı:", response);
  
        if (!response.ok) throw new Error("API isteği başarısız oldu!");
  
        const result = await response.json();
        console.log("API verisi çözüldü:", result);
  
        const { data } = result; // API'den dönen "data" alanı
        carList.innerHTML = ""; // Önceki içeriği temizle
  
        if (data.length === 0) {
          carList.innerHTML = "<p>Hiç araç bulunamadı.</p>";
          return;
        }
  
        data.forEach((car) => {
          console.log("Araç işleniyor:", car);
          const carItem = document.createElement("div");
          carItem.classList.add("car-item");
          carItem.innerHTML = `
            <h2>${car["Ürün Adı"] || "Bilinmeyen Ürün Adı"}</h2>
            <p><strong>Fiyat:</strong> ${car.Fiyat || "Bilinmiyor"}</p>
            <p><strong>Marka:</strong> ${car.Marka || "Bilinmiyor"}</p>
            <p><strong>Model:</strong> ${car.Model || "Bilinmiyor"}</p>
            <p><strong>Yıl:</strong> ${car["Yıl"] || "Bilinmiyor"}</p>
          `;
          carList.appendChild(carItem);
        });
      } catch (error) {
        console.error("Veriler alınırken bir hata oluştu:", error);
        carList.innerHTML = "<p>Veri alınırken bir sorun oluştu.</p>";
      }
    }
  
    fetchCars();
  });
  