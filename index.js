


// // 1. Create the scene
// let scene = new THREE.Scene();

// // 2. Create the camera
// let camera = new THREE.PerspectiveCamera(
//     75, // fov = field of view
//     window.innerWidth/window.innerHeight, // aspect ratio
//     0.1, // near plane
//     1000 // far plane
// );

// // 3. Create the renderer
// let renderer = new THREE.WebGLRenderer();

// // 4. Set the size and color of the renderer
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor( 0x252525, 1);

// // 5. Add the renderer's canvas to the top of the body
// let containerMain = document.querySelector('.container-main');
// document.body.insertBefore(renderer.domElement, containerMain);

// // 6. Add some geometry (e.g., a spinning cube)
// let geometry = new THREE.BoxGeometry(1, 1, 1);
// let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
// let cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// // 7. Move the camera back so we can view the cube
// camera.position.z = 5;

// // Create a group for the ladder
// let ladder = new THREE.Group();

// // Create the cylinders for the ladder
// for(let i = 0; i < 7; i++){
//     let geometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
//     let material = new THREE.MeshBasicMaterial({color: 0xffff00});
//     let cylinder = new THREE.Mesh(geometry, material);
//     cylinder.position.set(i*0.3, 0, 0); // Adjust the position for each cylinder
//     ladder.add(cylinder);
// }

// // Create the semi-circle with a TubeGeometry
// let path = new THREE.Curve();
// path.getPoint = function(t) {
//     let a = 2 * Math.PI * t; // angle
//     return new THREE.Vector3(Math.cos(a), Math.sin(a), 0).multiplyScalar(1);
// };
// let tubeGeometry = new THREE.TubeGeometry(path, 20, 0.05, 8, false);
// let semiCircle = new THREE.Mesh(tubeGeometry, material);
// semiCircle.position.set(1, 1, 0); // Adjust the position to match the top of the ladder
// ladder.add(semiCircle);

// // Add the ladder to the scene
// scene.add(ladder);

// // 8. Create the animation loop
// function animate() {
//     requestAnimationFrame(animate);
//     // Spin the cube
//     // cube.rotation.x += 0.01;
//     cube.rotation.y -= 0.002;
//     ladder.rotation.y += 0.01; // rotate the ladder
//     // Render the scene
//     renderer.render(scene, camera);
// }

// animate();

// // 9. Handle window resizes
// window.addEventListener('resize', onWindowResize, false);

// function onWindowResize(){
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

