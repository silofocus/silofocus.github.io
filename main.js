import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js';


/* Tagline rotation */
const taglines = [
    "Your digital health spa.",
    "Stay present.",
    "Goodbye screen addiction.",
    "The ultimate screentime tool.",
    "Less screen, more time.",
    "Your digital dopamine cleanse.",
    "Rewire your brain."
];

let taglineIndex = Math.floor(Math.random() * taglines.length);
let visibleTagline = 0;
const taglineElements = [document.getElementById('tagline1'), document.getElementById('tagline2')];
taglineElements[0].textContent = taglines[taglineIndex];
taglineElements[0].classList.add('show');
setInterval(changeTagline, 6500);

function changeTagline() {
    taglineIndex = (taglineIndex + 1) % taglines.length;
    let hiddenTagline = visibleTagline ^ 1;
    taglineElements[visibleTagline].classList.remove('show');
    taglineElements[hiddenTagline].textContent = taglines[taglineIndex];
    taglineElements[hiddenTagline].classList.add('show');
    visibleTagline = hiddenTagline
}


/* Silo graphic */

// Define canvas dimensions
let WIDTH = 250
let HEIGHT = 200

// Create the scene
let scene = new THREE.Scene();

// Create the camera
let camera = new THREE.PerspectiveCamera(
    75, // fov = field of view
    WIDTH / HEIGHT, // aspect ratio
    0.1, // near plane
    1000 // far plane
);

// Create the renderer
let renderer = new THREE.WebGLRenderer({antialias:true});

// Set the size and color of the renderer
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x252525, 1);

// Add the renderer's canvas to the top of the body
document.addEventListener('DOMContentLoaded', function() {
  let containerMain = document.querySelector('.container-logo');
  let canvas = renderer.domElement;
  containerMain.prepend(canvas);
});

// Add OrbitControls
let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // for inertia
controls.dampingFactor = 0.25;
controls.enableZoom = false;

// Add TrackballControls
let trackballControls = new TrackballControls(camera, renderer.domElement);
trackballControls.noZoom = true;
trackballControls.noPan = true;
trackballControls.staticMoving = false; // enable inertia
trackballControls.dynamicDampingFactor = 10.1;

let lightCoordsCollection = [
    [-1,1,1],  // Front light 1
    [0, 1, 1.5],  // Front light 2
    [1, 1.5, -0.5], // Back light
    [0, -2, 0],  // Bottom light
    [1, 0, 1], // Botom light 2
]

for (const lightCoords of lightCoordsCollection) {
    // Light
    let light = new THREE.DirectionalLight(0xffffff, 0.48);
    light.position.set(...lightCoords); // position the light above
    light.castShadow = true; // enable shadows from this light
    light.shadow.radius = 15;
    scene.add(light);

    // // (DEBUGGING) Light view mesh
    // let lightSphereMaterial = new THREE.MeshStandardMaterial({color: 0xb0b38f});
    // let lightSphereGeometry = new THREE.SphereGeometry( 0.08, 32, 16 );
    // let lightSphere = new THREE.Mesh(lightSphereGeometry, lightSphereMaterial);
    // lightSphere.position.set(...lightCoords)
    // scene.add(lightSphere)
}


// Create ladder group and material
let ladder = new THREE.Group();
let ladderMaterial = new THREE.MeshStandardMaterial({color: 0x80b3ff});

// Create frame edges
for(let i = 0; i <= 1; i++){
    let frameEdgeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
    let frameEdge = new THREE.Mesh(frameEdgeGeometry, ladderMaterial);
    frameEdge.position.set(0.6 * (i == 0 ? 1 : -1), 0, 0);
    ladder.add(frameEdge);
}

// Create ladder edges
for(let i = 0; i <= 1; i++){
    // Bar
    let ladderEdgeGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.6, 32);
    let ladderEdge = new THREE.Mesh(ladderEdgeGeometry, ladderMaterial);
    ladderEdge.position.set(0.25 * (i == 0 ? 1 : -1) - 0.08, -0.2, 0);
    ladder.add(ladderEdge);

    // Rounded cap
    let ladderEdgeCapGeometry = new THREE.SphereGeometry( 0.08, 32, 16 );
    let ladderEdgeCap = new THREE.Mesh(ladderEdgeCapGeometry, ladderMaterial);
    ladderEdgeCap.position.set(0.25 * (i == 0 ? 1 : -1) - 0.08, 0.6, 0);
    ladder.add(ladderEdgeCap)
}

// Create ladder rungs
let rungGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.4, 32);
for(let i = 0; i <= 1; i++){
    let rung = new THREE.Mesh(rungGeometry, ladderMaterial);
    rung.rotation.z = Math.PI / 2;
    rung.position.set(-0.1, -0.4 + i * 0.6, 0);
    ladder.add(rung);
}

// Create dome
let path = new THREE.Curve();
path.getPoint = function(t) {
    let angle = Math.PI * t;
    return new THREE.Vector3(Math.cos(angle) * 0.6, Math.sin(angle) * 0.6, 0).multiplyScalar(1);
};
let domeGeometry = new THREE.TubeGeometry(path, 20, 0.1, 8, false);
let dome = new THREE.Mesh(domeGeometry, ladderMaterial);
dome.position.set(0, 1, 0);
ladder.add(dome);

// Create crossbar
let crossbarGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1, 32);
let crossbar = new THREE.Mesh(crossbarGeometry, ladderMaterial);
crossbar.rotation.z = Math.PI / 2;
crossbar.position.set(0, 1, 0);
ladder.add(crossbar);

// Create base
let baseGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.65, 32);
let base = new THREE.Mesh(baseGeometry, ladderMaterial);
base.rotation.z = Math.PI / 2;
base.position.set(0, -1, 0);
ladder.add(base);
let baseCapGeometry = new THREE.SphereGeometry( 0.08, 32, 16 );
for(let i = 0; i <= 1; i++){
    let sphere = new THREE.Mesh(baseCapGeometry, ladderMaterial);
    sphere.position.set((i ? 1 : -1) * 0.825, -1, 0);
    ladder.add(sphere)
}

// Create a canvas
let canvas = document.createElement('canvas');
canvas.width = 256;
canvas.height = 256;

// Get the context of the canvas
let context = canvas.getContext('2d');

// Create the gradient
let gradient = context.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2
);

// Add color stops to the gradient
gradient.addColorStop(0, '#37945c');
gradient.addColorStop(1, '#1a6317');

// Apply the gradient to the context
context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);

// Create a texture from the canvas
let texture = new THREE.Texture(canvas);
texture.needsUpdate = true;

// Create the material using the texture
let diskMaterial = new THREE.MeshPhongMaterial({ map: texture });
// Create disk
// let diskMaterial = new THREE.MeshStandardMaterial({color: 0x79cf74});
let diskGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);
let disk = new THREE.Mesh(diskGeometry, diskMaterial);
disk.position.set(0, -1.4, 0);
ladder.add(disk);

// #5aadfd, #97e4bc

// Add shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // soft shadow
renderer.shadowMap.autoUpdate = true;
renderer.shadowMap.needsUpdate = true;
ladder.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
    child.receiveShadow = true;
  }
});

// Add the ladder to the scene
scene.add(ladder);

// Move the camera back so we can view the ladder
camera.position.z = 3;

// Create the animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();
    trackballControls.update();

    // Perpetually rotate the ladder
    ladder.rotation.y -= 0.01;

    // Render the scene
    renderer.render(scene, camera);
}

animate();
