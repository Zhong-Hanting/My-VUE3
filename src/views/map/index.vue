<template>
    <div class="home">
        <!-- <h1>综合展示页面</h1> -->
        <div class="map" id="baiduMap"> </div>
        <div class="left box" >
            <div class="left-header">
                <h3>当前IP定位地址：{{info.ad_info.nation}}.{{info.ad_info.province}}.{{info.ad_info.city}}.{{info.ad_info.district}}</h3>
            </div>
        </div>
        <div class="right box">

        </div>
    </div>

</template>

<script lang="ts" setup>
import { jsonp } from 'vue-jsonp'   //解决百度请求地址跨域问题
import { onMounted ,getCurrentInstance,inject, reactive ,nextTick} from 'vue';
import axios from "axios";
let  info=reactive({
        location:{
            lat:'39.9 ',
            lng:'116.4',
        },
        ad_info:{
            nation:null,
            province:null,
            city:null,
            district:null,
        },
    })
         
const getAddress=async()=>{
    await jsonp('https://apis.map.qq.com/ws/location/v1/ip',{
        key:'PO5BZ-5ORK3-4SX32-YHCIO-H72PZ-QBFQM',
        output: 'jsonp'
        }).then((res)=>{
            if(res.message=='Success'){
                info.ad_info=res.result.ad_info;
                info.location=res.result.location;
            }
        })
}

const init=()=>{
        //定义地图中心点坐标
        var center=new TMap.LatLng(info.location.lat,info.location.lng)
        //定义map变量，调用 TMap.Map() 构造函数创建地图
        var map = new TMap.Map(document.getElementById('baiduMap'), {
            center: center,//设置地图中心点坐标
            zoom:17.2,   //设置地图缩放级别
            baseMap: {  // 设置卫星地图
                //   type: 'satellite'
                },
        });
        // 定位点位标记
        var marker = new TMap.MultiMarker({
        map: map,
        styles: {
          // 点标记样式
          marker: new TMap.MarkerStyle({
            width: 20, // 样式宽
            height: 30, // 样式高
            anchor: { x: 10, y: 30 }, // 描点位置
          }),
        },
        geometries: [
          // 点标记数据数组
          {
            // 标记位置(纬度，经度，高度)
            position: center,
            id: 'marker',
          },
        ],
      });
          //设置infoWindow
            var infoWindow = new TMap.InfoWindow({
                map: map,
                position: center,
                content: "<div><img src='https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/em.jpg'><p>Hello World!</p></div>"
            });

}

onMounted(()=>{
    getAddress().then((res)=>{
         init();
    });
   
   
})
</script>
<style lang="less" scoped>
.home{ position: relative;
    .map{ width: 100%;height: 100%; }
    .box{ position: absolute;height: 100%; width: 400px; padding: 20px 10px; background: rgba(skyblue, 0.5);}
    .left{ left: 0;top: 0;}
     .right{ right: 0;top: 0;}
}
</style>