import * as THREE from "three"

// gui
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

// 添加物体
// 创建几何体对象
const geometry = new THREE.BufferGeometry()
// 图形由三角形拼接而成，每个点都有xyz三个值
// 所以想要组成一个正方形，是两个三角形，6个顶点，24个值
const vertices = new Float32Array([
  -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
  -1.0, -1.0, 1.0,
])
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// 根据几何体和材质创建物体
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
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