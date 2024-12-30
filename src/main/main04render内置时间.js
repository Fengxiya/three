import * as THREE from "three"

// 物体缩放
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

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

function render(time) {
  // requestAnimationFrame的回调函数中内置对象time
  let t = (time / 1000) % 5
  cube.position.x = t * 1

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()
