<template>
    <div id="main">

    </div>

</template>
<script setup>
    // 方式 1: 导入整个 three.js核心库
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


import { nextTick,onMounted,watch,toRefs,reactive}from 'vue'

let  scene;
let data=reactive({
        dom:null,
        scene:null,
        camera:null,
        geometry:null,
        meterial:null,
        renderer:null,
        controls:null,  
        clock:null,

})
onMounted(()=>{
    data.dom=document.getElementById('main');
    init();
    // loadModel();
    createControls();
     render();
   
})
 
const init=(()=>{
      	    scene = new THREE.Scene();
             const ambientLight = new THREE.AmbientLight(0x111111) // 创建环境光
            scene.add(ambientLight) // 将环境光添加到场景


			data.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

			data.renderer = new THREE.WebGLRenderer();
			data.renderer.setSize( window.innerWidth, window.innerHeight );
			data.dom.appendChild( data.renderer.domElement );

			data.geometry = new THREE.BoxGeometry( 1, 1, 1 );
			data.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var cube = new THREE.Mesh( data.geometry, data.material );
			scene.add( cube );

			data.camera.position.z = 5;
            // render();

            //创建远景相机
           var camera = new THREE.PerspectiveCamera( 45, data.dom.clientWidth / data.dom.clientHeight , 1, 1000 );
            scene.add( camera );

         

});

// 创建轨道控件
const createControls=(()=>{
  data.clock = new THREE.Clock() // 创建THREE.Clock对象，用于计算上次调用经过的时间
  data.controls = new OrbitControls(data.camera, data.renderer.domElement)
  data.controls.autoRotate = true // 是否自动旋转
})
    const render=(()=>{
        // 不注释就会自己刷新更改动画
            // const delta = data.clock.getDelta() //获取自上次调用的时间差
            // data.controls.update(delta) // 相机更新
            requestAnimationFrame(() => {render() })

                    // cube.rotation.x += 0.1;
                    // cube.rotation.y += 0.1;

                data.renderer.render(scene, data.camera);
    })



// 加载模型
// const loadModel=(()=>{
//     let loader=new GLTFLoader();
//     loader.load(
//         'static/3Dmodel/city/scene.gltf',(gltf)=>{
//             gltf.scene.scale.set(100,100,100);
//             gltf.scene.rotation.set(0,0,0);
//             gltf.scene.position.set(10,10,50);
//              gltf.scene.traverse( function ( child ) {
//                 if ( child.isMesh ) {
//                     // console.log(child,999)
//                     child.frustumCulled = false;
//                     //模型阴影
//                     child.castShadow = true;
//                     //模型自发光
//                     child.material.emissive =  child.material.color;
//                     child.material.emissiveMap = child.material.map ;
//                 }})
//              scene.add(gltf.scene);
//         })   
// })


</script>
<style lang="less" scoped>
#main{
    width: 100%;
    height: 100%;
    position: relative;
    canvas{
        height: 100% !important;
        width: 100% !important;
    }
}

</style>