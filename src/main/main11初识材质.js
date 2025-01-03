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
// 纹理偏移属性
// doorColorTexture.offset.x=0.5
// doorColorTexture.offset.y=0.5
// doorColorTexture.offset.set(0.5, 0.5)
// 设置中心点
// doorColorTexture.center.set(0.5, 0.5)
// 纹理旋转
// doorColorTexture.rotation = Math.PI / 4
// 设置纹理重复
// doorColorTexture.repeat.set(2, 2)
// // 设置纹理重复的模式
// doorColorTexture.wrapS = THREE.RepeatWrapping
// doorColorTexture.wrapT = THREE.MirroredRepeatWrapping

// 纹理显示算法设置
// 线性显示，就是会模糊处理，找到相近的色块LinearFilter
// 接近显示，就是会找到原像素色块最接近的色块，可以明显的看出来一个格子一个格子
// doorColorTexture.minFilter = THREE.NearestFilter
// doorColorTexture.magFilter = THREE.NearestFilter
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
  // color: "#ffff00",
  map: doorColorTexture,
})
const cube = new THREE.Mesh(cubeGeometry, basicMaterial)
scene.add(cube)

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
