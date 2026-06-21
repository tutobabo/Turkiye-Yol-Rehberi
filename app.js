// Türkiye Yol Güzergah Rehberi - Uygulama Mantığı (Çok Dilli Entegrasyon & Kişisel Navigasyon Haritası)

// Turkish Title Case Helper Function
function turkishTitleCase(str) {
    if (!str) return '';
    return str.split(' ').map(word => {
        if (!word) return '';
        const first = word.charAt(0);
        const rest = word.slice(1);
        
        let firstCap = first.toUpperCase();
        if (first === 'i') firstCap = 'İ';
        else if (first === 'ı') firstCap = 'I';
        else if (first === 'ş') firstCap = 'Ş';
        else if (first === 'ğ') firstCap = 'Ğ';
        else if (first === 'ü') firstCap = 'Ü';
        else if (first === 'ö') firstCap = 'Ö';
        else if (first === 'ç') firstCap = 'Ç';
        
        let restLower = '';
        for (let char of rest) {
            if (char === 'İ') restLower += 'i';
            else if (char === 'I') restLower += 'ı';
            else if (char === 'Ş') restLower += 'ş';
            else if (char === 'Ğ') restLower += 'ğ';
            else if (char === 'Ü') restLower += 'ü';
            else if (char === 'Ö') restLower += 'ö';
            else if (char === 'Ç') restLower += 'ç';
            else restLower += char.toLowerCase();
        }
        return firstCap + restLower;
    }).join(' ');
}

// Transform raw cities data with correct casing
const CITIES_DATA = CITIES_RAW_DATA.map(city => ({
    name: turkishTitleCase(city.name),
    plate: city.plate,
    latitude: parseFloat(city.latitude),
    longitude: parseFloat(city.longitude),
    counties: city.counties.map(county => turkishTitleCase(county)).sort((a, b) => a.localeCompare(b, 'tr'))
})).sort((a, b) => a.name.localeCompare(b.name, 'tr'));

// 12 Languages Translation Dictionary (Updated for Real-time GPS Navigation Mode)
const TRANSLATIONS = {
    tr: {
        titleAccent: "Güzergah Rehberi",
        startLabel: "Başlangıç Noktası",
        startPlaceholder: "İl veya ilçe arayın (veya GPS kullanın)",
        destLabel: "Varış Noktası",
        destPlaceholder: "Gideceğiniz il veya ilçeyi yazın",
        calculateBtn: "Yol Tarifi Hesapla",
        distance: "Toplam Mesafe",
        duration: "Tahmini Süre",
        simStart: "Navigasyonu Başlat",
        simStop: "Navigasyonu Durdur",
        eventsShow: "Gösterilecek Olaylar",
        tollsLabel: "Paralı Otoyollar ve Köprüler",
        tollsDesc: "Otoban ücretleri ve geçiş noktaları",
        radarsLabel: "Hız Denetim Radarları",
        radarsDesc: "Sabit ve mobil EDS kontrol noktaları",
        worksLabel: "Aktif Yol Çalışmaları",
        worksDesc: "Yol yapım, daralma ve bakım bölgeleri",
        warningsTitle: "Yol Üzerindeki Uyarılar",
        warningsDescDefault: "Rota çizildiğinde uyarılar burada listelenecektir.",
        noWarnings: "Güzergah üzerinde herhangi bir uyarı bulunmuyor.",
        hudNavigating: "Rota İzleniyor...",
        hudCalculating: "Hesaplanıyor...",
        gpsUnsupported: "GPS desteklenmiyor. Başlangıç Ankara olarak ayarlandı.",
        gpsSearching: "Konumunuz aranıyor...",
        gpsSuccess: "Konumunuz başarıyla bulundu.",
        gpsVoiceStart: "Başlangıç konumunuz alındı.",
        gpsFailed: "Konum izni alınamadı. Rota başlangıcı Ankara olarak ayarlandı.",
        routePlanning: "Güzergah planlanıyor...",
        routeSuccess: "Rota başarıyla çizildi.",
        routeVoiceSummary: (dist, dur, inc) => `Rota bulundu. Rota mesafesi ${dist} kilometre. Seyahat süresi ${dur}. Güzergah üzerinde ${inc} adet olay tespit edildi.`,
        speakRadar: (dist, speed) => `Dikkat! ${dist} kilometre sonra hız kontrol radarı bulunmaktadır. Hız sınırı ${speed}.`,
        speakWork: (dist, desc) => `Dikkat! ${dist} kilometre sonra yol çalışması bulunmaktadır. Durum: ${desc}. Lütfen yavaşlayın.`,
        speakToll: (dist, name, price) => `Yaklaşık ${dist} kilometre sonra ücretli geçiş noktası bulunmaktadır. ${name}. Ücret ${price}.`,
        speakFinished: "Hedefinize ulaştınız. Yolculuk tamamlandı.",
        speakNavStart: "Navigasyon başladı, güvenli yolculuklar dileriz.",
        hour: "saat",
        minute: "dakika",
        kmRemaining: (rem) => `${rem} km kaldı`,
        restLabel: "Mola Alanları ve Dinlenme Tesisleri",
        restDesc: "Yol üzerindeki dinlenme ve mola yerleri",
        gasLabel: "Akaryakıt İstasyonları (Petroller)",
        gasDesc: "Akaryakıt istasyonları ve şarj noktaları",
        speakRest: (dist, name) => `Yaklaşık ${dist} kilometre sonra dinlenme tesisi bulunmaktadır. ${name}.`,
        speakGas: (dist, name) => `Yaklaşık ${dist} kilometre sonra akaryakıt istasyonu bulunmaktadır. ${name}.`
    },
    en: {
        titleAccent: "Route Guide",
        startLabel: "Starting Point",
        startPlaceholder: "Search city or district (or use GPS)",
        destLabel: "Destination",
        destPlaceholder: "Enter your destination city or district",
        calculateBtn: "Calculate Route",
        distance: "Total Distance",
        duration: "Estimated Duration",
        simStart: "Start Navigation",
        simStop: "Stop Navigation",
        eventsShow: "Events to Display",
        tollsLabel: "Toll Roads & Bridges",
        tollsDesc: "Highway tolls and payment gates",
        radarsLabel: "Speed Radars",
        radarsDesc: "Fixed and mobile speed cameras",
        worksLabel: "Active Road Works",
        worksDesc: "Road works, construction and lane closures",
        warningsTitle: "Warnings Along the Route",
        warningsDescDefault: "Warnings will be listed here when route is planned.",
        noWarnings: "There are no warnings on the route.",
        hudNavigating: "Following Route...",
        hudCalculating: "Calculating...",
        gpsUnsupported: "GPS is not supported. Start set to Ankara.",
        gpsSearching: "Searching for location...",
        gpsSuccess: "Location successfully found.",
        gpsVoiceStart: "Start location received.",
        gpsFailed: "Location permission denied. Start set to Ankara.",
        routePlanning: "Planning route...",
        routeSuccess: "Route calculated successfully.",
        routeVoiceSummary: (dist, dur, inc) => `Route found. Distance is ${dist} kilometers. Travel time is ${dur}. There are ${inc} warnings along the route.`,
        speakRadar: (dist, speed) => `Warning! Speed camera in ${dist} kilometers. Speed limit is ${speed}.`,
        speakWork: (dist, desc) => `Warning! Road construction in ${dist} kilometers. Status: ${desc}. Please slow down.`,
        speakToll: (dist, name, price) => `Toll gate in ${dist} kilometers. ${name}. Fee is ${price}.`,
        speakFinished: "You have reached your destination. Trip finished.",
        speakNavStart: "Navigation started, drive safely.",
        hour: "hours",
        minute: "minutes",
        kmRemaining: (rem) => `${rem} km remaining`,
        restLabel: "Rest Areas & Facilities",
        restDesc: "Rest stops and facilities along route",
        gasLabel: "Gas Stations & Charging Hubs",
        gasDesc: "Gas stations and EV charging points",
        speakRest: (dist, name) => `Rest area in ${dist} kilometers. ${name}.`,
        speakGas: (dist, name) => `Gas station in ${dist} kilometers. ${name}.`
    },
    es: {
        titleAccent: "Guía de Rutas",
        startLabel: "Punto de Inicio",
        startPlaceholder: "Buscar ciudad o distrito (o usar GPS)",
        destLabel: "Destino",
        destPlaceholder: "Ingrese ciudad o distrito de destino",
        calculateBtn: "Calcular Ruta",
        distance: "Distancia Total",
        duration: "Duración Estimada",
        simStart: "Iniciar Navegación",
        simStop: "Detener Navegación",
        eventsShow: "Eventos a Mostrar",
        tollsLabel: "Peajes y Puentes",
        tollsDesc: "Tarifas de autopista y puntos de control",
        radarsLabel: "Radares de Velocidad",
        radarsDesc: "Radares fijos y móviles de velocidad",
        worksLabel: "Obras Activas",
        worksDesc: "Mantenimiento vial y cierre de carriles",
        warningsTitle: "Alertas en Ruta",
        warningsDescDefault: "Las alertas se listarán aquí cuando se trace la ruta.",
        noWarnings: "No hay alertas en la ruta.",
        hudNavigating: "Siguiendo Ruta...",
        hudCalculating: "Calculando...",
        gpsUnsupported: "GPS no soportado. Inicio establecido en Ankara.",
        gpsSearching: "Buscando ubicación...",
        gpsSuccess: "Ubicación encontrada con éxito.",
        gpsVoiceStart: "Posición inicial recibida.",
        gpsFailed: "Permiso de ubicación denegado. Inicio establecido en Ankara.",
        routePlanning: "Planificando ruta...",
        routeSuccess: "Ruta trazada con éxito.",
        routeVoiceSummary: (dist, dur, inc) => `Ruta encontrada. Distancia ${dist} kilómetros. Tiempo de viaje ${dur}. Se detectaron ${inc} alertas.`,
        speakRadar: (dist, speed) => `¡Atención! Radar de velocidad en ${dist} kilómetros. Límite de velocidad ${speed}.`,
        speakWork: (dist, desc) => `¡Atención! Obras en la vía en ${dist} kilómetros. Estado: ${desc}. Reduzca la velocidad.`,
        speakToll: (dist, name, price) => `Peaje en ${dist} kilómetros. ${name}. Tarifa ${price}.`,
        speakFinished: "Ha llegado a su destino. Viaje completado.",
        speakNavStart: "Navegación iniciada, buen viaje.",
        hour: "horas",
        minute: "minutos",
        kmRemaining: (rem) => `Quedan ${rem} km`
    },
    fr: {
        titleAccent: "Guide d'Itinéraire",
        startLabel: "Point de Départ",
        startPlaceholder: "Rechercher ville ou district (ou GPS)",
        destLabel: "Destination",
        destPlaceholder: "Saisir la ville ou district de destination",
        calculateBtn: "Calculer l'Itinéraire",
        distance: "Distance Totale",
        duration: "Durée Estimée",
        simStart: "Démarrer la Navigation",
        simStop: "Arrêter la Navigation",
        eventsShow: "Événements à Afficher",
        tollsLabel: "Péages et Ponts",
        tollsDesc: "Tarifs d'autoroute et points de contrôle",
        radarsLabel: "Radars de Vitesse",
        radarsDesc: "Radars de vitesse fixes et mobiles",
        worksLabel: "Travaux Actifs",
        worksDesc: "Travaux routiers et fermetures de voies",
        warningsTitle: "Alertes sur l'Itinéraire",
        warningsDescDefault: "Les alertes s'afficheront ici après calcul du trajet.",
        noWarnings: "Aucune alerte sur le trajet.",
        hudNavigating: "Suivi de l'itinéraire...",
        hudCalculating: "Calcul...",
        gpsUnsupported: "GPS non supporté. Départ réglé sur Ankara.",
        gpsSearching: "Recherche de localisation...",
        gpsSuccess: "Localisation trouvée avec succès.",
        gpsVoiceStart: "Position de départ reçue.",
        gpsFailed: "Accès refusé. Départ réglé sur Ankara.",
        routePlanning: "Planification du trajet...",
        routeSuccess: "Itinéraire calculé avec succès.",
        routeVoiceSummary: (dist, dur, inc) => `Itinéraire trouvé. Distance ${dist} kilomètres. Temps de trajet ${dur}. ${inc} alertes détectées.`,
        speakRadar: (dist, speed) => `Attention! Radar de vitesse dans ${dist} kilomètres. Limite de vitesse ${speed}.`,
        speakWork: (dist, desc) => `Attention! Travaux routiers dans ${dist} kilomètres. Statut: ${desc}. Ralentissez.`,
        speakToll: (dist, name, price) => `Péage dans ${dist} kilomètres. ${name}. Tarif ${price}.`,
        speakFinished: "Vous êtes arrivé à destination. Trajet terminé.",
        speakNavStart: "Navigation démarrée, bon voyage.",
        hour: "heures",
        minute: "minutes",
        kmRemaining: (rem) => `Reste ${rem} km`
    },
    zh: {
        titleAccent: "路线规划指南",
        startLabel: "起点",
        startPlaceholder: "搜索城市或区县 (或使用GPS)",
        destLabel: "终点",
        destPlaceholder: "输入目的地城市或区县",
        calculateBtn: "计算路线",
        distance: "总距离",
        duration: "预计时间",
        simStart: "开始导航",
        simStop: "停止导航",
        eventsShow: "显示事件",
        tollsLabel: "收费公路与桥梁",
        tollsDesc: "高速公路收费及过路闸口",
        radarsLabel: "测速雷达",
        radarsDesc: "固定和移动测速照相机",
        worksLabel: "道路施工",
        worksDesc: "道路维修、施工及车道封闭",
        warningsTitle: "路线警示",
        warningsDescDefault: "规划路线后，警示将显示在此处。",
        noWarnings: "路线上无警示事件。",
        hudNavigating: "正在追踪路线...",
        hudCalculating: "计算中...",
        gpsUnsupported: "GPS不受支持，起点设为安卡拉。",
        gpsSearching: "正在搜索位置...",
        gpsSuccess: "成功找到位置。",
        gpsVoiceStart: "已收到起点位置。",
        gpsFailed: "权限被拒绝，起点设为安卡拉。",
        routePlanning: "正在规划路线...",
        routeSuccess: "路线计算成功。",
        routeVoiceSummary: (dist, dur, inc) => `路线已找到。距离 ${dist} 公里。行驶时间 ${dur}。检测到 ${inc} 个警示事件。`,
        speakRadar: (dist, speed) => `注意！ ${dist} 公里后有测速雷达。限速 ${speed}。`,
        speakWork: (dist, desc) => `注意！ ${dist} 公里后有道路施工。情况： ${desc}。请减速慢行。`,
        speakToll: (dist, name, price) => ` ${dist} 公里后有收费站。 ${name}。费用 ${price}。`,
        speakFinished: "您已到达目的地。行程结束。",
        speakNavStart: "导航开始，祝您旅途平安。",
        hour: "小时",
        minute: "分钟",
        kmRemaining: (rem) => `剩余 ${rem} 公里`
    },
    it: {
        titleAccent: "Guida Itinerario",
        startLabel: "Punto di Partenza",
        startPlaceholder: "Cerca città o distretto (o usa il GPS)",
        destLabel: "Destinazione",
        destPlaceholder: "Inserisci città o distretto di destinazione",
        calculateBtn: "Calcola Percorso",
        distance: "Distanza Totale",
        duration: "Tempo Stimato",
        simStart: "Avvia Navigazione",
        simStop: "Ferma Navigazione",
        eventsShow: "Eventi da Mostrare",
        tollsLabel: "Pedaggi e Ponti",
        tollsDesc: "Tariffe autostradali e punti di controllo",
        radarsLabel: "Radar di Velocità",
        radarsDesc: "Autovelox fissi e mobili",
        worksLabel: "Lavori in Corso",
        worksDesc: "Manutenzione stradale e corsie chiuse",
        warningsTitle: "Avvisi sul Percorso",
        warningsDescDefault: "Gli avvisi appariranno qui dopo il calcolo.",
        noWarnings: "Nessun avviso sul percorso.",
        hudNavigating: "Seguendo il percorso...",
        hudCalculating: "Calcolo...",
        gpsUnsupported: "GPS non supportato. Partenza impostata su Ankara.",
        gpsSearching: "Ricerca posizione...",
        gpsSuccess: "Posizione trovata con successo.",
        gpsVoiceStart: "Posizione iniziale ricevuta.",
        gpsFailed: "Permesso negato. Partenza impostata su Ankara.",
        routePlanning: "Pianificazione percorso...",
        routeSuccess: "Percorso calcolato con successo.",
        routeVoiceSummary: (dist, dur, inc) => `Percorso trovato. Distanza ${dist} chilometri. Tempo di viaggio ${dur}. Rilevati ${inc} avvisi.`,
        speakRadar: (dist, speed) => `Attenzione! Autovelox a ${dist} chilometri. Limite di velocità ${speed}.`,
        speakWork: (dist, desc) => `Attenzione! Lavori stradali a ${dist} chilometri. Stato: ${desc}. Rallentare.`,
        speakToll: (dist, name, price) => `Casello a ${dist} chilometri. ${name}. Tariffa ${price}.`,
        speakFinished: "Sei arrivato a destinazione. Viaggio completato.",
        speakNavStart: "Navigazione avviata, buon viaggio.",
        hour: "ore",
        minute: "minuti",
        kmRemaining: (rem) => `Mancano ${rem} km`
    },
    de: {
        titleAccent: "Routenplaner",
        startLabel: "Startpunkt",
        startPlaceholder: "Suche Stadt/Bezirk (oder nutze GPS)",
        destLabel: "Zielort",
        destPlaceholder: "Zielort (Stadt oder Bezirk) eingeben",
        calculateBtn: "Route berechnen",
        distance: "Gesamtstrecke",
        duration: "Geschätzte Zeit",
        simStart: "Navigation starten",
        simStop: "Navigation stoppen",
        eventsShow: "Anzuzeigende Ereignisse",
        tollsLabel: "Mautstraßen & Brücken",
        tollsDesc: "Autobahngebühren und Mautstellen",
        radarsLabel: "Blitzer & Radare",
        radarsDesc: "Feste und mobile Geschwindigkeitsmesser",
        worksLabel: "Baustellen",
        worksDesc: "Straßenarbeiten und Fahrbahnsperrungen",
        warningsTitle: "Warnungen auf der Route",
        warningsDescDefault: "Warnungen werden hier aufgelistet, wenn Route geplant ist.",
        noWarnings: "Keine Warnungen auf der Route.",
        hudNavigating: "Route folgen...",
        hudCalculating: "Berechnen...",
        gpsUnsupported: "GPS nicht unterstützt. Start auf Ankara gesetzt.",
        gpsSearching: "Suche Standort...",
        gpsSuccess: "Standort erfolgreich gefunden.",
        gpsVoiceStart: "Startposition empfangen.",
        gpsFailed: "Zugriff verweigert. Start auf Ankara gesetzt.",
        routePlanning: "Route wird geplant...",
        routeSuccess: "Route erfolgreich berechnet.",
        routeVoiceSummary: (dist, dur, inc) => `Route gefunden. Strecke ${dist} Kilometer. Reisezeit ${dur}. ${inc} Warnungen erkannt.`,
        speakRadar: (dist, speed) => `Achtung! Geschwindigkeitskontrolle in ${dist} Kilometern. Tempolimit ${speed}.`,
        speakWork: (dist, desc) => `Achtung! Baustelle in ${dist} Kilometern. Zustand: ${desc}. Bitte verlangsamen.`,
        speakToll: (dist, name, price) => `Mautstelle in ${dist} Kilometern. ${name}. Gebühr ${price}.`,
        speakFinished: "Sie haben Ihr Ziel erreicht. Fahrt beendet.",
        speakNavStart: "Navigation gestartet, gute Fahrt.",
        hour: "Stunden",
        minute: "Minuten",
        kmRemaining: (rem) => `Noch ${rem} km`
    },
    nl: {
        titleAccent: "Routegids",
        startLabel: "Vertrekpunt",
        startPlaceholder: "Zoek stad of district (of gebruik GPS)",
        destLabel: "Bestemming",
        destPlaceholder: "Voer bestemming (stad of district) in",
        calculateBtn: "Bereken Route",
        distance: "Totale Afstand",
        duration: "Geschatte Tijd",
        simStart: "Start Navigatie",
        simStop: "Stop Navigatie",
        eventsShow: "Weer te geven gebeurtenissen",
        tollsLabel: "Tolwegen & Bruggen",
        tollsDesc: "Snelwegtarieven en betaalpoorten",
        radarsLabel: "Flitsers & Radars",
        radarsDesc: "Vaste en mobiele flitsers",
        worksLabel: "Wegwerkzaamheden",
        worksDesc: "Rijstrookafsluitingen en onderhoud",
        warningsTitle: "Waarschuwingen op de route",
        warningsDescDefault: "Waarschuwingen worden hier getoond na planning.",
        noWarnings: "Geen waarschuwingen op de route.",
        hudNavigating: "Route volgen...",
        hudCalculating: "Berekenen...",
        gpsUnsupported: "GPS niet ondersteund. Start ingesteld op Ankara.",
        gpsSearching: "Zoeken naar locatie...",
        gpsSuccess: "Locatie gevonden.",
        gpsVoiceStart: "Startpositie ontvangen.",
        gpsFailed: "Toegang geweigerd. Start ingesteld op Ankara.",
        routePlanning: "Route plannen...",
        routeSuccess: "Route succesvol berekend.",
        routeVoiceSummary: (dist, dur, inc) => `Route gevonden. Afstand ${dist} kilometer. Reistijd ${dur}. ${inc} waarschuwingen gedetecteerd.`,
        speakRadar: (dist, speed) => `Let op! Snelheidscontrole over ${dist} kilometer. Snelheidslimiet ${speed}.`,
        speakWork: (dist, desc) => `Let op! Wegwerkzaamheden over ${dist} kilometer. Status: ${desc}. Gelieve te vertragen.`,
        speakToll: (dist, name, price) => `Tolpoort over ${dist} kilometer. ${name}. Tarief ${price}.`,
        speakFinished: "U bent op uw bestemming aangekomen. Reis voltooid.",
        speakNavStart: "Navigatie gestart, veilige reis.",
        hour: "uur",
        minute: "minuten",
        kmRemaining: (rem) => `Nog ${rem} km`
    },
    ru: {
        titleAccent: "Путеводитель",
        startLabel: "Точка отправления",
        startPlaceholder: "Искать город или район (или GPS)",
        destLabel: "Пункт назначения",
        destPlaceholder: "Введите город или район назначения",
        calculateBtn: "Рассчитать маршрут",
        distance: "Общее расстояние",
        duration: "Время в пути",
        simStart: "Начать навигацию",
        simStop: "Остановить навигацию",
        eventsShow: "Показывать события",
        tollsLabel: "Платные дороги и мосты",
        tollsDesc: "Тарифы на проезд и пункты оплаты",
        radarsLabel: "Радары скорости",
        radarsDesc: "Камеры контроля скорости (EDS)",
        worksLabel: "Дорожные работы",
        worksDesc: "Ремонт дорог и закрытие полос",
        warningsTitle: "Предупреждения на пути",
        warningsDescDefault: "Предупреждения появятся здесь после расчета.",
        noWarnings: "На маршруте нет предупреждений.",
        hudNavigating: "Маршрут отслеживается...",
        hudCalculating: "Расчет...",
        gpsUnsupported: "GPS не поддерживается. Старт из Анкары.",
        gpsSearching: "Поиск местоположения...",
        gpsSuccess: "Местоположение успешно найдено.",
        gpsVoiceStart: "Стартовая позиция получена.",
        gpsFailed: "Доступ к GPS запрещен. Старт из Анкары.",
        routePlanning: "Планирование маршрута...",
        routeSuccess: "Маршрут успешно построен.",
        routeVoiceSummary: (dist, dur, inc) => `Маршрут найден. Расстояние ${dist} км. Время в пути ${dur}. Обнаружено ${inc} предупреждений.`,
        speakRadar: (dist, speed) => `Внимание! Камера контроля скорости через ${dist} км. Лимит скорости ${speed}.`,
        speakWork: (dist, desc) => `Внимание! Дорожные работы через ${dist} км. Состояние: ${desc}. Снизьте скорость.`,
        speakToll: (dist, name, price) => `Пункт оплаты через ${dist} км. ${name}. Стоимость ${price}.`,
        speakFinished: "Вы прибыли в пункт назначения. Поездка завершена.",
        speakNavStart: "Навигация запущена, счастливого пути.",
        hour: "ч.",
        minute: "мин.",
        kmRemaining: (rem) => `Осталось ${rem} км`
    },
    ku: {
        titleAccent: "Rêbera Rêyê",
        startLabel: "Cihê Destpêkê",
        startPlaceholder: "Li bajar an navçeyê bigere (an GPS)",
        destLabel: "Cihê Gihandinê",
        destPlaceholder: "Cihê ku hûn herin binivîsin",
        calculateBtn: "Rêyê Hesab Bike",
        distance: "Dûrahiya Giştî",
        duration: "Demjimêra Texmînî",
        simStart: "Navîgasyonê Destpê Bike",
        simStop: "Navîgasyonê Rawestîne",
        eventsShow: "Bûyerên ku Dê Bêne Nîşandan",
        tollsLabel: "Rê û Pirên bi Pere",
        tollsDesc: "Bihayên otobanê û xalên derbasbûnê",
        radarsLabel: "Radarên Lezê",
        radarsDesc: "Cihên kontrola leza wesayîtan",
        worksLabel: "Xebatên Rêyê",
        worksDesc: "Xebatên ser çaksaziyê û darasîna şerîdan",
        warningsTitle: "Hişyariyên li ser Rêyê",
        warningsDescDefault: "Hişyarî dê li vir bêne lîstekirin dema ku rê hate xêzkirin.",
        noWarnings: "Li ser rêyê tu hişyarî nînin.",
        hudNavigating: "Rê tê şopandin...",
        hudCalculating: "Tê hesabkirin...",
        gpsUnsupported: "GPS nayê piştgirîkirin. Destpêk wek Enqere hate mîhengkirin.",
        gpsSearching: "Li cîhê we tê gerîn...",
        gpsSuccess: "Cîhê we bi serkeftî hate dîtin.",
        gpsVoiceStart: "Cîhê destpêkê hate wergirtin.",
        gpsFailed: "Destûra cîhê nehate girtin. Destpêk wek Enqere hate mîhengkirin.",
        routePlanning: "Rê tê plankirin...",
        routeSuccess: "Rê bi serkeftî hate xêzkirin.",
        routeVoiceSummary: (dist, dur, inc) => `Rê hate dîtin. Dûrahî ${dist} kîlometre. Dema rêwîtiyê ${dur}. Li ser rêyê ${inc} hişyarî hatin dîtin.`,
        speakRadar: (dist, speed) => `Dîqat! ${dist} kîlometre şûn de radara lezê heye. Sînorê lezê ${speed}.`,
        speakWork: (dist, desc) => `Dîqat! ${dist} kîlometre şûn de xebata rêyê heye. Rewş: ${desc}. Ji kerema xwe hêdî bibin.`,
        speakToll: (dist, name, price) => `Nêzîkî ${dist} kîlometre şûn de xala derbasbûnê ya bi pere heye. ${name}. Biha ${price}.`,
        speakFinished: "Hûn gihîştin cihê xwe. Rêwîtî bi dawî bû.",
        speakNavStart: "Navîgasyon destpê kir, rêwîtiyeke ewle dixwazin.",
        hour: "saet",
        minute: "deqîqe",
        kmRemaining: (rem) => `${rem} kîlometre ma`
    },
    zza: {
        titleAccent: "Rayberê Raye",
        startLabel: "Cajê Destpêki",
        startPlaceholder: "Sûk an qeza bigerê (an GPS)",
        destLabel: "Cajê Resayışi",
        destPlaceholder: "Cayo ke şıdê cı nusey",
        calculateBtn: "Raye Hesab Bike",
        distance: "Dûrahiya Pêro",
        duration: "Zemanê Texmînî",
        simStart: "Navîgasyonê Destpêke",
        simStop: "Navîgasyonê Bıvındarnê",
        eventsShow: "Bûyerê ke bêrê nîşandan",
        tollsLabel: "Ray û Pırdê bi Pere",
        tollsDesc: "Bihayê otobani û xalê derbasbûni",
        radarsLabel: "Radarê Leze",
        radarsDesc: "Xalê kontrolê leze",
        worksLabel: "Xebatê Raye",
        worksDesc: "Çaksazî û girewtena şerîdan",
        warningsTitle: "Hişyariyê serê Raye",
        warningsDescDefault: "Dema raye amê xêzkene hişyarî naza de nusênê.",
        noWarnings: "Serê raye de tu hişyarî çniyê.",
        hudNavigating: "Raye tê teqîpkerdene...",
        hudCalculating: "Tê hesabkerdene...",
        gpsUnsupported: "GPS nêkıfşêno. Destpêk bi Enqere mîheng bi.",
        gpsSearching: "Cajê şıma cêrêno...",
        gpsSuccess: "Cajê şıma bi serkeftî vîniya.",
        gpsVoiceStart: "Cajê destpêki ame gırewtene.",
        gpsFailed: "Destûra cajê nêgırewtiya. Destpêk wek Enqere mîheng bi.",
        routePlanning: "Raye tê plankerdene...",
        routeSuccess: "Raye amê xêzkerdene.",
        routeVoiceSummary: (dist, dur, inc) => `Raye vîniya. Dûrahî ${dist} kîlometre. Dema raywîtiyê ${dur}. Serê raye de ${inc} hişyarî vîniyê.`,
        speakRadar: (dist, speed) => `Dîqat! ${dist} kîlometre şûn de radara leze esta. Sînorê leze ${speed}.`,
        speakWork: (dist, desc) => `Dîqat! ${dist} kîlometre şûn de xebata raye esta. Rewş: ${desc}. Kerem kerê hêdî şêrê.`,
        speakToll: (dist, name, price) => `Nêzîkî ${dist} kîlometre şûn de xala derbasbûnê ya bi pere esta. ${name}. Biha ${price}.`,
        speakFinished: "Şıma resay cayo ke şıdê. Raywîtî qediya.",
        speakNavStart: "Navîgasyon destpê kerd, raywîtiyeke weş dıwazenê.",
        hour: "saet",
        minute: "deqîqe",
        kmRemaining: (rem) => `${rem} kîlometre mend`
    },
    ar: {
        titleAccent: "دليل المسار",
        startLabel: "نقطة البداية",
        startPlaceholder: "ابحث عن مدينة أو منطقة (أو استخدم GPS)",
        destLabel: "نقطة الوصول",
        destPlaceholder: "أدخل مدينة أو منطقة الوصول",
        calculateBtn: "احسب المسار",
        distance: "المسافة الإجمالية",
        duration: "الوقت المقدر",
        simStart: "ابدأ الملاحة",
        simStop: "أوقف الملاحة",
        eventsShow: "الأحداث المراد عرضها",
        tollsLabel: "طرق الرسوم والجسور",
        tollsDesc: "رسوم الطرق السريعة وبوابات الدفع",
        radarsLabel: "رادارات السرعة",
        radarsDesc: "كاميرات مراقبة السرعة الثابتة والمتحركة",
        worksLabel: "أشغال الطرق",
        worksDesc: "أعمال الصيانة وضيق المسارات",
        warningsTitle: "التنبيهات على المسار",
        warningsDescDefault: "ستظهر التنبيهات هنا بعد تخطيط المسار.",
        noWarnings: "لا توجد تنبيهات على هذا المسار.",
        hudNavigating: "تتبع المسار...",
        hudCalculating: "جاري الحساب...",
        gpsUnsupported: "نظام تحديد المواقع غير مدعوم. تم تحديد أنقرة كبداية.",
        gpsSearching: "جاري البحث عن موقعك...",
        gpsSuccess: "تم العثور على موقعك.",
        gpsVoiceStart: "تم استقبال موقع البداية.",
        gpsFailed: "تم رفض الوصول للموقع. تم تحديد أنقرة كبداية.",
        routePlanning: "جاري التخطيط للمسار...",
        routeSuccess: "تم رسم المسار بنجاح.",
        routeVoiceSummary: (dist, dur, inc) => `تم العثور على المسار. المسافة ${dist} كيلومتر. وقت السفر حوالي ${dur}. تم اكتشاف ${inc} تنبيهات على المسار.`,
        speakRadar: (dist, speed) => `تنبيه! بعد ${dist} كيلومتر توجد كاميرا مراقبة سرعة. حد السرعة ${speed}.`,
        speakWork: (dist, desc) => `تنبيه! بعد ${dist} كيلومتر توجد أعمال طرق. الحالة: ${desc}. يرجى إبطاء السرعة.`,
        speakToll: (dist, name, price) => `بعد حوالي ${dist} كيلومتر توجد نقطة رسوم عبور. ${name}. الرسوم ${price}.`,
        speakFinished: "لقد وصلت إلى وجهتك. اكتملت الرحلة.",
        speakNavStart: "بدأت الملاحة، نتمنى لك رحلة آمنة.",
        hour: "ساعات",
        minute: "دقائق",
        kmRemaining: (rem) => `متبقي ${rem} كم`
    }
};

let map;
let activeTheme = 'dark';
let activeTileLayer;
let routingControl;
let currentPosition = null;
let currentLang = 'tr';
let currentAudio = null;

// Active route info
let routeCoordinates = [];
let routeDistance = 0; // km
let routeDuration = 0; // minutes
let routeIncidents = [];

// Map markers
let startMarker = null;
let endMarker = null;
let incidentMarkers = [];
let userLocationMarker = null;

// Coordinates storage
let startCoords = null;
let endCoords = null;

// Search index
let searchIndex = [];

// Filter states
let filters = {
    tolls: true,
    radars: true,
    roadworks: true,
    voice: true,
    restareas: true,
    gasstations: true
};

// Geolocation real-time navigation tracking state
let isNavigating = false;
let watchId = null;
let navigationMarker = null;
let warnedIncidents = new Set(); // Keep track of already voiced incidents in current run

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
    initSearchIndex();
    initMap();
    setupEventListeners();
    setupAutocomplete('start-input', 'start-suggestions', 'start');
    setupAutocomplete('dest-input', 'dest-suggestions', 'dest');
    initCustomCursor();
    
    // Auto-request location access on app entry (Highly reliable settings, no timeout)
    locateUser();
    
    // Safety fallback: Hide loading screen after 3.2 seconds if GPS hangs or gets blocked
    setTimeout(hideLoadingScreen, 3200);
});

// Track app load start time to ensure user experiences the full map animation sequence
const appLoadedTime = Date.now();
const minimumLoadingDuration = 3000; // 3.0 seconds (SVG animation finishes at 2.7s)

// Hide Loading Screen Overlay
function hideLoadingScreen() {
    const elapsed = Date.now() - appLoadedTime;
    const remainingTime = Math.max(0, minimumLoadingDuration - elapsed);
    
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        if (loader && !loader.classList.contains('fade-out')) {
            loader.classList.add('fade-out');
        }
    }, remainingTime);
}


// Initialize autocomplete search list
function initSearchIndex() {
    CITIES_DATA.forEach(city => {
        // Add City
        searchIndex.push({
            label: `${city.name} (İl Merkezi)`,
            searchLabel: city.name.toLocaleLowerCase('tr'),
            city: city.name,
            district: '',
            latitude: city.latitude,
            longitude: city.longitude,
            type: 'city'
        });
        
        // Add Districts (Counties)
        city.counties.forEach(district => {
            searchIndex.push({
                label: `${district}, ${city.name}`,
                searchLabel: `${district} ${city.name}`.toLocaleLowerCase('tr'),
                city: city.name,
                district: district,
                latitude: null, // lookup on demand
                longitude: null,
                type: 'district'
            });
        });
    });
}

// Initialize Leaflet Map
function initMap() {
    map = L.map('map', {
        zoomControl: false // Custom controls
    }).setView([39.9334, 32.8597], 6);

    L.control.zoom({
        position: 'topleft'
    }).addTo(map);

    setMapTheme(activeTheme);
}

// Apply dark/light theme tiles
function setMapTheme(theme) {
    if (activeTileLayer) {
        map.removeLayer(activeTileLayer);
    }
    
    if (theme === 'dark') {
        activeTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
        });
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        activeTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
        });
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    activeTileLayer.addTo(map);
}

// Setup event listeners
function setupEventListeners() {
    // Custom Language Selector Dropdown
    const dropdownBtn = document.getElementById('lang-dropdown-btn');
    const dropdownMenu = document.getElementById('lang-dropdown-menu');
    const displaySpan = document.getElementById('current-lang-display');
    const langOptions = document.querySelectorAll('.custom-select-option');

    const LANG_DISPLAY_MAP = {
        tr: '<svg class="flag-icon" viewBox="0 0 30 20"><rect width="30" height="20" fill="#e30a17"/><circle cx="11.5" cy="10" r="5" fill="#fff"/><circle cx="13" cy="10" r="4" fill="#e30a17"/><polygon points="18.5,7.5 19.1,9.3 21,9.3 19.5,10.5 20.1,12.3 18.5,11.1 16.9,12.3 17.5,10.5 16,9.3 17.9,9.3" fill="#fff"/></svg>',
        en: '<svg class="flag-icon" viewBox="0 0 30 20"><rect width="30" height="20" fill="#bb133e"/><rect width="30" height="1.54" y="1.54" fill="#fff"/><rect width="30" height="1.54" y="4.62" fill="#fff"/><rect width="30" height="1.54" y="7.69" fill="#fff"/><rect width="30" height="1.54" y="10.77" fill="#fff"/><rect width="30" height="1.54" y="13.85" fill="#fff"/><rect width="30" height="1.54" y="16.92" fill="#fff"/><rect width="12" height="10.77" fill="#002147"/><polygon points="6,4 6.4,5.2 7.6,5.2 6.6,6 7,7.2 6,6.4 5,7.2 5.4,6 4.4,5.2 5.6,5.2" fill="#fff"/></svg>',
        es: '<svg class="flag-icon" viewBox="0 0 30 20"><rect width="30" height="5" fill="#c60b1e"/><rect width="30" height="10" y="5" fill="#ffc400"/><rect width="30" height="5" y="15" fill="#c60b1e"/><circle cx="8" cy="10" r="2.5" fill="#c60b1e"/><circle cx="8" cy="10" r="1.5" fill="#ffc400"/></svg>',
        fr: '<svg class="flag-icon" viewBox="0 0 30 20"><rect width="10" height="20" fill="#00209f"/><rect width="10" height="20" x="10" fill="#ffffff"/><rect width="10" height="20" x="20" fill="#e12627"/></svg>',
        zh: '<svg class="flag-icon" viewBox="0 0 30 20"><rect width="30" height="20" fill="#ee1c25"/><polygon points="5,3 5.4,4.2 6.6,4.2 5.6,5 6,6.2 5,5.4 4,6.2 4.4,5 3.4,4.2 4.6,4.2" fill="#ffde00"/><circle cx="9" cy="2" r="0.5" fill="#ffde00"/><circle cx="10" cy="4" r="0.5" fill="#ffde00"/><circle cx="10" cy="6" r="0.5" fill="#ffde00"/><circle cx="9" cy="8" r="0.5" fill="#ffde00"/></svg>',
        it: '<svg class="flag-icon" viewBox="0 0 30 20"><rect width="10" height="20" fill="#009246"/><rect width="10" height="20" x="10" fill="#ffffff"/><rect width="10" height="20" x="20" fill="#f12d36"/></svg>',
        de: '<svg class="flag-icon" viewBox="0 0 30 20"><rect width="30" height="6.67" fill="#000000"/><rect width="30" height="6.67" y="6.67" fill="#dd0000"/><rect width="30" height="6.67" y="13.34" fill="#ffcc00"/></svg>',
        nl: '<svg class="flag-icon" viewBox="0 0 30 20"><rect width="30" height="6.67" fill="#ae1c28"/><rect width="30" height="6.67" y="6.67" fill="#ffffff"/><rect width="30" height="6.67" y="13.34" fill="#21468b"/></svg>',
        ru: '<svg class="flag-icon" viewBox="0 0 30 20"><rect width="30" height="6.67" fill="#ffffff"/><rect width="30" height="6.67" y="6.67" fill="#0039a6"/><rect width="30" height="6.67" y="13.34" fill="#d52b1e"/></svg>',
        ku: '<svg class="flag-icon" viewBox="0 0 30 20"><rect width="30" height="6.67" fill="#e62020"/><rect width="30" height="6.67" y="6.67" fill="#ffffff"/><rect width="30" height="6.67" y="13.34" fill="#268e26"/><circle cx="15" cy="10" r="2.2" fill="#fecb00"/><path d="M15,7.3 V12.7 M12.3,10 H17.7 M13.1,8.1 L16.9,11.9 M13.1,11.9 L16.9,8.1" stroke="#fecb00" stroke-width="0.8"/></svg>',
        zza: '<svg class="flag-icon" viewBox="0 0 30 20"><rect width="30" height="6.67" fill="#0080ff"/><rect width="30" height="6.67" y="6.67" fill="#ffffff"/><rect width="30" height="6.67" y="13.34" fill="#009933"/></svg>',
        ar: '<svg class="flag-icon" viewBox="0 0 30 20"><rect width="30" height="20" fill="#006c35"/><path d="M7,12 H23 M9,11 V13 M19,10.5 C19,10.5 17,9.5 15,9.5 C13,9.5 11,10.5 11,10.5" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg>'
    };

    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    langOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const val = opt.getAttribute('data-value');
            currentLang = val;
            displaySpan.innerHTML = LANG_DISPLAY_MAP[val];
            dropdownMenu.classList.remove('show');
            updateUILanguage();
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });


    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
        activeTheme = activeTheme === 'dark' ? 'light' : 'dark';
        setMapTheme(activeTheme);
        const icon = document.getElementById('theme-toggle').querySelector('i');
        icon.className = activeTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    });

    // Voice toggle
    document.getElementById('voice-toggle').addEventListener('click', () => {
        filters.voice = !filters.voice;
        const btn = document.getElementById('voice-toggle');
        btn.classList.toggle('active', filters.voice);
        btn.querySelector('i').className = filters.voice ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        
        if (filters.voice) {
            speakVoice(TRANSLATIONS[currentLang].speakNavStart);
        } else {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }
            const dot = document.getElementById('speech-indicator');
            if (dot) dot.classList.remove('active');
        }
    });

    // Geolocation button
    document.getElementById('gps-btn').addEventListener('click', locateUser);

    // Filter toggles
    document.getElementById('filter-tolls').addEventListener('change', (e) => {
        filters.tolls = e.target.checked;
        updateMarkersVisibility();
    });
    
    document.getElementById('filter-radars').addEventListener('change', (e) => {
        filters.radars = e.target.checked;
        updateMarkersVisibility();
    });
    
    document.getElementById('filter-works').addEventListener('change', (e) => {
        filters.roadworks = e.target.checked;
        updateMarkersVisibility();
    });

    document.getElementById('filter-rest').addEventListener('change', (e) => {
        filters.restareas = e.target.checked;
        updateMarkersVisibility();
    });

    document.getElementById('filter-gas').addEventListener('change', (e) => {
        filters.gasstations = e.target.checked;
        updateMarkersVisibility();
    });

    // Main action buttons
    document.getElementById('route-btn').addEventListener('click', calculateRoute);
    document.getElementById('sim-btn').addEventListener('click', toggleNavigation); // Trigger real GPS tracking navigation!
    document.getElementById('voice-demo-btn').addEventListener('click', triggerVoiceDemo);

    // Mobile panel drag handle (iPadOS/iOS style smooth translateY sheets)
    const panel = document.getElementById('control-panel');
    const dragHandle = document.querySelector('.drag-handle');
    
    let isDragging = false;
    let startY = 0;
    let startTranslateY = 0;
    let currentTranslateY = 0;

    dragHandle.addEventListener('touchstart', (e) => {
        isDragging = true;
        startY = e.touches[0].clientY;
        
        // Extract current translateY from CSS transform matrix safely across browsers
        let currentYVal = 0;
        const style = window.getComputedStyle(panel);
        const transform = style.transform || style.webkitTransform;
        if (transform && transform !== 'none') {
            if (window.DOMMatrix) {
                currentYVal = new DOMMatrix(transform).m42;
            } else if (window.WebKitCSSMatrix) {
                currentYVal = new WebKitCSSMatrix(transform).m42;
            } else {
                const parts = transform.split(',');
                if (parts.length >= 6) {
                    currentYVal = parseFloat(parts[5]);
                }
            }
        }
        startTranslateY = currentYVal || 0;
        
        panel.style.transition = 'none';
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentY = e.touches[0].clientY;
        const diffY = currentY - startY;
        let newTranslateY = startTranslateY + diffY;
        
        const panelHeight = panel.offsetHeight;
        const maxTranslateY = panelHeight - 60; // leave 60px visible for dragHandle/title
        
        // Upper rubber banding (when user drags beyond fully expanded)
        if (newTranslateY < 0) {
            newTranslateY = newTranslateY * 0.2;
        }
        // Bottom limit
        if (newTranslateY > maxTranslateY) {
            newTranslateY = maxTranslateY;
        }
        
        currentTranslateY = newTranslateY;
        panel.style.transform = `translateY(${newTranslateY}px)`;
        
        if (e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        panel.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
        
        const panelHeight = panel.offsetHeight;
        const expandedPos = 0;
        const normalPos = panelHeight * 0.35;
        const collapsedPos = panelHeight - 60;
        
        const distExpanded = Math.abs(currentTranslateY - expandedPos);
        const distNormal = Math.abs(currentTranslateY - normalPos);
        const distCollapsed = Math.abs(currentTranslateY - collapsedPos);
        
        // Remove manual inline transform to let CSS stylesheet clean classes handle it
        panel.style.transform = '';
        
        if (distExpanded < distNormal && distExpanded < distCollapsed) {
            panel.classList.remove('collapsed');
            panel.classList.add('expanded');
        } else if (distCollapsed < distExpanded && distCollapsed < distNormal) {
            panel.classList.remove('expanded');
            panel.classList.add('collapsed');
        } else {
            panel.classList.remove('expanded', 'collapsed');
        }
    });

    dragHandle.addEventListener('click', () => {
        if (panel.classList.contains('collapsed')) {
            panel.classList.remove('collapsed', 'expanded');
        } else if (panel.classList.contains('expanded')) {
            panel.classList.remove('collapsed', 'expanded');
        } else {
            panel.classList.add('collapsed');
        }
    });
}

// Translate UI Elements
function updateUILanguage() {
    const t = TRANSLATIONS[currentLang];
    
    // Page Title
    document.getElementById('title-accent').textContent = t.titleAccent;
    
    // Form labels and placeholders
    document.getElementById('label-start').textContent = t.startLabel;
    document.getElementById('start-input').placeholder = t.startPlaceholder;
    document.getElementById('label-dest').textContent = t.destLabel;
    document.getElementById('dest-input').placeholder = t.destPlaceholder;
    
    // Calculate button
    document.getElementById('btn-route-text').textContent = t.calculateBtn;
    
    // Stats labels
    document.getElementById('label-distance').textContent = t.distance;
    document.getElementById('label-duration').textContent = t.duration;
    
    // Simulation button text
    updateSimButtonText();
    
    // Filters header and labels
    document.getElementById('title-filters').innerHTML = `<i class="fas fa-sliders"></i> ${t.eventsShow}`;
    document.getElementById('title-tolls').textContent = t.tollsLabel;
    document.getElementById('desc-tolls').textContent = t.tollsDesc;
    document.getElementById('title-radars').textContent = t.radarsLabel;
    document.getElementById('desc-radars').textContent = t.radarsDesc;
    document.getElementById('title-works').textContent = t.worksLabel;
    document.getElementById('desc-works').textContent = t.worksDesc;

    if (document.getElementById('title-rest')) document.getElementById('title-rest').textContent = t.restLabel || "Rest Areas";
    if (document.getElementById('desc-rest')) document.getElementById('desc-rest').textContent = t.restDesc || "Rest stops along route";
    if (document.getElementById('title-gas')) document.getElementById('title-gas').textContent = t.gasLabel || "Gas Stations";
    if (document.getElementById('desc-gas')) document.getElementById('desc-gas').textContent = t.gasDesc || "Gas stations along route";
    
    // Warnings header
    document.getElementById('title-warnings').innerHTML = `<i class="fas fa-triangle-exclamation"></i> ${t.warningsTitle}`;
    
    // Update warnings panel list/placeholder
    if (routeCoordinates.length === 0) {
        const listContainer = document.getElementById('warnings-list');
        listContainer.innerHTML = `
            <div class="warning-item" style="justify-content: center; border-left: none; opacity: 0.6;">
                <span id="warnings-placeholder" style="font-size: 13px;">${t.warningsDescDefault}</span>
            </div>
        `;
    } else {
        buildIncidentsUI();
        document.getElementById('stat-distance').textContent = `${routeDistance} km`;
        document.getElementById('stat-duration').textContent = formatDuration(routeDuration);
    }
}

// Update navigation button text
function updateSimButtonText() {
    const t = TRANSLATIONS[currentLang];
    const btn = document.getElementById('sim-btn');
    if (isNavigating) {
        btn.innerHTML = `<i class="fas fa-pause"></i> <span id="btn-sim-text">${t.simStop}</span>`;
    } else {
        btn.innerHTML = `<i class="fas fa-location-arrow"></i> <span id="btn-sim-text">${t.simStart}</span>`;
    }
}

// Geolocation mapping with Ankara Fallback
function locateUser() {
    const t = TRANSLATIONS[currentLang];

    function applyAnkaraFallback(message) {
        const lat = 39.9334;
        const lng = 32.8597;
        startCoords = L.latLng(lat, lng);
        document.getElementById('start-input').value = currentLang === 'tr' ? "Ankara (İl Merkezi) [Varsayılan]" : `Ankara [Default]`;
        
        if (userLocationMarker) {
            map.removeLayer(userLocationMarker);
        }
        
        const fallbackIcon = L.divIcon({
            className: 'gps-marker-container',
            html: '<div class="gps-marker-pulse" style="background-color: var(--work-color);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        userLocationMarker = L.marker(startCoords, { icon: fallbackIcon }).addTo(map);
        map.setView(startCoords, 11);
        showHUD(message, "warning");
        hideLoadingScreen();
    }

    if (!navigator.geolocation) {
        applyAnkaraFallback(t.gpsUnsupported);
        return;
    }

    showHUD(t.gpsSearching, "info");
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            currentPosition = [lat, lng];
            
            startCoords = L.latLng(lat, lng);
            document.getElementById('start-input').value = currentLang === 'tr' ? "📍 Mevcut Konumum" : "📍 My Current Location";
            
            if (userLocationMarker) {
                map.removeLayer(userLocationMarker);
            }
            
            const gpsIcon = L.divIcon({
                className: 'gps-marker-container',
                html: '<div class="gps-marker-pulse"></div>',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
            
            userLocationMarker = L.marker(startCoords, { icon: gpsIcon }).addTo(map);
            map.setView(startCoords, 14);
            showHUD(t.gpsSuccess, "info");
            speakVoice(t.gpsVoiceStart);
            hideLoadingScreen();
        },
        (error) => {
            console.error(error);
            applyAnkaraFallback(t.gpsFailed);
        },
        { enableHighAccuracy: false, maximumAge: 60000 }
    );
}

// Autocomplete inputs logic
function setupAutocomplete(inputId, suggestionsId, type) {
    const input = document.getElementById(inputId);
    const suggestions = document.getElementById(suggestionsId);
    
    input.addEventListener('input', () => {
        const value = input.value.toLocaleLowerCase('tr').trim();
        suggestions.innerHTML = '';
        
        if (value.length < 1) {
            suggestions.style.display = 'none';
            return;
        }
        
        const matches = searchIndex.filter(item => item.searchLabel.includes(value)).slice(0, 8);
        
        if (matches.length === 0) {
            suggestions.style.display = 'none';
            return;
        }
        
        matches.forEach((match) => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = match.label;
            
            item.addEventListener('click', async () => {
                input.value = match.label;
                suggestions.style.display = 'none';
                
                let lat = match.latitude;
                let lng = match.longitude;
                
                if (lat === null || lng === null) {
                    showHUD(currentLang === 'tr' ? "İlçe konumu aranıyor..." : "Searching district...", "info");
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(match.district)},${encodeURIComponent(match.city)},Turkey&limit=1`);
                        const result = await response.json();
                        if (result && result.length > 0) {
                            lat = parseFloat(result[0].lat);
                            lng = parseFloat(result[0].lon);
                        } else {
                            throw new Error("Nominatim empty");
                        }
                    } catch (e) {
                        const cityMatch = searchIndex.find(c => c.city === match.city && c.type === 'city');
                        const offsetLat = (Math.random() - 0.5) * 0.08;
                        const offsetLng = (Math.random() - 0.5) * 0.08;
                        lat = cityMatch.latitude + offsetLat;
                        lng = cityMatch.longitude + offsetLng;
                    }
                }
                
                if (type === 'start') {
                    startCoords = L.latLng(lat, lng);
                } else {
                    endCoords = L.latLng(lat, lng);
                }
                showHUD(`${match.label}`, "info");
            });
            
            suggestions.appendChild(item);
        });
        
        suggestions.style.display = 'block';
    });
    
    document.addEventListener('click', (e) => {
        if (e.target !== input && e.target !== suggestions) {
            suggestions.style.display = 'none';
        }
    });
}

// Calculate and Draw Route
function calculateRoute() {
    const t = TRANSLATIONS[currentLang];
    
    if (!startCoords || !endCoords) {
        showHUD(currentLang === 'tr' ? "Lütfen başlangıç ve bitiş noktalarını seçin." : "Please select start and destination.", "warning");
        return;
    }

    if (isNavigating) {
        toggleNavigation();
    }

    showHUD(t.routePlanning, "info");
    
    if (routingControl) {
        map.removeControl(routingControl);
    }

    routingControl = L.Routing.control({
        waypoints: [
            startCoords,
            endCoords
        ],
        router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1',
            profile: 'car'
        }),
        lineOptions: {
            styles: [
                { color: '#00a8ff', opacity: 0.8, weight: 6 },
                { color: '#ffffff', opacity: 0.3, weight: 2 }
            ]
        },
        createMarker: function(i, wp, n) {
            const isStart = i === 0;
            const markerColor = isStart ? '#00a8ff' : '#ff4757';
            const markerHtml = `
                <div style="background-color: ${markerColor}; width: 14px; height: 14px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>
            `;
            const icon = L.divIcon({
                html: markerHtml,
                className: '',
                iconSize: [14, 14],
                iconAnchor: [7, 7]
            });
            return L.marker(wp.latLng, { icon: icon });
        },
        fitSelectedRoutes: false // Disable routing fly-to animations
    }).addTo(map);

    routingControl.on('routesfound', function(e) {
        const routes = e.routes;
        const summary = routes[0].summary;
        
        routeDistance = (summary.totalDistance / 1000).toFixed(1);
        routeDuration = Math.round(summary.totalTime / 60);
        routeCoordinates = routes[0].coordinates.map(c => L.latLng(c.lat, c.lng));
        
        // Fit bounds instantly
        const bounds = L.latLngBounds(routeCoordinates);
        map.fitBounds(bounds, { animate: false });
        
        // Show route stats in UI
        document.getElementById('route-info').style.display = 'block';
        document.getElementById('stat-distance').textContent = `${routeDistance} km`;
        document.getElementById('stat-duration').textContent = formatDuration(routeDuration);
        
        // Find warnings and details along the route
        analyzeRouteIncidents();
        
        // Enable navigation controls
        document.getElementById('sim-btn').removeAttribute('disabled');
        
        // Voice route summary
        const durTextVoice = formatDurationVoice(routeDuration);
        const voiceMsg = t.routeVoiceSummary(routeDistance, durTextVoice, routeIncidents.length);
        speakVoice(voiceMsg);
        
        showHUD(t.routeSuccess, "info");
    });

    routingControl.on('routingerror', function(err) {
        console.error(err);
        showHUD(currentLang === 'tr' ? "Rota çizilemedi." : "Routing failed.", "warning");
    });
}

// Format duration
function formatDuration(mins) {
    const hrWord = currentLang === 'ru' ? 'ч.' : (currentLang === 'ar' ? 'ساعات' : (currentLang === 'zh' ? '小时' : (currentLang === 'tr' ? 'sa' : 'h')));
    const minWord = currentLang === 'ru' ? 'мин.' : (currentLang === 'ar' ? 'دقائق' : (currentLang === 'zh' ? '分钟' : (currentLang === 'tr' ? 'dk' : 'm')));
    
    if (mins < 60) return `${mins} ${minWord}`;
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return remMins > 0 ? `${hours} ${hrWord} ${remMins} ${minWord}` : `${hours} ${hrWord}`;
}

function formatDurationVoice(mins) {
    const t = TRANSLATIONS[currentLang];
    if (mins < 60) return `${mins} ${t.minute}`;
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return remMins > 0 ? `${hours} ${t.hour} ${remMins} ${t.minute}` : `${hours} ${t.hour}`;
}

// Core logic: Identify incident zones along calculated route
function analyzeRouteIncidents() {
    incidentMarkers.forEach(m => map.removeLayer(m));
    incidentMarkers = [];
    routeIncidents = [];
    warnedIncidents.clear();

    const maxDistanceKm = 1.5; // check if route passes within 1.5km of incident location

    // Helper: distance between coordinates
    function getDistanceKm(coord1, coord2) {
        const R = 6371;
        const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
        const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    // A. Check Static Toll Roads
    TOLL_ROADS.forEach(toll => {
        let minDistance = Infinity;
        let bestIndex = -1;
        
        for (let i = 0; i < routeCoordinates.length; i++) {
            const dist = getDistanceKm(toll, routeCoordinates[i]);
            if (dist < minDistance) {
                minDistance = dist;
                bestIndex = i;
            }
        }
        
        if (minDistance < maxDistanceKm) {
            const distanceAlong = calculateDistanceAlongRoute(bestIndex);
            routeIncidents.push({
                type: 'toll',
                name: toll.name,
                detail: toll.price,
                lat: toll.lat,
                lng: toll.lng,
                distanceAlong: distanceAlong,
                routeIndex: bestIndex
            });
        }
    });

    // B. Check Static Fixed Radars
    FIXED_RADARS.forEach(radar => {
        let minDistance = Infinity;
        let bestIndex = -1;
        
        for (let i = 0; i < routeCoordinates.length; i++) {
            const dist = getDistanceKm(radar, routeCoordinates[i]);
            if (dist < minDistance) {
                minDistance = dist;
                bestIndex = i;
            }
        }
        
        if (minDistance < maxDistanceKm) {
            const distanceAlong = calculateDistanceAlongRoute(bestIndex);
            routeIncidents.push({
                type: 'radar',
                name: radar.name,
                detail: radar.speedLimit,
                lat: radar.lat,
                lng: radar.lng,
                distanceAlong: distanceAlong,
                routeIndex: bestIndex
            });
        }
    });

    // C. Check Static Roadworks
    ROAD_WORKS.forEach(work => {
        let minDistance = Infinity;
        let bestIndex = -1;
        
        for (let i = 0; i < routeCoordinates.length; i++) {
            const dist = getDistanceKm(work, routeCoordinates[i]);
            if (dist < minDistance) {
                minDistance = dist;
                bestIndex = i;
            }
        }
        
        if (minDistance < maxDistanceKm) {
            const distanceAlong = calculateDistanceAlongRoute(bestIndex);
            routeIncidents.push({
                type: 'work',
                name: work.desc,
                detail: work.duration,
                lat: work.lat,
                lng: work.lng,
                distanceAlong: distanceAlong,
                routeIndex: bestIndex
            });
        }
    });

    // Check Static Rest Areas
    REST_AREAS.forEach(rest => {
        let minDistance = Infinity;
        let bestIndex = -1;
        
        for (let i = 0; i < routeCoordinates.length; i++) {
            const dist = getDistanceKm(rest, routeCoordinates[i]);
            if (dist < minDistance) {
                minDistance = dist;
                bestIndex = i;
            }
        }
        
        if (minDistance < maxDistanceKm) {
            const distanceAlong = calculateDistanceAlongRoute(bestIndex);
            routeIncidents.push({
                type: 'rest',
                name: rest.name,
                detail: rest.detail,
                lat: rest.lat,
                lng: rest.lng,
                distanceAlong: distanceAlong,
                routeIndex: bestIndex
            });
        }
    });

    // Check Static Gas Stations
    GAS_STATIONS.forEach(gas => {
        let minDistance = Infinity;
        let bestIndex = -1;
        
        for (let i = 0; i < routeCoordinates.length; i++) {
            const dist = getDistanceKm(gas, routeCoordinates[i]);
            if (dist < minDistance) {
                minDistance = dist;
                bestIndex = i;
            }
        }
        
        if (minDistance < maxDistanceKm) {
            const distanceAlong = calculateDistanceAlongRoute(bestIndex);
            routeIncidents.push({
                type: 'gas',
                name: gas.name,
                detail: gas.detail,
                lat: gas.lat,
                lng: gas.lng,
                distanceAlong: distanceAlong,
                routeIndex: bestIndex
            });
        }
    });

    // D. Procedural Generation along long paths
    if (routeCoordinates.length > 200) {
        const totalPoints = routeCoordinates.length;
        const segmentCount = Math.floor(totalPoints / 250);
        
        for (let s = 1; s <= segmentCount; s++) {
            const targetIdx = Math.floor((totalPoints / (segmentCount + 1)) * s);
            const pt = routeCoordinates[targetIdx];
            const distAlong = calculateDistanceAlongRoute(targetIdx);
            
            const incidentType = s % 5;
            
            if (incidentType === 0) {
                routeIncidents.push({
                    type: 'radar',
                    name: currentLang === 'tr' ? 'Mobil Radar Hız Denetimi' : 'Mobile Speed Radar',
                    detail: '110 km/s',
                    lat: pt.lat,
                    lng: pt.lng,
                    distanceAlong: distAlong,
                    routeIndex: targetIdx
                });
            } else if (incidentType === 1) {
                routeIncidents.push({
                    type: 'work',
                    name: currentLang === 'tr' ? 'Yol Bakım Çalışması' : 'Road Maintenance',
                    detail: currentLang === 'tr' ? 'Tek şerit kontrollü geçiş' : 'One-lane controlled traffic',
                    lat: pt.lat,
                    lng: pt.lng,
                    distanceAlong: distAlong,
                    routeIndex: targetIdx
                });
            } else if (incidentType === 2) {
                const nearStaticToll = routeIncidents.some(inc => inc.type === 'toll' && getDistanceKm(inc, pt) < 30);
                if (!nearStaticToll) {
                    // Find nearest toll road segment to identify which otoyol it is
                    let nearestTollRoad = null;
                    let minTollDist = Infinity;
                    TOLL_ROADS.forEach(tr => {
                        if (tr.name.includes('O-')) {
                            const d = getDistanceKm(tr, pt);
                            if (d < minTollDist) {
                                minTollDist = d;
                                nearestTollRoad = tr;
                            }
                        }
                    });

                    let tollNameTR = 'Otoyol HGS Geçiş Gişesi';
                    let tollNameEN = 'Highway HGS Toll Plaza';
                    let tollPrice = '75 TL';

                    // If it's close enough (e.g. within 120 km of the highway reference coordinate)
                    if (nearestTollRoad && minTollDist < 120) {
                        if (nearestTollRoad.name.includes('O-5')) {
                            tollNameTR = 'O-5 Otoyolu HGS Geçiş Gişesi';
                            tollNameEN = 'O-5 Highway HGS Toll Plaza';
                            tollPrice = '340 TL';
                        } else if (nearestTollRoad.name.includes('O-7')) {
                            tollNameTR = 'O-7 Otoyolu HGS Geçiş Gişesi';
                            tollNameEN = 'O-7 Highway HGS Toll Plaza';
                            tollPrice = '195 TL';
                        } else if (nearestTollRoad.name.includes('O-21')) {
                            tollNameTR = 'O-21 Otoyolu HGS Geçiş Gişesi';
                            tollNameEN = 'O-21 Highway HGS Toll Plaza';
                            tollPrice = '125 TL';
                        } else if (nearestTollRoad.name.includes('O-4')) {
                            tollNameTR = 'O-4 Otoyolu HGS Geçiş Gişesi';
                            tollNameEN = 'O-4 Highway HGS Toll Plaza';
                            tollPrice = '95 TL';
                        } else if (nearestTollRoad.name.includes('O-52')) {
                            tollNameTR = 'O-52 Otoyolu HGS Geçiş Gişesi';
                            tollNameEN = 'O-52 Highway HGS Toll Plaza';
                            tollPrice = '55 TL';
                        } else {
                            tollNameTR = `${nearestTollRoad.name} HGS Geçiş Gişesi`;
                            tollNameEN = `${nearestTollRoad.name} HGS Toll Plaza`;
                            tollPrice = '110 TL';
                        }
                    } else {
                        // Default fallback procedural toll pricing
                        const prices = ['55 TL', '75 TL', '85 TL', '110 TL'];
                        tollPrice = prices[targetIdx % prices.length];
                    }

                    routeIncidents.push({
                        type: 'toll',
                        name: currentLang === 'tr' ? tollNameTR : tollNameEN,
                        detail: tollPrice,
                        lat: pt.lat,
                        lng: pt.lng,
                        distanceAlong: distAlong,
                        routeIndex: targetIdx
                    });
                }
            } else if (incidentType === 3) {
                routeIncidents.push({
                    type: 'rest',
                    name: currentLang === 'tr' ? 'Otoyol Mola Alanı & Tesisleri' : 'Highway Rest Stop & Facilities',
                    detail: currentLang === 'tr' ? 'Dinlenme Tesisleri, WC, Kafeterya' : 'Restrooms, Dining, Cafe',
                    lat: pt.lat,
                    lng: pt.lng,
                    distanceAlong: distAlong,
                    routeIndex: targetIdx
                });
            } else {
                routeIncidents.push({
                    type: 'gas',
                    name: currentLang === 'tr' ? 'Otoyol Akaryakıt & Şarj İstasyonu' : 'Highway Gas & EV Charging Station',
                    detail: currentLang === 'tr' ? 'Opet Petrol İstasyonu' : 'Opet Gas Station',
                    lat: pt.lat,
                    lng: pt.lng,
                    distanceAlong: distAlong,
                    routeIndex: targetIdx
                });
            }
        }
    }

    routeIncidents.sort((a, b) => a.distanceAlong - b.distanceAlong);

    buildIncidentsUI();
    drawIncidentMarkers();
}

// Cumulative distance helper
function calculateDistanceAlongRoute(targetIndex) {
    let distance = 0;
    
    function getDistanceKm(coord1, coord2) {
        const R = 6371;
        const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
        const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    for (let i = 0; i < targetIndex; i++) {
        distance += getDistanceKm(routeCoordinates[i], routeCoordinates[i+1]);
    }
    
    return Math.round(distance);
}

// Draw warning icons on map
function drawIncidentMarkers() {
    routeIncidents.forEach(inc => {
        let iconHtml = '';
        let iconClass = `custom-map-icon ${inc.type}`;
        
        if (inc.type === 'toll') {
            iconHtml = '<i class="fas fa-credit-card"></i>';
        } else if (inc.type === 'radar') {
            iconHtml = '<i class="fas fa-camera"></i>';
        } else if (inc.type === 'work') {
            iconHtml = '<i class="fas fa-cone"></i>';
        } else if (inc.type === 'rest') {
            iconHtml = '<i class="fas fa-coffee"></i>';
        } else if (inc.type === 'gas') {
            iconHtml = '<i class="fas fa-gas-pump"></i>';
        }
        
        const mapIcon = L.divIcon({
            html: iconHtml,
            className: iconClass,
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        });
        
        const marker = L.marker([inc.lat, inc.lng], { icon: mapIcon });
        
        const priceLabel = currentLang === 'tr' ? 'Geçiş Ücreti' : (currentLang === 'en' ? 'Toll Fee' : 'Fee');
        const limitLabel = currentLang === 'tr' ? 'Hız Limiti' : (currentLang === 'en' ? 'Speed Limit' : 'Limit');
        const statusLabel = currentLang === 'tr' ? 'Durum' : (currentLang === 'en' ? 'Status' : 'Info');
        
        const detailsLabel = currentLang === 'tr' ? 'Detay' : (currentLang === 'en' ? 'Details' : 'Details');
        let labelText = statusLabel;
        if (inc.type === 'toll') labelText = priceLabel;
        if (inc.type === 'radar') labelText = limitLabel;
        if (inc.type === 'rest' || inc.type === 'gas') labelText = detailsLabel;
        
        const popupContent = `
            <div style="font-family: 'Outfit', sans-serif; color: #2f3542; padding: 4px;">
                <h4 style="margin-bottom: 2px; font-weight: 700;">${inc.name}</h4>
                <p style="margin: 0; font-size: 12px;">${labelText}: ${inc.detail}</p>
                <p style="margin-top: 4px; font-size: 11px; font-weight: 500; color: #747d8c;">${inc.distanceAlong}. km</p>
            </div>
        `;
        marker.bindPopup(popupContent);
        
        let isVisible = false;
        if (inc.type === 'toll' && filters.tolls) isVisible = true;
        else if (inc.type === 'radar' && filters.radars) isVisible = true;
        else if (inc.type === 'work' && filters.roadworks) isVisible = true;
        else if (inc.type === 'rest' && filters.restareas) isVisible = true;
        else if (inc.type === 'gas' && filters.gasstations) isVisible = true;

        if (isVisible) {
            marker.addTo(map);
        }
        
        incidentMarkers.push(marker);
    });
}

// Toggle filters visibility
function updateMarkersVisibility() {
    incidentMarkers.forEach((marker, index) => {
        const inc = routeIncidents[index];
        if (!inc) return;
        
        const isVisible = 
            (inc.type === 'toll' && filters.tolls) ||
            (inc.type === 'radar' && filters.radars) ||
            (inc.type === 'work' && filters.roadworks) ||
            (inc.type === 'rest' && filters.restareas) ||
            (inc.type === 'gas' && filters.gasstations);
            
        if (isVisible) {
            if (!map.hasLayer(marker)) {
                marker.addTo(map);
            }
        } else {
            if (map.hasLayer(marker)) {
                map.removeLayer(marker);
            }
        }
    });
}

// Build List UI inside Drawer
function buildIncidentsUI() {
    const listContainer = document.getElementById('warnings-list');
    listContainer.innerHTML = '';
    
    if (routeIncidents.length === 0) {
        listContainer.innerHTML = `
            <div class="warning-item" style="justify-content: center; border-left: none; opacity: 0.7;">
                <span style="font-size: 13px;">${TRANSLATIONS[currentLang].noWarnings}</span>
            </div>
        `;
        return;
    }
    
    routeIncidents.forEach(inc => {
        const item = document.createElement('div');
        item.className = `warning-item ${inc.type} fade-in`;
        
        let icon = '';
        let typeLabel = '';
        if (inc.type === 'toll') {
            icon = '<i class="fas fa-credit-card"></i>';
            typeLabel = currentLang === 'tr' ? 'Paralı Yol' : 'Toll Road';
        } else if (inc.type === 'radar') {
            icon = '<i class="fas fa-camera"></i>';
            typeLabel = currentLang === 'tr' ? 'Hız Radarı' : 'Speed Radar';
        } else if (inc.type === 'work') {
            icon = '<i class="fas fa-road-barrier"></i>';
            typeLabel = currentLang === 'tr' ? 'Yol Çalışması' : 'Road Works';
        } else if (inc.type === 'rest') {
            icon = '<i class="fas fa-coffee"></i>';
            typeLabel = currentLang === 'tr' ? 'Mola Alanı' : 'Rest Area';
        } else if (inc.type === 'gas') {
            icon = '<i class="fas fa-gas-pump"></i>';
            typeLabel = currentLang === 'tr' ? 'Akaryakıt İstasyonu' : 'Gas Station';
        }
        
        const priceLabel = currentLang === 'tr' ? 'Geçiş Ücreti' : (currentLang === 'en' ? 'Toll Fee' : 'Fee');
        const limitLabel = currentLang === 'tr' ? 'Hız Limiti' : (currentLang === 'en' ? 'Speed Limit' : 'Limit');
        const statusLabel = currentLang === 'tr' ? 'Durum' : (currentLang === 'en' ? 'Status' : 'Info');
        
        const detailsLabel = currentLang === 'tr' ? 'Detay' : (currentLang === 'en' ? 'Details' : 'Details');
        let labelText = statusLabel;
        if (inc.type === 'toll') labelText = priceLabel;
        if (inc.type === 'radar') labelText = limitLabel;
        if (inc.type === 'rest' || inc.type === 'gas') labelText = detailsLabel;
        
        item.innerHTML = `
            <div class="warning-icon">${icon}</div>
            <div class="warning-content">
                <div class="warning-title">${inc.name}</div>
                <div class="warning-desc">${labelText}: ${inc.detail} • Rota: ${inc.distanceAlong}. km</div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            map.setView([inc.lat, inc.lng], 14, { animate: false });
            const markerIdx = routeIncidents.indexOf(inc);
            if (markerIdx !== -1 && incidentMarkers[markerIdx]) {
                incidentMarkers[markerIdx].openPopup();
            }
            
            if (window.innerWidth <= 768) {
                const panel = document.getElementById('control-panel');
                panel.classList.remove('expanded');
                panel.classList.add('collapsed');
            }
        });
        
        listContainer.appendChild(item);
    });
}

// Speech Synthesis Voices Loaders
let voicesList = [];
function loadVoices() {
    if ('speechSynthesis' in window) {
        voicesList = window.speechSynthesis.getVoices();
    }
}
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    if (window.speechSynthesis.addEventListener) {
        window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    }
    loadVoices();
}

// Find the best matching native voice (preferably male)
function getBestVoiceForLang(langCode, preferMale = true) {
    if (!('speechSynthesis' in window)) return null;
    
    // Always get the fresh, live list of voices from the browser API to avoid race condition cache bugs
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;
    
    const searchCode = langCode.toLowerCase().replace('_', '-');
    
    // Filter voices that match the language prefix (e.g. "tr")
    const matchingVoices = voices.filter(voice => {
        const voiceLang = voice.lang.toLowerCase().replace('_', '-');
        return voiceLang === searchCode || voiceLang.startsWith(searchCode.split('-')[0]);
    });
    
    if (matchingVoices.length === 0) return null;
    
    if (preferMale) {
        const maleKeywords = [
            'male', 'erkek', 'man', 'boy', 'guy', 'gentleman', 
            'tolga', 'bartu', 'hakan', 'david', 'mark', 'daniel', 'paul', 'george', 
            'stefan', 'filip', 'pavel', 'alex', 'peter', 'james', 'thomas', 'robert'
        ];
        
        const maleVoices = matchingVoices.filter(voice => {
            const name = voice.name.toLowerCase();
            return maleKeywords.some(keyword => name.includes(keyword));
        });
        
        if (maleVoices.length > 0) {
            return maleVoices[0];
        }
    }
    
    // Fallback to first matching voice (native accent guaranteed)
    return matchingVoices[0];
}

// Google Translate TTS Web API Fallback (Plays native, high-quality audio streams if native pack is missing)
function speakGoogleTranslateTTS(text, langCode) {
    try {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        
        const lang = langCode.split('-')[0];
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;
        
        currentAudio = new Audio(url);
        
        const dot = document.getElementById('speech-indicator');
        if (dot) dot.classList.add('active');
        
        currentAudio.onended = () => {
            if (dot) dot.classList.remove('active');
        };
        currentAudio.onerror = () => {
            if (dot) dot.classList.remove('active');
        };
        
        currentAudio.play().catch(e => {
            console.error("Google Translate TTS playback failed:", e);
            if (dot) dot.classList.remove('active');
        });
    } catch (err) {
        console.error("Google Translate TTS execution failed:", err);
    }
}

// Multilingual Voice Alert engine (Custom Male & Native Accent Voice Selector with Async Retry & Google TTS Fallback)
function speakVoice(text, retryCount = 0) {
    if (!filters.voice) return;
    
    // Stop any currently playing Google TTS audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const voices = window.speechSynthesis.getVoices();
        
        // If voices are not ready yet, wait up to 5 times (total 500ms) for Chrome to initialize them
        if ((!voices || voices.length === 0) && retryCount < 5) {
            setTimeout(() => {
                speakVoice(text, retryCount + 1);
            }, 100);
            return;
        }
        
        let langCode = 'tr-TR';
        if (currentLang === 'tr') langCode = 'tr-TR';
        else if (currentLang === 'en') langCode = 'en-US';
        else if (currentLang === 'es') langCode = 'es-ES';
        else if (currentLang === 'fr') langCode = 'fr-FR';
        else if (currentLang === 'zh') langCode = 'zh-CN';
        else if (currentLang === 'it') langCode = 'it-IT';
        else if (currentLang === 'de') langCode = 'de-DE';
        else if (currentLang === 'nl') langCode = 'nl-NL';
        else if (currentLang === 'ru') langCode = 'ru-RU';
        else if (currentLang === 'ar') langCode = 'ar-SA';
        else if (currentLang === 'ku') langCode = 'tr-TR';
        else if (currentLang === 'zza') langCode = 'tr-TR';
        
        // Find best native voice (preferring male to address fake sounding/accent issues)
        const matchedVoice = getBestVoiceForLang(langCode, true);
        
        if (matchedVoice) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = langCode;
            utterance.voice = matchedVoice;
            utterance.rate = 0.95;
            
            const dot = document.getElementById('speech-indicator');
            if (dot) dot.classList.add('active');
            
            utterance.onend = () => {
                if (dot) dot.classList.remove('active');
            };
            utterance.onerror = () => {
                if (dot) dot.classList.remove('active');
            };
            
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn(`No native SpeechSynthesis voice found for ${langCode}. Falling back to Google Translate TTS.`);
            speakGoogleTranslateTTS(text, langCode);
        }
    }
}

// Trigger warning vocal demo
function triggerVoiceDemo() {
    const t = TRANSLATIONS[currentLang];
    
    if (routeIncidents.length === 0) {
        speakVoice(currentLang === 'tr' ? "Lütfen önce rota hesaplayın." : "Please calculate a route first.");
        return;
    }
    
    const inc = routeIncidents[0];
    let alertText = "";
    if (inc.type === 'radar') {
        alertText = t.speakRadar(inc.distanceAlong, inc.detail);
    } else if (inc.type === 'work') {
        alertText = t.speakWork(inc.distanceAlong, inc.detail);
    } else {
        alertText = t.speakToll(inc.distanceAlong, inc.name, inc.detail);
    }
    speakVoice(alertText);
    showHUD(alertText, "info");
}

// Project user position onto closest index of route coordinates to track physical progress
function getDistanceAndProgressOnRoute(userLoc) {
    let minDistance = Infinity;
    let closestIdx = 0;
    
    function getDistanceKm(coord1, coord2) {
        const R = 6371;
        const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
        const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
    
    for (let i = 0; i < routeCoordinates.length; i++) {
        const dist = getDistanceKm(userLoc, routeCoordinates[i]);
        if (dist < minDistance) {
            minDistance = dist;
            closestIdx = i;
        }
    }
    
    const currentDist = calculateDistanceAlongRoute(closestIdx);
    const progressFraction = routeCoordinates.length > 1 ? closestIdx / (routeCoordinates.length - 1) : 0;
    
    return {
        currentDist: currentDist,
        progressFraction: progressFraction
    };
}

// Real-time GPS Navigation Tracking (Replaced mock simulation for personal navigation app)
function toggleNavigation() {
    const t = TRANSLATIONS[currentLang];
    
    if (isNavigating) {
        // Stop tracking
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
        }
        isNavigating = false;
        
        if (navigationMarker) {
            map.removeLayer(navigationMarker);
            navigationMarker = null;
        }
        
        updateSimButtonText();
        document.getElementById('sim-btn').className = 'btn btn-primary';
        document.getElementById('nav-hud').classList.remove('show');
        showHUD(currentLang === 'tr' ? "Navigasyon durduruldu." : "Navigation stopped.", "info");
    } else {
        if (routeCoordinates.length === 0) return;
        
        isNavigating = true;
        warnedIncidents.clear();
        
        updateSimButtonText();
        document.getElementById('sim-btn').className = 'btn btn-secondary';
        
        document.getElementById('nav-hud').classList.add('show');
        
        if (window.innerWidth <= 768) {
            const panel = document.getElementById('control-panel');
            panel.classList.remove('expanded');
            panel.classList.add('collapsed');
        }
        
        const carIcon = L.divIcon({
            html: '<div style="background-color: #00a8ff; width: 16px; height: 16px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 12px #00a8ff;"></div>',
            className: 'gps-marker-container',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });
        
        // Initial marker at start coordinate
        navigationMarker = L.marker(routeCoordinates[0], { icon: carIcon }).addTo(map);
        map.setView(routeCoordinates[0], 16, { animate: false });
        
        showHUD(currentLang === 'tr' ? "Gerçek zamanlı GPS takibi başladı." : "Real-time GPS tracking active.", "info");
        speakVoice(t.speakNavStart);

        // Start watching actual physical GPS changes
        watchId = navigator.geolocation.watchPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const currentLoc = L.latLng(lat, lng);
                
                // Update navigation arrow/dot
                if (navigationMarker) {
                    navigationMarker.setLatLng(currentLoc);
                }
                
                // Keep centering map instantly on actual location
                map.setView(currentLoc, 16, { animate: false });
                
                // Project position to route progress
                const info = getDistanceAndProgressOnRoute(currentLoc);
                const currentDist = info.currentDist;
                const remainingDist = (routeDistance - currentDist).toFixed(1);
                
                document.getElementById('hud-desc').textContent = t.kmRemaining(remainingDist);
                const pct = info.progressFraction * 100;
                document.getElementById('hud-progress').style.width = `${pct}%`;
                
                // Trigger geofence warnings dynamically based on physical coordinate proximity
                checkUpcomingIncidents(currentLoc, currentDist);
                
                // Check if reached destination (within 100 meters of final coordinate)
                const distToDest = currentLoc.distanceTo(routeCoordinates[routeCoordinates.length - 1]);
                if (distToDest < 100) {
                    toggleNavigation();
                    speakVoice(t.speakFinished);
                    showHUD(t.speakFinished, "info");
                }
            },
            (error) => {
                console.error(error);
                showHUD(currentLang === 'tr' ? "GPS Sinyali Alınamıyor!" : "No GPS signal!", "warning");
            },
            { enableHighAccuracy: true, maximumAge: 1000 } // Request actual high accuracy for real drive
        );
    }
}

// Geofencing warnings checks
function checkUpcomingIncidents(currentLoc, currentDist) {
    const t = TRANSLATIONS[currentLang];
    const warningWindowKm = 1.0; // warn 1.0 km before incident
    
    routeIncidents.forEach(inc => {
        if (warnedIncidents.has(inc.name)) return;
        
        const distanceToIncident = inc.distanceAlong - currentDist;
        
        if (distanceToIncident > 0 && distanceToIncident <= warningWindowKm) {
            warnedIncidents.add(inc.name);
            
            const hud = document.getElementById('alert-hud');
            const icon = hud.querySelector('i');
            const textSpan = hud.querySelector('span');
            
            hud.className = 'alert-hud show';
            
            let speakText = "";
            
            if (inc.type === 'radar') {
                hud.className = 'alert-hud show radar';
                icon.className = 'fas fa-camera';
                textSpan.textContent = `${inc.name}: ${inc.detail}`;
                speakText = t.speakRadar(distanceToIncident.toFixed(1), inc.detail);
                setTimeout(() => hud.classList.remove('show'), 6000);
            } else if (inc.type === 'work') {
                hud.className = 'alert-hud show warning';
                icon.className = 'fas fa-triangle-exclamation';
                textSpan.textContent = `${inc.name}: ${inc.detail}`;
                speakText = t.speakWork(distanceToIncident.toFixed(1), inc.detail);
                setTimeout(() => hud.classList.remove('show'), 6000);
            } else if (inc.type === 'toll') {
                hud.className = 'alert-hud show info';
                icon.className = 'fas fa-credit-card';
                textSpan.textContent = `${inc.name}: ${inc.detail}`;
                speakText = t.speakToll(distanceToIncident.toFixed(1), inc.name, inc.detail);
                setTimeout(() => hud.classList.remove('show'), 6000);
            } else if (inc.type === 'rest') {
                hud.className = 'alert-hud show info';
                icon.className = 'fas fa-coffee';
                textSpan.textContent = `${inc.name}: ${inc.detail}`;
                speakText = t.speakRest ? t.speakRest(distanceToIncident.toFixed(1), inc.name) : `Mola alanı ${distanceToIncident.toFixed(1)} kilometre sonra.`;
                setTimeout(() => hud.classList.remove('show'), 6000);
            } else if (inc.type === 'gas') {
                hud.className = 'alert-hud show info';
                icon.className = 'fas fa-gas-pump';
                textSpan.textContent = `${inc.name}: ${inc.detail}`;
                speakText = t.speakGas ? t.speakGas(distanceToIncident.toFixed(1), inc.name) : `Akaryakıt istasyonu ${distanceToIncident.toFixed(1)} kilometre sonra.`;
                setTimeout(() => hud.classList.remove('show'), 6000);
            }
            
            speakVoice(speakText);
            
            document.getElementById('hud-instr').textContent = inc.name;
        }
    });
}

// Alert Banner HUD display helper
let hudTimeout;
function showHUD(message, type = "info") {
    const hud = document.getElementById('alert-hud');
    const icon = hud.querySelector('i');
    const textSpan = hud.querySelector('span');
    
    clearTimeout(hudTimeout);
    
    hud.className = 'alert-hud show';
    
    if (type === 'warning') {
        hud.classList.add('warning');
        icon.className = 'fas fa-exclamation-triangle';
    } else if (type === 'info') {
        hud.classList.add('info');
        icon.className = 'fas fa-info-circle';
    } else if (type === 'radar') {
        hud.classList.add('radar');
        icon.className = 'fas fa-camera';
    }
    
    textSpan.textContent = message;
    
    hudTimeout = setTimeout(() => {
        hud.classList.remove('show');
    }, 4000);
}



// Custom Cursor Logic for Desktop (iPadOS-like inertia & hover magnet behavior)
function initCustomCursor() {
    const dot = document.querySelector('.custom-cursor-dot');
    const outline = document.querySelector('.custom-cursor-outline');
    
    if (!dot || !outline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Show cursor on first mouse move
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!document.body.classList.contains('cursor-active')) {
            document.body.classList.add('cursor-active');
        }
        
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Custom requestAnimationFrame loop for outline inertia (Apple magnet trail feel)
    function animateOutline() {
        const ease = 0.16; // Lerp factor for smooth lag/follow
        outlineX += (mouseX - outlineX) * ease;
        outlineY += (mouseY - outlineY) * ease;
        
        outline.style.left = outlineX + 'px';
        outline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    
    requestAnimationFrame(animateOutline);

    // Track mouse leaving/entering window
    document.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-active');
    });
    
    document.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-active');
    });

    // Hover effect on interactive elements
    const updateHoverStates = () => {
        const interactiveElements = document.querySelectorAll(
            'a, button, input, select, .custom-select-btn, .custom-select-option, .leaflet-interactive, .fab, .switch, .slider, .suggestion-item, .warning-item'
        );
        
        interactiveElements.forEach(el => {
            if (el.dataset.hasCursorListener) return;
            el.dataset.hasCursorListener = 'true';

            el.addEventListener('mouseenter', () => {
                dot.classList.add('hovered');
                outline.classList.add('hovered');
            });
            
            el.addEventListener('mouseleave', () => {
                dot.classList.remove('hovered');
                outline.classList.remove('hovered');
            });
        });
    };

    updateHoverStates();

    // Re-run periodically using MutationObserver to attach to dynamically created items (warnings, autocomplete, map layers)
    const observer = new MutationObserver(() => {
        updateHoverStates();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
