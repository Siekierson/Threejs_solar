import * as THREE from "three";
const textureLoader = new THREE.TextureLoader();
const flatTexture = textureLoader.load("/assets/sun.jpg");

const geometry = new THREE.SphereBufferGeometry(20, 64, 64);
const material = new THREE.MeshBasicMaterial({
  map: flatTexture,
  //   emissive: new THREE.Color(0xffffff),
  //   emissiveIntensity: 0.7,
});
// material.emissive = new THREE.Color(0xffffff);
// material.emissiveIntensity = 1;
const sun = new THREE.Mesh(geometry, material);

export default sun;
