import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { generateUUID } from 'three/src/math/MathUtils'
import { RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'

var cube
var yVel = .0004;
var clicked = false;
var int = false;
const gltfLoader = new GLTFLoader()
// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Cube
gltfLoader.load('CUBE.gltf', function(gltf) {
    cube = gltf.scene
    gltf.scene.scale.set(0.3,0.3,0.3)
    gltf.scene.rotation.set(3,2.7,2.9)
    gltf.scene.position.set(.7,0,-.5)
    scene.add(gltf.scene)

    //gui.add(cube.rotation, 'y').min(-9).max(9).step(.01)
})

//Lights
const pointLight = new THREE.PointLight(0xffffff, .09)
pointLight.position.x = -8.45
pointLight.position.y = 5
pointLight.position.z = -6.9
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, .09)
pointLight2.position.x = 3.06
pointLight2.position.y = 0.52
pointLight2.position.z = .13
scene.add(pointLight2)


const pointLight3 = new THREE.PointLight(0xffffff, .09)
pointLight3.position.x = .91
pointLight3.position.y = -2.21
pointLight3.position.z = -1.62
scene.add(pointLight3)

/*
// Particles
const particlesGeometry = new THREE.BufferGeometry;
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++){
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 5)
    console.log(posArray[i])
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

*/

// Raycaster
const raycaster = new THREE.Raycaster();
const raycaster2 = new THREE.Raycaster();
const clicker = new THREE.Vector2();
const pointer = new THREE.Vector2();

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Event listeners
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
window.addEventListener('click', event =>{
    // calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	clicker.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	clicker.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(clicker, camera );
    const intersects = raycaster.intersectObjects( scene.children );
    for ( let i = 0; i < intersects.length; i ++ ) {
        clicked = true;
	}

})
/*
window.addEventListener('point', event =>{
    // calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster2.setFromCamera(pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children );
    for ( let i = 0; i < intersects.length; i ++ ) {
        document.body.style.cursor = "pointer"
	}

})
*/

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 2000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const renderScene = new RenderPass(scene, camera)
const composer = new EffectComposer(renderer)
composer.addPass(renderScene)

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    .7,
    0.9,
    0.3
)
composer.addPass(bloomPass)

/**
 * Animate
 */

const clock = new THREE.Clock()



const tick = () =>
{
	// calculate objects intersecting the picking ray
    if(clicked){
        if(yVel <= 0.5)
        {
            cube.rotation.y += yVel;
            yVel+=.002
        }
        else{
            window.location.href="pages/projects.html";
        }
        
        
    }
    
    

    const elapsedTime = clock.getElapsedTime()
    renderer.setClearColor(0x000000, 0)

    // Update objects
    
    if(cube && !clicked){
        cube.rotation.y += yVel
        if(cube.rotation.y > 2.89 || cube.rotation.y < 2.69)
            yVel = -yVel;
    }
    
    
    

    // Update Orbital Controls
    // controls.update()

    // Render
    
    //renderer.render(scene, camera)
    composer.render()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick()