import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

var book
//GLTF Loader
const bookLoader = new GLTFLoader()




//Canvas
const bookCanvas = document.querySelector('canvas.book')

//Scene 
const bookScene = new THREE.Scene()
//bookScene.background = new THREE.Color(0x020202)

//Book
bookLoader.load('../Book.gltf', function(gltf){
    book = gltf.scene.children[0]
    gltf.scene.scale.set(0.1,0.1,0.1)
    bookScene.add(gltf.scene)
    gltf.scene.rotation.set(1.55,0.2,-.3)
})

//Lights
const hlight = new THREE.AmbientLight(0x404040, 10)
bookScene.add(hlight)

const sizes2= {
    width: 700,
    height: 700
}

//Renderer
const bookRenderer = new THREE.WebGLRenderer({
    canvas: bookCanvas
})
bookRenderer.setSize(sizes2.width, sizes2.height)

//Event Listen
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes2.width = window.innerWidth
    sizes2.height = window.innerHeight

    // Update camera
    bookCamera.aspect = sizes2.width / sizes2.height
    bookCamera.updateProjectionMatrix()

    // Update renderer
    bookRenderer.setSize(sizes2.width, sizes2.height)
})


//Camera
const bookCamera = new THREE.PerspectiveCamera(40, sizes2.width / sizes2.height, 0.1, 2000)
bookCamera.position.x = 0;
bookCamera.position.z = 0.6;
bookCamera.position.y = 0
bookScene.add(bookCamera)

//Orbit Controls
const controls = new OrbitControls(bookCamera, bookRenderer.domElement)
controls.addEventListener('change', bookRenderer)

const clck = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clck.getElapsedTime()
    bookRenderer.render(bookScene, bookCamera)
    window.requestAnimationFrame(tick)
}
tick()
bookRenderer.render( bookScene, bookCamera );

