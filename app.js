const BUILDINGS = [
  {
    id: "greenhouse-large",
    name: "Велика Оранжерея",
    icon: "🌿",
    color: "#22c55e",
    image: "../img/interior-greenhouse-large.png",
    dot: { x: 17.0, y: 52.0 },
    description: "Головна біосфера колонії — купол діаметром 40 метрів, де вирощуються продукти харчування та генерується кисень для всієї бази.",
    stats: [
      { label: "Температура",  value: "22°C" },
      { label: "Вологість",    value: "68%" },
      { label: "O₂ / добу",   value: "145 кг" },
      { label: "Врожай / міс", value: "320 кг" }
    ],
    details: [
      "Вирощування пшениці, картоплі, сої та зелені",
      "Потужна система гідропоніки на 3 рівнях",
      "Виробництво 80% кисню для колонії",
      "Автоматизований полив та живлення рослин",
      "UV-лампи, що імітують земне сонце",
      "Місткість: 2400 рослинних одиниць"
    ]
  },
  {
    id: "greenhouse-small",
    name: "Мала Оранжерея",
    icon: "🌱",
    color: "#00ff5e",
    image: "../img/interior-greenhouse-small.png",
    dot: { x: 20.0, y: 75.0 },
    description: "Дослідницький купол для експериментів з новими культурами та адаптації рослин до умов Марса.",
    stats: [
      { label: "Температура", value: "18°C" },
      { label: "Вологість",   value: "55%" },
      { label: "Культур",     value: "42" },
      { label: "Об'єм",       value: "380 м³" }
    ],
    details: [
      "Лабораторія генетичної адаптації рослин",
      "Тестування 40+ нових культур одночасно",
      "Вирощування ліків та трав",
      "Реактор компосту та переробки органіки"
    ]
  },
  {
    id: "command-center",
    name: "Командний Центр",
    icon: "📡",
    color: "#5ba5ff",
    image: "../img/interior-command-center.png",
    dot: { x: 40.0, y: 46.0 },
    description: "Мозок колонії — тут координуються всі операції бази, здійснюється зв'язок із Землею та контролюються системи виживання.",
    stats: [
      { label: "Персонал", value: "8 осіб" },
      { label: "Антени",   value: "3 шт" },
      { label: "Uptime",   value: "99.97%" },
      { label: "Затримка", value: "14 хв" }
    ],
    details: [
      "Головний комп'ютер управління базою",
      "Зв'язок із Землею (затримка 4–24 хвилини)",
      "Моніторинг 600+ сенсорів по всій базі",
      "Центр кризового управління та евакуації",
      "Метеостанція та сейсмографи",
      "ШІ-асистент ARES для прийняття рішень"
    ]
  },
  {
    id: "greenhouse-center",
    name: "Центральна Оранжерея",
    icon: "🍃",
    color: "#4ade80",
    image: "../img/interior-greenhouse-center.png",
    dot: { x: 55.0, y: 65.0 },
    description: "Рекреаційний купол — зелений простір для відпочинку колоністів та підтримки психологічного здоров'я команди.",
    stats: [
      { label: "Площа",             value: "280 м²" },
      { label: "Дерев",             value: "24 шт" },
      { label: "Відвідувань / день", value: "35" },
      { label: "Рівень O₂",         value: "+12%" }
    ],
    details: [
      "Парк та зона відпочинку для колоністів",
      "Дерева та чагарники для психологічного комфорту",
      "Зона медитації та прогулянок",
      "Вирощування фруктів та ягід"
    ]
  },
  {
    id: "hangar",
    name: "Ракетний Ангар",
    icon: "🚀",
    color: "#818cf8",
    image: "../img/interior-hangar.png",
    dot: { x: 80.0, y: 62.0 },
    description: "Головний стартовий комплекс колонії. Тут зберігається, обслуговується та заправляється ракета для місій та евакуації.",
    stats: [
      { label: "Паливо",    value: "87%" },
      { label: "Стан",      value: "Готова" },
      { label: "Місій",     value: "4" },
      { label: "Місткість", value: "6 осіб" }
    ],
    details: [
      "Багаторазова ракета класу «Феро-М»",
      "Система заправки метановим паливом з атмосфери Марса",
      "Майстерня ремонту та технічного обслуговування",
      "Склад запасних частин та обладнання",
      "Шлюзова камера для EVA-виходів",
      "Готовність до старту: 72 години"
    ]
  }
];



// Hotspots
const mapWrap = document.getElementById('mapWrap');

BUILDINGS.forEach(b => {
  const btn = document.createElement('button');
  btn.className = 'hotspot';
  btn.style.left = b.dot.x + '%';
  btn.style.top  = b.dot.y + '%';
  btn.setAttribute('aria-label', b.name);

  btn.innerHTML = `
    <div class="hotspot-ring" style="border-color: ${b.color};"></div>
    <div class="hotspot-dot" style="background: ${b.color};"></div>
    <div class="hotspot-hover-ring" style="border-color: ${b.color}; background: ${b.color}30;"></div>
    <div class="hotspot-label">
      <div class="hotspot-label-inner" style="border-color: ${b.color}; color: ${b.color}; box-shadow: 0 0 14px ${b.color}44;">
        ${b.icon} ${b.name}
      </div>
      <div class="hotspot-label-line" style="background: linear-gradient(to bottom, ${b.color}88, transparent);"></div>
    </div>
  `;

  btn.addEventListener('click', () => openModal(b));
  mapWrap.appendChild(btn);
});

// Modal
function openModal(b) {
  const c = b.color;

  const card = document.getElementById('modalCard');
  card.style.borderColor = c + '44';
  card.style.boxShadow   = `0 0 80px ${c}18, 0 30px 60px rgba(0,0,0,.8)`;

  document.getElementById('modalTopBar').style.background = `linear-gradient(90deg, transparent, ${c}, transparent)`;
  document.getElementById('modalImg').src                 = b.image;
  document.getElementById('modalImg').alt                 = b.name;
  document.getElementById('modalIcon').textContent        = b.icon;
  document.getElementById('modalIcon').style.background   = c + '20';
  document.getElementById('modalIcon').style.borderColor  = c + '55';
  document.getElementById('modalIcon').style.boxShadow    = `0 0 20px ${c}30`;
  document.getElementById('modalTag').style.color         = c;
  document.getElementById('modalName').textContent        = b.name;
  document.getElementById('modalDesc').textContent        = b.description;

  document.getElementById('modalStats').innerHTML = b.stats.map(s => `
    <div class="stat-card" style="background: ${c}0a; border-color: ${c}25;">
      <div class="stat-label" style="color: ${c}aa;">${s.label}</div>
      <div class="stat-value">${s.value}</div>
    </div>
  `).join('');

  document.getElementById('modalDetailsList').innerHTML = b.details.map(d => `
    <li>
      <div class="detail-dot" style="background: ${c};"></div>
      <span>${d}</span>
    </li>
  `).join('');

  const closeBtn = document.getElementById('modalCloseBtn');
  closeBtn.style.background   = c + '20';
  closeBtn.style.borderColor  = c + '50';
  closeBtn.style.color        = c;

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target.id === 'modalOverlay') closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});