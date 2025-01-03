import * as THREE from "three"

// 打造酷炫三角形
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import gsap from "gsap"
import * as dat from "dat.gui"

// 1、创建场景
const scene = new THREE.Scene()

// 2、创建相机,透视相机，角度，宽高比，最近距离，最远距离
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
// 设置相机的位置
camera.position.set(0, 0, 10)
// 添加相机
scene.add(camera)

// 导入纹理，实际上是图片加载器
const textureLoader = new THREE.TextureLoader()
// 这个放在dist文件夹下面
const doorColorTexture = textureLoader.load("./imgs/doorColor.jpg")
// 透明纹理
const doorAplhaTexture = textureLoader.load("./imgs/alpha.png")
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
  // color: "#ffff00",
  map: doorColorTexture,
  alphaMap: doorAplhaTexture, //设置透明的范围，黑色的全透明，白色是不透明，也可有灰色半透明
  transparent: true, //透明层起效果的开关
  // opacity: 0.4, //整体的透明度
  // side: THREE.FrontSide, //渲染前面，后面BackSide，前后两面BoubleSide
})
const cube = new THREE.Mesh(cubeGeometry, basicMaterial)
scene.add(cube)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), basicMaterial)
plane.position.set(3, 0, 0)
scene.add(plane)
// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

// 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼，让控制器更有真实效果
controls.enableDamping = true
const clock = new THREE.Clock()

window.addEventListener("dblclick", () => {
  // if (animation1.isActive()) {
  //   animation1.pause() //暂停动画
  // } else {
  //   animation1.resume()
  // }
  const fullScreenElement = document.fullscreenElement
  if (!fullScreenElement) {
    renderer.domElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})
function render() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

// 窗口自适应
window.addEventListener("resize", () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})
