// Türkiye Paralı Yollar, Sabit Radarlar ve Yol Çalışmaları Statik Veri Seti (2026 HGS Güncel Verileri)

// Sabit Paralı Yollar ve Köprüler (2026 KGM ve Yap-İşlet-Devret Güncel Fiyat Tarifesi)
const TOLL_ROADS = [
  { "name": "Osmangazi Köprüsü", "lat": 40.7582, "lng": 29.5039, "price": "995 TL" },
  { "name": "Yavuz Sultan Selim Köprüsü", "lat": 41.2025, "lng": 29.1189, "price": "125 TL" },
  { "name": "1915 Çanakkale Köprüsü", "lat": 40.3392, "lng": 26.6358, "price": "995 TL" },
  { "name": "Avrasya Tüneli", "lat": 41.0022, "lng": 29.0083, "price": "320 TL" },
  { "name": "Kuzey Marmara Otoyolu (O-7)", "lat": 41.15, "lng": 29.20, "price": "410 TL" },
  { "name": "İstanbul - İzmir Otoyolu (O-5)", "lat": 40.35, "lng": 28.50, "price": "1340 TL" },
  { "name": "Ankara - Niğde Otoyolu (O-21)", "lat": 38.80, "lng": 34.10, "price": "495 TL" },
  { "name": "Ankara - İstanbul Otoyolu (O-4)", "lat": 40.78, "lng": 31.50, "price": "260 TL" },
  { "name": "Adana - Şanlıurfa Otoyolu (O-52)", "lat": 37.05, "lng": 36.80, "price": "155 TL" }
];

// Sabit Radar Konumları (EDS koridorları)
const FIXED_RADARS = [
  { "name": "İstanbul D-100 EDS", "lat": 40.9902, "lng": 28.7255, "speedLimit": "80 km/s" },
  { "name": "Ankara Bulvarı EDS", "lat": 39.9312, "lng": 32.7845, "speedLimit": "82 km/s" },
  { "name": "İzmir Çevre Yolu EDS", "lat": 38.4552, "lng": 27.2012, "speedLimit": "110 km/s" },
  { "name": "Antalya Bulvarı EDS", "lat": 36.9112, "lng": 30.6845, "speedLimit": "70 km/s" },
  { "name": "Bursa D-200 Hız Koridoru", "lat": 40.2012, "lng": 29.0822, "speedLimit": "82 km/s" },
  { "name": "Kuzey Marmara Tünel İçi Radar", "lat": 41.1712, "lng": 28.9812, "speedLimit": "110 km/s" },
  { "name": "Osmangazi Köprüsü Çıkışı Radar", "lat": 40.7312, "lng": 29.5112, "speedLimit": "120 km/s" },
  { "name": "O-4 Hendek Geçişi Radar", "lat": 40.7899, "lng": 30.7512, "speedLimit": "120 km/s" },
  { "name": "O-21 Gölbaşı Girişi Radar", "lat": 39.7912, "lng": 32.8122, "speedLimit": "120 km/s" }
];

// Sabit Yol Çalışmaları
const ROAD_WORKS = [
  { "desc": "O-4 Otoyolu Köprü Bakım Çalışması", "lat": 40.8922, "lng": 29.3512, "duration": "Şerit Daralması" },
  { "desc": "O-5 Balıkesir Kesimi Asfalt Yenileme", "lat": 39.7512, "lng": 27.8122, "duration": "Tek Şeritten Ulaşım" },
  { "desc": "D-100 Bolu Dağı Heyelan Önleme Çalışması", "lat": 40.7412, "lng": 31.4512, "duration": "Yol Tamamen Kapalı (Tünel Geçişi)" },
  { "desc": "Ankara Kırıkkale Yolu Köprülü Kavşak Yapımı", "lat": 39.8612, "lng": 33.1512, "duration": "Hız Sınırı 30 km/s" },
  { "desc": "Muğla Fethiye Yurt İçi Yol Yapımı", "lat": 36.7512, "lng": 29.1122, "duration": "Kontrollü Geçiş" }
];

// Sabit Mola Alanları ve Dinlenme Tesisleri
const REST_AREAS = [
  { "name": "O-4 Highway Sakarya Rest Area (Mola Alanı)", "lat": 40.7485, "lng": 30.2922, "detail": "Restoran, Mescit, Dinlenme Alanı" },
  { "name": "O-4 Highway Bolu Dağı Dinlenme Tesisi", "lat": 40.7250, "lng": 31.5212, "detail": "Yöresel Restoranlar, Otel, Alışveriş" },
  { "name": "O-5 Highway Balıkesir Rest Area (Mola Alanı)", "lat": 39.8122, "lng": 27.8812, "detail": "Dinlenme Tesisleri, Fast Food" },
  { "name": "O-21 Highway Kulu Rest Area (Mola Alanı)", "lat": 39.1212, "lng": 32.9812, "detail": "Mescit, Çocuk Parkı, Kafe" },
  { "name": "O-7 Kuzey Marmara Otoyolu Dinlenme Tesisi", "lat": 41.1612, "lng": 29.3512, "detail": "Yemek Alanı, Dinlenme Noktası" }
];

// Sabit Akaryakıt İstasyonları (Petroller)
const GAS_STATIONS = [
  { "name": "O-4 Highway Düzce Opet Gas Station", "lat": 40.8122, "lng": 31.0122, "detail": "Market, Oto Yıkama, Elektrikli Şarj (Trugo)" },
  { "name": "O-4 Highway Bolu Shell Gas Station", "lat": 40.7188, "lng": 31.6212, "detail": "7/24 Açık Market, Starbucks Kahve" },
  { "name": "O-5 Highway Yalova Petrol Ofisi", "lat": 40.5912, "lng": 29.2812, "detail": "Market, Kafe, Elektrikli Şarj" },
  { "name": "O-5 Highway Manisa Shell Gas Station", "lat": 38.6812, "lng": 27.4212, "detail": "Market, Oto Bakım, 7/24 Açık" },
  { "name": "O-21 Highway Şereflikoçhisar Opet Gas Station", "lat": 38.8912, "lng": 33.5212, "detail": "Market, Dinlenme Alanı, Elektrikli Şarj (Trugo)" },
  { "name": "O-7 Highway Işıklar Shell Gas Station", "lat": 41.2212, "lng": 28.9112, "detail": "Market, Elektrikli Şarj, Restoran" }
];