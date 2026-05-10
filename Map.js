// Створюємо базову сцену, камеру та WebGL‑рендерер
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

camera.position.z = 3.5;
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Адаптація під зміну розміру вікна
window.addEventListener('resize', () => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// Освітлення сцени (м’яке + напрямлене як "сонце")
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const sun = new THREE.DirectionalLight(0xfff5e0, 1.3);
sun.position.set(5, 3, 5);
scene.add(sun);

// Завантаження текстури та створення моделі Марса
const loader = new THREE.TextureLoader();
const marsMat = new THREE.MeshPhongMaterial({
  map: loader.load('../img/mars.jpg'),
  shininess: 8,
});
const mars = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), marsMat);
scene.add(mars);

// OrbitControls — керування камерою (обертання, зум, автоповорот)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping   = true;
controls.dampingFactor   = 0.05;
controls.minDistance     = 1.6;
controls.maxDistance     = 6;
controls.autoRotate      = true;   // автоматичне обертання планети
controls.autoRotateSpeed = 0.4;

// Зупиняємо автоповорот під час взаємодії
renderer.domElement.addEventListener('pointerdown', () => controls.autoRotate = false);
renderer.domElement.addEventListener('pointerup',   () => controls.autoRotate = true);

// Підказка, яка з’являється тільки при достатньому наближенні
const hint = document.createElement('div');
hint.textContent = 'клікни щоб зайти';
hint.style.cssText = `
  position: fixed; bottom: 40px; left: 50%;
  transform: translateX(-50%);
  color: #ff9966; font-family: 'Courier New', monospace;
  font-size: 26px; letter-spacing: 0.2em;
  opacity: 0; transition: opacity 0.5s;
  pointer-events: none;
`;
document.body.appendChild(hint);

const ZOOM_THRESHOLD = 1.9; // поріг, коли камера "достатньо близько"

// Показуємо/ховаємо підказку залежно від відстані камери
controls.addEventListener('change', () => {
  hint.style.opacity = camera.position.length() < ZOOM_THRESHOLD ? '1' : '0';
});

// Перехід на surface.html при кліку, якщо користувач наблизився
renderer.domElement.addEventListener('click', () => {
  if (camera.position.length() < ZOOM_THRESHOLD) {

    const overlay = document.getElementById("overlay");
    overlay.classList.add("fade"); // анімація затемнення перед переходом

    setTimeout(() => {
      window.location.href = 'surface.html';
    }, 800);
  }
});

// Основний цикл рендеру (анімація)
(function draw() {
  requestAnimationFrame(draw);
  controls.update();
  renderer.render(scene, camera);
})();
