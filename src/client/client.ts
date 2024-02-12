import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

// const light = new THREE.SpotLight(0xffffff, Math.PI * 20)
// light.position.set(5, 5, 5)
// scene.add(light);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 10

const renderer = new THREE.WebGLRenderer()
// Since Three r150, lighting has changed significantly with every version up to three r158
// keep the threejs defaults, and reduce light watts in blender if using punctual lights
// if using Threejs lights, then you need to experiment with light intensity.
// renderer.physicallyCorrectLights = true //deprecated
// renderer.useLegacyLights = false //deprecated
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const loader = new GLTFLoader()

loader.load('models/giant_isopod.glb', function (gltf) {
    console.log("Model loaded!"); // Verify the model loads
    const coyote = gltf.scene;
    coyote.scale.set(.04, .04, .04);
    scene.add(coyote);
}, undefined, function (error) {
    console.error("An error happened", error); // Log errors if the model fails to load
});

// generate file tree exluding node_modules
// npx tree -I 'node_modules'

// Uncomment and adjust your light source as necessary
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(ambientLight);



window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
    
}

animate()