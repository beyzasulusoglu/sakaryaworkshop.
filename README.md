# Sakarya Workshop — Web Sitesi

Seramik, tablo, pasta ve çiçek buketi atölyeleri için tek sayfalık tanıtım sitesi.
Saf HTML + CSS + JavaScript. Framework veya backend gerektirmez.

## Çalıştırma (VS Code)

1. Klasörü VS Code'da açın: **File → Open Folder → sakarya-workshop**
2. **Live Server** eklentisini kurun (Extensions → "Live Server", Ritwick Dey).
3. `index.html` üzerinde sağ tık → **Open with Live Server**.

> Eklenti olmadan da çalışır: `index.html` dosyasına çift tıklamanız yeterli.

## Klasör yapısı

```
sakarya-workshop/
├── index.html              → Sayfa iskeleti (tüm bölümler)
├── css/
│   ├── variables.css       → RENKLER, yazı tipleri, boşluklar (buradan değiştirin)
│   ├── base.css            → Temel stiller, butonlar, animasyonlar
│   └── sections.css        → Navbar, hero, hakkımızda, workshoplar, galeri, iletişim, footer
├── js/
│   ├── config.js           → İLETİŞİM BİLGİLERİ (telefon, WhatsApp, Instagram, e-posta)
│   └── main.js             → Menü, scroll animasyonu, galeri büyütme
├── images/
│   ├── hero/               → hero-main.jpg, hero-detail-1.jpg, hero-detail-2.jpg
│   ├── about/              → about-1.jpg, about-2.jpg
│   ├── workshops/          → seramik.jpg, tablo.jpg, pasta.jpg, cicek.jpg
│   └── gallery/            → galeri-01.jpg … galeri-12.jpg
└── assets/
    └── icons/favicon.svg
```

## Sık yapılacak değişiklikler

**Görsel değiştirmek:** Yeni fotoğrafı ilgili klasöre **aynı dosya adıyla** kaydedin.
Galeri görselleri hangi boyutta olursa olsun otomatik olarak kare kırpılır.
İpucu: fotoğrafları uzun kenarı ~1200–1600 px olacak şekilde küçültürseniz site daha hızlı açılır.
Farklı bir isim kullanırsanız `index.html` içindeki `src="…"` yolunu da güncelleyin ve
`alt="…"` açıklamasını fotoğrafa uygun yazın.

**İletişim bilgileri:** `js/config.js` dosyasını açın. WhatsApp numarasını yalnızca rakamla,
başında `90` olacak şekilde yazın (ör. `905551234567`).

**Google Maps:** Yine `js/config.js` içinde. En doğrusu: Google Maps'te işletmenizi açın →
**Paylaş → Bağlantıyı kopyala** → linki `mapsUrl` alanına yapıştırın. `mapsUrl` boş kalırsa
`mapsQuery` alanındaki adres Google Maps'te aranır. Telefonda Google Maps uygulaması, bilgisayarda yeni sekme açılır.

**Renkler:** `css/variables.css` → `--color-…` değişkenleri.
Her workshop satırının renk dokunuşu `index.html` içindeki `data-accent="peach | sky | rose | lilac"` değeridir.

**Yazı tipleri:** Google Fonts'tan Fraunces (başlık) ve DM Sans (metin) kullanılır;
internet bağlantısı yoksa sistem yazı tipleri devreye girer.
