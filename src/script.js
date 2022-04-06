import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import earth from "./scripts/earth";
import sun from "./scripts/sun";
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";

// loaders
// const textureLoader = new THREE.TextureLoader();
// const flatTexture = textureLoader.load("/assets/earthColor.jpg");
// const normalTexture = textureLoader.load("/assets/earthHeight.png");
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);

earth.position.set(50, 0, 0);
scene.add(earth);

// Materials

const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color(0x663310);

// Mesh
// const box = new THREE.Mesh(geometry, material);
// box.position.set(1, 1, 1);
// scene.add(box);

// Lights

scene.add(sun);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.x = 0;
pointLight.position.y = 0;
pointLight.position.z = 0;

scene.add(pointLight);
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

/**
 * Sizes
 */

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  105,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 100;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//GLOWING

const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0.1;
bloomPass.strength = 3; //intensity of glow
bloomPass.radius = 1;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

/**
 * Animate
 */

// function earthMove(earthCords) {
//   if (earthCords.direction === "back") {
//     earthCords.x -= 0.5;
//     earthCords.z -= 0.5;
//   } else if (earthCords.direction === "left") {
//     earthCords.x -= 0.5;
//     earthCords.z += 0.5;
//   } else if (earthCords.direction === "top") {
//     earthCords.x += 0.5;
//     earthCords.z += 0.5;
//   } else if (earthCords.direction === "right") {
//     earthCords.x += 0.5;
//     earthCords.z -= 0.5;
//   }
//   // direction
//   if (earthCords.x == 50 && earthCords.z == 0) {
//     earthCords.direction = "back";
//   } else if (earthCords.x == 0 && earthCords.z == -50) {
//     earthCords.direction = "left";
//   } else if (earthCords.x == -50 && earthCords.z == 0) {
//     earthCords.direction = "top";
//   } else if (earthCords.x == 0 && earthCords.z == 50) {
//     earthCords.direction = "right";
//   }
//   // console.log(x, z);
//   earth.position.set(earthCords.x, 0, earthCords.z);
// }
const clock = new THREE.Clock();
var t = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  t += 0.01;
  // Update objects
  earth.rotation.y = 0.3 * elapsedTime;
  earth.position.x = 50 * Math.cos(t) + 0;
  earth.position.z = 50 * Math.sin(t) + 0;
  // earthMove(earthCords);
  // Update Orbital Controls
  controls.update();
  // console.log(earthCords);
  // Render
  renderer.render(scene, camera);
  bloomComposer.render();
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
