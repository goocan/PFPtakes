// js/main.js

let scene, camera, renderer;

function init() {
  const container = document.getElementById('plane-container');
  
  // Create scene and camera
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB); // Sky blue background
  
  camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);
  
  // Create a heart shape using Bézier curves
  const x = 0, y = 0;
  const heartShape = new THREE.Shape();
  heartShape.moveTo(x + 5, y + 5);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
  
  // Extrude settings for 3D depth
  const extrudeSettings = {
    steps: 2,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 0.5,
    bevelSize: 0.5,
    bevelOffset: 0,
    bevelSegments: 2
  };
  
  // Create the extruded geometry and center it
  const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  heartGeometry.center();
  
  // Create heart mesh with a fun, shiny pink material
  const heartMaterial = new THREE.MeshPhongMaterial({
    color: 0xff1493,
    shininess: 100
  });
  const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);
  
  // Scale the heart down to fit nicely in the scene
  heartMesh.scale.set(0.2, 0.2, 0.2);
  
  // Add the heart to the scene
  scene.add(heartMesh);
  
  // Animate the heart: gentle rotation and a bobbing motion
  function animate() {
    requestAnimationFrame(animate);
    
    heartMesh.rotation.y += 0.01;
    heartMesh.rotation.x += 0.005;
    heartMesh.position.y = Math.sin(Date.now() * 0.002) * 0.5;
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Adjust scene on window resize
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  const container = document.getElementById('plane-container');
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

init();
