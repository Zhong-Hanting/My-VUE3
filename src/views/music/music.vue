<template>
    <div class="page music">
        <h1>音乐播放器</h1> 
        <el-table :data="tableData"  :highlight-current-row="true"    @row-click="handleow"     @current-change="handleChange"     style="width: 100%" height="calc(100% - 120px)">
            <!-- <el-table-column type="expand">
                <template #default="props">
                    <div m="4">
                        <p m="t-0 b-2">State: {{ props.row.state }}</p>
                        <p m="t-0 b-2">City: {{ props.row.city }}</p>
                        <p m="t-0 b-2">Address: {{ props.row.address }}</p>
                        <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
                        <h3>Family</h3>
                        <el-table :data="props.row.family" >
                            <el-table-column label="Name" prop="name" />
                            <el-table-column label="State" prop="state" />
                            <el-table-column label="City" prop="city" />
                            <el-table-column label="Address" prop="address" />
                            <el-table-column label="Zip" prop="zip" />
                        </el-table>
                    </div>
                </template>
            </el-table-column> -->
            <el-table-column label="歌曲名" prop="songName" />
            <el-table-column label="歌手" prop="singerName" />
            <el-table-column label="大小" prop="size">
                <template #default='scope'>
                    <span>{{scope.row.size}}M</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="palyBox">
            <audio id="myAudio" @canplay="loadDone"   @ended="playDone()"  :src="allstatus.currentSong.src"  :title="allstatus.currentSong.singerName" ></audio>
                <!-- loadDone  监听资源加载完成-->
            <!-- <audio id="myAudio" @canplay="loadDone"  @ended="playDone"  :src="allstatus.currentSong.src"></audio> -->
            <el-slider v-model="songsize"  :disabled="true"   />
            <el-row :gutter="40">
                <el-col :span="8">
                    <div class="headImg">
                        <el-avatar shape="square" size="50" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" />
                    </div>
                    <div  class='SongMess'>
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <div> {{allstatus.currentSong.songName}}--{{allstatus.currentSong.singerName}}</div>
                            </el-col>
                            <el-col :span="4">
                                <span class="bo">vip</span>
                            </el-col>
                            <el-col :span="4">
                                <span class="bo">mv</span> 
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col :span="3">
                               <el-icon><Promotion /></el-icon>
                            </el-col>
                            <el-col :span="3">
                               <el-icon><Download /></el-icon>
                            </el-col>
                            <el-col :span="3">
                               <el-icon><Plus /></el-icon>
                            </el-col>
                             <el-col :span="3">
                               <el-icon><Message /></el-icon>
                            </el-col>
                        </el-row>

                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="opertion">
                        <svg class="icon first" aria-hidden="true" @click="changWhat()">
                             <!-- 顺序 -->
                            <use  v-if="allstatus.whatEver==1" xlink:href="#icon-repeat2"></use>  
                            <!-- 随机 -->
                            <use  v-if="allstatus.whatEver==2"  xlink:href="#icon-shuffle"></use>
                            <!-- 单曲循环 -->
                            <use  v-if="allstatus.whatEver==3" xlink:href="#icon-repeatOnce2"></use>
                        </svg>
                        <svg class="icon up" aria-hidden="true"  @click="upup()">
                            <use  xlink:href="#icon-shangyishoushangyige-copy"></use>
                        </svg>
                        <svg class="icon third" aria-hidden="true" @click="playOrstop()">
                            <use  v-if="allstatus.play"  xlink:href="#icon-bofang"></use>
                            <use  v-else  xlink:href="#icon-zanting"></use>
                        </svg>
                        <svg class="icon next" aria-hidden="true" @click="next()">
                            <use xlink:href="#icon-xiayigexiayishou-copy"></use>
                        </svg>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div>

                    </div>
                </el-col>
            </el-row>
        </div>
    </div>

</template>

<script lang="ts" setup >
// 浏览器机制原因 故不能一进入页面就自动播放 需手动点击
import {ref,reactive,onMounted,toRefs,nextTick,onBeforeUnmount,watch} from 'vue'
        const  tableData=[
            {id:1,songName:'Cruel Summer',singerName:'霉霉',size:2.76,src:require('/public/static/music/Taylor Swift - Cruel Summer.mp3')},
            {id:2,songName:'哪里都是你2_0',singerName:'队长',size:3.6,src:require('/public/static/music/队长 - 哪里都是你2_0.mp3')},
            {id:3,songName:'再飞行',singerName:'逃跑计划',size:1.4,src:require('/public/static/music/逃跑计划 - 再飞行.mp3')},
            // {id:4,songName:'demo',singerName:'测试',size:3},
            // {id:5,songName:'demo',singerName:'测试',size:3},
            // {id:6,songName:'demo',singerName:'测试',size:3},
            // {id:7,songName:'demo',singerName:'测试',size:3},
            // {id:8,songName:'demo',singerName:'测试',size:3},
            // {id:9,songName:'demo',singerName:'测试',size:3},
            // {id:10,songName:'demo',singerName:'测试',size:3},
            // {id:11,songName:'demo',singerName:'测试',size:3},
            // {id:12,songName:'demo',singerName:'测试',size:3},
            // {id:13,songName:'demo',singerName:'测试',size:3},
            // {id:14,songName:'demo',singerName:'测试',size:3},
            // {id:15,songName:'demo',singerName:'测试',size:3},
            // {id:16,songName:'demo',singerName:'测试',size:3},
        ]

        const songsize=ref(0);
        // 定义接口
        interface Istatus{
            play:boolean,
            whatEver:number,
            currentSong?:any
        };
        // 使用
        let allstatus:Istatus=reactive({
                play:true,
                whatEver:1,
                currentSong:{}
        })
        const audioDom=ref();   //audio标签dom
        let timer:any=null;   //计时器   
        let onescond:any=null;   //计算进度条多久加1
        let theFirst:Boolean=true;  //判断是不是第一次打开页面
        onMounted(()=>{
            allstatus.currentSong= JSON.parse(JSON.stringify(tableData[0])) ;
        });
        onBeforeUnmount(()=>{
            if(audioDom.value){
                audioDom.value=null;
            }
             
        });
        // 监听对象中某个值
       watch(() => allstatus.play, (newValue, oldValue) => {
            if(!newValue){
              
                startPlay();
            }
        },{deep: true,immediate:false}
        )
        // 监听基础类型
        // watch(nums, (newValue, oldValue) => {
        //     console.log('watch 已触发', newValue)
        // })
        // methods
        // 播放完毕
        const playDone=()=>{
                console.log('播放完了')
                next()
          
        }
        // 加载完毕
        const loadDone=(val: any)=>{
              if(theFirst){
                    console.log('第一次进来不自动播放')
                    theFirst=false;
                    return  
                }
              
            // 监听加载完毕 出发可播放事件
             allstatus.play=false;
        }
        //  开始播放
         const startPlay=(()=>{
                audioDom.value=document.getElementById('myAudio');
                audioDom.value.play();
                songsize.value=0;
                onescond=0;
                onescond=Math.ceil( (audioDom.value.duration/100)*1000);  
                // console.log( audioDom.value.play())
    // 原因：在调用play()时，现代浏览器返回的是一个promise，对于执行失败的，会触发一个Unhandled Promise Rejection，
    // 但是对于低版本的浏览器，调用play()并不会返回一个promise。解决：应该在调用play()时做如下处理，增加对playPromise的判断
                if (audioDom.value.play()!== undefined) {
                        audioDom.value.play().then(function() {
                             audioDom.value.play();
                            // console.log('播放')
                        }).catch(function(error: any) {
                            // console.log('失败')
                        });
                }
                timer=setInterval(()=>{
                        songsize.value++;
                        if(songsize.value==100 ){
                            clearInterval(timer)
                            audioDom.value.load()
                        }
                },onescond)
         });
        const  handleow=((val:Object,cloum:Number)=>{});
        const handleChange=((row:number)=>{
            allstatus.play=true;
            if(timer){
                 clearInterval(timer)
            }
             allstatus.currentSong= JSON.parse(JSON.stringify(row));
            
        })

        // 播放暂停
        const playOrstop=(()=>{
            if(!allstatus.play){
                audioDom.value.pause();
                clearInterval(timer)
            }
            allstatus.play=!allstatus.play;
           
        });
        const changWhat=(()=>{
            if(allstatus.whatEver==3){
                allstatus.whatEver=1;
            }else{
                 allstatus.whatEver++;
            }  
        })
        // 上一首
        const upup=(()=>{
            let idex= allstatus.currentSong.id;
            allstatus.play=true;
            if(timer){
                 clearInterval(timer)
            }
             switch (allstatus.whatEver){
                 //  正常情况下 顺序
                    case 1:
                        let index=allstatus.currentSong.id-1;
                        if(index==0){
                            allstatus.currentSong=tableData[tableData.length-1]
                        }else{
                            allstatus.currentSong=tableData[index-1];
                        }
                        break;
                    case 2:
                        //  随机播放
                        console.log('随机')
                        let num = Math.floor(Math.random() * (3 - 1 + 1)) + 1 //随机数生成通用守则
                        allstatus.currentSong=tableData[num-1];
                        console.log(num)
                        break;
                    case 3:
                         // 单曲循环
                         allstatus.currentSong=JSON.parse(JSON.stringify(tableData[idex-1]));
                        break;
            }
            allstatus.play=false;
            
        })
        // 下一首
        const next=(()=>{
            let idex= allstatus.currentSong.id;
            allstatus.play=true;
           if(timer){
                 clearInterval(timer)
            }
            console.log(allstatus.whatEver)
                   switch (allstatus.whatEver){
                 //  正常情况下 顺序
                    case 1:
                        let index=allstatus.currentSong.id-1;
                        if(index==tableData.length-1){
                            allstatus.currentSong=tableData[0]; 
                        }else{
                            allstatus.currentSong=tableData[index+1];
                        }
                        break;
                    case 2:
                        //  随机播放
                        console.log('随机')
                        let num = Math.floor(Math.random() * (3 - 1 + 1)) + 1;  //随机数生成通用守则
                        allstatus.currentSong=tableData[num-1];
                        console.log(num)
                        break;
                       
                    case 3:
                         // 单曲循环
                        //  console.log( audioDom.value)
                        allstatus.currentSong=JSON.parse(JSON.stringify(tableData[idex-1]));
                        break;
            }
            allstatus.play=false;
        })
   
</script>
<style lang="less" scoped>
 .icon { width: 1em; height: 1em; vertical-align: -0.15em; fill: currentColor;overflow: hidden; }
.music{ padding: 10px 20px; background-image:url("@/assets/images/goddes.jpg") !important;
    .palyBox{
        .headImg{ height: 40px; width:40px; float: left;margin-right:10px;
            .el-avatar{ width: 100%; height: 100%;}
        }
        .SongMess{ height: 40px; line-height: 20px; text-align: left;
            .bo{   display:inline-block; width: 100%; border: 1px solid #000;font-size: 12px;transform: scale(0.8); text-align: center;line-height: 1rem;
            }
        }
        .opertion{ display: flex; align-items: center; justify-content: space-around;
            .first{font-size: 20px;cursor: pointer;}
            .up,.next{font-size: 30px;cursor: pointer;}
            .third{font-size: 40px;cursor: pointer;}
        }
    }
}


.el-table,/deep/.el-table__body-wrapper,/deep/.el-table__header,/deep/.el-table__header-wrapper,/deep/.el-table__header,/deep/.el-table__row,/deep/tr,/deep/th,/deep/td{
    background: none !important; border: none !important;
    color: #fff;
    
}
/deep/.el-table__inner-wrapper{
    &::before{content: none !important;}
}

</style>