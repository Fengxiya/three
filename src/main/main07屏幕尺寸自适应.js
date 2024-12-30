import * as THREE from "three"

// 窗口自适应大小
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import gsap from "gsap"

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

// 添加物体
// 创建几何体对象
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 修改物体的位置
// cube.position.set(5, 0, 0)
// 缩放
// cube.scale.set(3, 2, 1)
// cube.scale.x = 6
// 旋转
cube.rotation.set(Math.PI / 4, Math.PI / 3, 0)
// 将几何体添加到场景中
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

let animation1 = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: "power1.in",
  // 循环次数，如果是无限次循环就是-1，循环2次就写2
  repeat: -1,
  // 往返运动
  yoyo: true,
  // 延迟,秒数
  delay: 2,
  onComplete: () => {
    console.log("动画完成")
  },
  onStart: () => {
    console.log("动画开始")
  },
})

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
