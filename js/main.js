/* main.js
   Creates a basic 3D animated airplane using Three.js
*/

let scene, camera, renderer, plane;

function init() {
  const container = document.getElementById('plane-container');
  
  // Create scene and camera
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB); // Sky blue
  
  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);
  
  // Create a simple airplane model
  plane = new THREE.Group();
  
  // Fuselage: cylinder rotated horizontally
  const fuselageGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 16);
  const fuselageMaterial = new THREE.MeshPhongMaterial({ color: 0x5555ff });
  const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial);
  fuselage.rotation.z = Math.PI / 2;
  plane.add(fuselage);
  
  // Wing: box geometry
  const wingGeometry = new THREE.BoxGeometry(0.1, 1, 0.05);
  const wingMaterial = new THREE.MeshPhongMaterial({ color: 0xff5555 });
  const wing = new THREE.Mesh(wingGeometry, wingMaterial);
  wing.position.set(0, 0, 0);
  plane.add(wing);
  
  // Tail: smaller box geometry
  const tailGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.05);
  const tailMaterial = new THREE.MeshPhongMaterial({ color: 0x55ff55 });
  const tail = new THREE.Mesh(tailGeometry, tailMaterial);
  tail.position.set(-0.9, 0.2, 0);
  plane.add(tail);
  
  // Add the airplane to the scene
  scene.add(plane);
  
  // Start animation loop
  animate();
  
  // Resize listener
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  const container = document.getElementById('plane-container');
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);
  
  // Animate the airplane with a gentle rotation and horizontal movement
  plane.rotation.y += 0.01;
  plane.rotation.z += 0.005;
  plane.position.x = Math.sin(Date.now() * 0.001) * 0.5;
  
  renderer.render(scene, camera);
}

init();
