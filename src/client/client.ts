import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const backgroundImg = 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?q=80&w=1859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

// const light = new THREE.SpotLight(0xffffff, Math.PI * 20)
// light.position.set(5, 5, 5)
// scene.add(light);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 7

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

const isopod = 'models/giant_isopod.glb'
const coyote = 'models/coyote.glb'

loader.load(isopod, function (gltf) {
    console.log("Model loaded!"); // Verify the model loads
    const isopod = gltf.scene;

    isopod.scale.set(0.01,0.01,0.01);
    isopod.position.set(-1,0,1);
    scene.add(isopod);
}, undefined, function (error) {
    console.error("An error happened", error); // Log errors if the model fails to load
});

loader.load(coyote, function (gltf) {
    console.log("Model loaded!"); // Verify the model loads
    const coyote = gltf.scene;
    // const isopod = gltf.scene;

    coyote.scale.set(2,2,2);
    coyote.position.set(1,-.4,-1);
    // isopod.scale.set(0.01,0.01,0.01);
    scene.add(coyote);
}, undefined, function (error) {
    console.error("An error happened", error); // Log errors if the model fails to load
});

const loader2 = new THREE.TextureLoader();
loader2.load(backgroundImg , function(texture)
            {
             scene.background = texture;  
            });



// Uncomment and adjust your light source as necessary
const ambientLight = new THREE.AmbientLight(0xffffff, 3); // soft white light
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