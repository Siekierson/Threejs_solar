import * as THREE from "three";
const textureLoader = new THREE.TextureLoader();
const flatTexture = textureLoader.load("/assets/earthColor.jpg");
const normalTexture = textureLoader.load("/assets/earthHeight.png");

const geometry = new THREE.SphereBufferGeometry(2, 64, 64);
const material = new THREE.MeshPhongMaterial({
  map: flatTexture,
  normalMap: normalTexture,
});
// material.metalness = 0.7;
// material.roughness = 0.2;

// material.normalMap = normalTexture;
// material.color = new THREE.Color(0xffffff);
const earth = new THREE.Mesh(geometry, material);
// sphere.overdraw = true;
// sphere.castShadow = true;
export default earth;
