// Инициализация карты Leaflet (в футере)
const leafletMap = L.map("leaflet-map").setView([59.956868, 30.308576], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(leafletMap);

const TulipIcon = L.Icon.extend({
  options: {
    iconUrl: "photos/tulip_icon.png",
    iconSize: [30, 40],
    shadowSize: [40, 40],
    iconAnchor: [20, 20],
    shadowAnchor: [20, 20],
    popupAnchor: [-5, -5],
  },
});

const redTulip = new TulipIcon();
L.marker([59.956868, 30.308576], { icon: redTulip })
  .addTo(leafletMap)
  .bindPopup("Красный тюльпан");

// Инициализация Swiper слайдера
const TrandingSlider = new Swiper(".tranding-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Код для карты мира
document.addEventListener("DOMContentLoaded", function () {
  const svg = d3.select("#world_map");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  // Проекция для глобуса
  const projection = d3
    .geoOrthographic()
    .scale(250)
    .translate([width / 2, height / 2])
    .clipAngle(90);

  const path = d3.geoPath().projection(projection);

  // Цветовая шкала
  const colorScale = d3
    .scaleThreshold()
    .domain([1000000, 10000000, 50000000, 100000000, 500000000, 1000000000])
    .range([
      "#ffcccf",
      "#ffc1c4",
      "#ffb3b6",
      "#ff9a9e",
      "#f58b90",
      "#e67c82",
      "#d46d73",
    ]);

  // Данные о тюльпанах
  const tulips_data = {
    Netherlands: 4000000000, // 4 billion bulbs (92% of global trade)
    Japan: 200000000,
    France: 180000000,
    Poland: 150000000,
    Germany: 120000000,
    "United Kingdom": 100000000,
    "United States": 90000000,
    Canada: 75000000,
    Turkey: 70000000,
    China: 65000000,
    Belgium: 60000000,
    "New Zealand": 55000000,
    Denmark: 50000000,
    Sweden: 45000000,
    Norway: 40000000,
    Finland: 35000000,
    Italy: 30000000,
    Spain: 25000000,
    "South Korea": 20000000,
    Russia: 15000000,
    Ukraine: 12000000,
    Australia: 10000000,
    Austria: 8000000,
    Hungary: 7000000,
    "Czech Republic": 6000000,
    Chile: 5000000,
    "South Africa": 4000000,
    Kenya: 3000000,
    Colombia: 2000000,
    Morocco: 1000000,
    Kazakhstan: 10000000,
    // Добавьте другие страны по необходимости
  };

  // Загрузка данных
  d3.json(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
  ).then(function (world) {
    // Рисуем страны
    const countries = svg
      .selectAll("path")
      .data(world.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => {
        const countryName = d.properties.name;
        return colorScale(tulips_data[countryName] || 0);
      })
      .attr("stroke", "#FF6363")
      .attr("stroke-width", 1)
      .on("mouseover", function (event, d) {
        const countryName = d.properties.name;
        const tulipsCount = tulips_data[countryName] || "No data";
        d3.select("#stats-panel")
          .style("visibility", "visible")
          .html(
            `<strong>${countryName}</strong><br>Tulips: ${
              typeof tulipsCount === "number"
                ? tulipsCount.toLocaleString()
                : tulipsCount
            }`
          );
      })
      .on("mouseover", function (event, d) {
        const countryName = d.properties.name;
        const tulipsCount = tulips_data[countryName] || "No data";

        d3.select("#country-stats").html(`
        <h4>${countryName}</h4>
        <p><strong>Tulip production:</strong> ${
          typeof tulipsCount === "number"
            ? tulipsCount.toLocaleString() + " "
            : tulipsCount
        }</p>
    `);

        // Подсветка страны
        d3.select(this).attr("stroke", "#FF0000").attr("stroke-width", 2);
      })
      .on("mouseout", function () {
        // Убираем подсветку
        d3.select(this).attr("stroke", "#FF6363").attr("stroke-width", 1);
      });

    // фон
    svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", projection.scale())
      .attr("fill", "#ffebec")
      .attr("stroke", "#FF6363")
      .lower();

    // Автоматическое вращение
    let rotation = [0, 0];
    const rotationSpeed = 0.2;

    d3.timer(function () {
      rotation[0] += rotationSpeed;
      projection.rotate(rotation);
      countries.attr("d", path);
    });

    // Интерактивное вращение
    svg.call(
      d3.drag().on("drag", function (event) {
        rotation[0] += event.dx / 2;
        rotation[1] -= event.dy / 2;
        projection.rotate(rotation);
        countries.attr("d", path);
      })
    );
  });
});
