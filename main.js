import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js';

/* Tagline randomization */
const taglines = [
    "Your digital health spa.",
    "Stay present.",
    "Goodbye screen addiction."
];

let tagline = taglines[Math.floor(Math.random() * taglines.length)];
document.getElementById("tagline").innerText = tagline


/* Silo graphic */

// Create the scene
let scene = new THREE.Scene();

// 2. Create the camera
let WIDTH = 200
let HEIGHT = 200
let camera = new THREE.PerspectiveCamera(
    75, // fov = field of view
    WIDTH / HEIGHT, // aspect ratio
    0.1, // near plane
    1000 // far plane
);

// Create the renderer
let renderer = new THREE.WebGLRenderer({antialias:true});

// Set the size and color of the renderer
// renderer.setSize(window.innerWidth, window.innerHeight);
let canvasWidth = WIDTH;
let canvasHeight = HEIGHT;
renderer.setSize(canvasWidth, canvasHeight);
renderer.setClearColor(0x252525, 1);

// Add the renderer's canvas to the top of the body
// document.body.insertBefore(renderer.domElement, containerMain);
// let containerMain = document.querySelector('.container-main');
// containerMain.prepend(renderer.domElement);
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
trackballControls.dynamicDampingFactor = 0.1;

// create ladder material
let ladderMaterial = new THREE.MeshBasicMaterial({color: 0x80b3ff});
let baseMaterial = new THREE.MeshBasicMaterial({color: 0x79cf74});

// Create a group for the ladder
let ladder = new THREE.Group();

// Create the cylinders for the frame
for(let i = 0; i <= 1; i++){
    let geometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
    let frame = new THREE.Mesh(geometry, ladderMaterial);
    frame.position.set(0.6 * (i == 0 ? 1 : -1), 0, 0); // Adjust the position for each cylinder
    ladder.add(frame);
}

// Create the cylinders for the ladder edges
for(let i = 0; i <= 1; i++){
    let geometry = new THREE.CylinderGeometry(0.08, 0.08, 1.6, 32);
    let cylinder = new THREE.Mesh(geometry, ladderMaterial);
    cylinder.position.set(0.25 * (i == 0 ? 1 : -1) - 0.08, -0.2, 0); // Adjust the position for each cylinder
    ladder.add(cylinder);
}

// Create the ladder rungs
for(let i = 0; i <= 1; i++){
    let geometry = new THREE.CylinderGeometry(0.08, 0.08, 0.4, 32);
    let rung = new THREE.Mesh(geometry, ladderMaterial);
    rung.rotation.z = Math.PI / 2;
    rung.position.set(-0.1, -0.4 + i * 0.6, 0); // Adjust the position for each cylinder
    ladder.add(rung);
}

// Create the cap
let path = new THREE.Curve();
path.getPoint = function(t) {
    let a = Math.PI * t; // angle
    return new THREE.Vector3(Math.cos(a) * 0.6, Math.sin(a) * 0.6, 0).multiplyScalar(1);
};
let tubeGeometry = new THREE.TubeGeometry(path, 20, 0.1, 8, false);
let semiCircle = new THREE.Mesh(tubeGeometry, ladderMaterial);
semiCircle.position.set(0, 1, 0); // Adjust the position to match the top of the ladder
ladder.add(semiCircle);

// Create the crossbar
let crossbarGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1, 32);
let crossbar = new THREE.Mesh(crossbarGeometry, ladderMaterial);
crossbar.rotation.z = Math.PI / 2;
crossbar.position.set(0, 1, 0); // Adjust the position for each cylinder
ladder.add(crossbar);

// Create the ladder base
let baseGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);
let base = new THREE.Mesh(baseGeometry, baseMaterial);
base.position.set(0, -1.2, 0); // Adjust the position for each cylinder
ladder.add(base);

// #5aadfd, #97e4bc


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

    // spin
    ladder.rotation.y -= 0.01; // rotate the ladder
    // Render the scene
    renderer.render(scene, camera);
}

animate();
