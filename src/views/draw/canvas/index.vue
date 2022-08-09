<template>
    <div class="home">
        <h1>canvas画图（进阶 可放大缩小 暂未完成   无思路）</h1>
        <div class="contain" id="contain">
           <img   id="imgDom" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" alt="">
            <canvas  @click="myCanvas"   id="canvasBox" :width="img.width" :height="img.height"></canvas>
        </div>
    </div>

</template>

<script lang="ts" setup>
import {ref,reactive,onMounted,toRefs,nextTick} from 'vue';
var elementResizeDetectorMaker=require('element-resize-detector');
        // 定义接口
        interface Idom {
            dom: any
            canvas: any
            lineList: object[],
            boxList:Array<Array<object>>,
        }
        let newCanvas=reactive({
             first:true,   //判断是不是第一个点
             newPath:false,  //判断当前图形是否合并，合并就开始绘制下一个图形
        });
        let all :Idom=reactive({
            dom:null,
            canvas:null,
            lineList:[],
            boxList:[],
        })
        let img=reactive({
            width:0,
            height:0,
        })
        onMounted(()=>{
            getHW();
            elementResizeDetectorMaker().listenTo(document.getElementById('contain'),(el:any)=>{
                nextTick(()=>{
                     getHW();
                    
                })
            })
        })


        // methods

        // 初始化canvas
        const init=(()=>{
            all.dom=document.getElementById('canvasBox');
            all.canvas=all.dom.getContext('2d');
            if(all.boxList.length >=1){
                for(let i in all.boxList){
                    draw(all.boxList[i],Number(i))
                }
            }
        });
        // 获取图片盒子的宽高
        const getHW=(()=>{
            let imgDom:any=document.getElementById('imgDom');
                img.width=imgDom.offsetWidth;
                img.height=imgDom.offsetHeight
                init();
        });
        const myCanvas=((e:any)=>{
            if(newCanvas.newPath){
                 all.canvas.beginPath() // 重新开启一个路径
                 newCanvas.newPath=false;
            }
            // 把canvas的坐标点换算成像素点
            let data=coordinateTrans(e.clientX,e.clientY);
            // 渲染的是转换过后的像素点，但是存的时候得canvas坐标点  ，才能在canvas大小变化的时候进行计算渲染
            // all.lineList.push( {x:e.clientX,y:e.clientY})
            // 存储像素点
            all.lineList.push( data)

                if(!newCanvas.first){
                    all.canvas.lineTo(data.x,data.y)   //终点坐标
                    // 判断点位数量
                    if(all.lineList.length >= 1){
                        //  判断起始点是否相等 就合并 
                        let startPoint:any=all.lineList[0];
                        let endPoint:any=all.lineList[all.lineList.length-1];
                        console.log(startPoint,endPoint ,'起始点位')
                        function set(start:number,end:number):Boolean{
                            if(start-end< 10 && start-end > -10){
                                return true
                            }else{
                                return false
                            }
                        };
                        // 如果差距不大 就合并  重新绘制下一个图形
                        if( set(startPoint.x,endPoint.x) && set(startPoint.y, endPoint.y) ){
                                newCanvas.newPath=true;
                                console.log('合并');
                                newCanvas.first=true;
                                all.boxList.push(all.lineList);
                                all.lineList=[];
                        }else{
                                newCanvas.newPath=false;
                        }
                    }
                }else{
                     all.canvas.moveTo(data.x, data.y) // 起点坐标 (x, y)
                     newCanvas.first=false;
                }
                all.canvas.strokeStyle = 'red'
                all.canvas.stroke() //绘制线  
       });
       const draw=((arr:any,num:number)=>{
        if(num>0){
            all.canvas.beginPath() // 重新开启一个路径
        }
            arr.map((item:any,i:number)=>{
                // 转换坐标点
                // let data=coordinateTrans(item.x,item.y);
                if(i==0){
                    all.canvas.moveTo(item.x, item.y) // 起点坐标 (x, y)
                }else{
                    all.canvas.lineTo(item.x,item.y)   //终点坐标
                    all.canvas.stroke() //绘制线 
                }
                // all.canvas.strokeStyle = 'red'
                // all.canvas.stroke() //绘制线 
            })
           
       });
       const coordinateTrans=(( x:number, y:number )=>{
            var canvasBound = all.dom.getBoundingClientRect()
            return {x:(x-canvasBound.left) , y:(y-canvasBound.top)}
        });


</script>
<style lang="less" scoped>
.home{
   .contain{
        width: 100%;
        height: calc(100% - 32px);
        position: relative;
        // img{width: 100%; height: 100%;}
        #canvasBox{
            box-sizing: border-box;
            position: absolute;
            z-index: 99;
            border: 1px solid red;
            top: 0;
            left: 0;
        }
   } 
}
</style>