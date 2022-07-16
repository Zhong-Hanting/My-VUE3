<template>
    <div class="page music">
        <h1>音乐播放器</h1> 
        <el-table :data="tableData"  :highlight-current-row="true"    @row-click="handleow"     @current-change="handleChange"     style="width: 100%" height="calc(100% - 120px)">
            <el-table-column type="expand">
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
            </el-table-column>
            <el-table-column label="歌曲名" prop="songName" />
            <el-table-column label="歌手" prop="singerName" />
            <el-table-column label="大小" prop="size">
                <template #default='scope'>
                    <span>{{scope.row.size}}M</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="palyBox">
            <audio id="myAudio" @canplay="loadDone"   :src="allstatus.currentSong.src" autoplay></audio>
            <el-slider v-model="songsize" />
            <el-row :gutter="20">
                <el-col :span="8">
                    <div>
                        
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="opertion">
                        <svg class="icon first" aria-hidden="true" @click="changWhat()">
                            <use  v-if="allstatus.whatEver==1" xlink:href="#icon-repeat2"></use>
                            <use  v-if="allstatus.whatEver==2"  xlink:href="#icon-shuffle"></use>
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

<script lang="ts" setup>
import {ref,reactive,onMounted,toRefs,nextTick} from 'vue'
        const  tableData=[
            {id:1,songName:'Cruel Summer',singerName:'霉霉',size:2.76,src:require('/public/static/music/Taylor Swift - Cruel Summer.mp3')},
            {id:2,songName:'demo',singerName:'测试',size:3},
            {id:3,songName:'demo',singerName:'测试',size:3},
            {id:4,songName:'demo',singerName:'测试',size:3},
            {id:5,songName:'demo',singerName:'测试',size:3},
            {id:6,songName:'demo',singerName:'测试',size:3},
            {id:7,songName:'demo',singerName:'测试',size:3},
            {id:8,songName:'demo',singerName:'测试',size:3},
            {id:9,songName:'demo',singerName:'测试',size:3},
            {id:10,songName:'demo',singerName:'测试',size:3},
            {id:11,songName:'demo',singerName:'测试',size:3},
            {id:12,songName:'demo',singerName:'测试',size:3},
            {id:13,songName:'demo',singerName:'测试',size:3},
            {id:14,songName:'demo',singerName:'测试',size:3},
            {id:15,songName:'demo',singerName:'测试',size:3},
            {id:16,songName:'demo',singerName:'测试',size:3},
        ]
        const songsize=ref(0);
        // 定义接口
        interface Istatus{
            play:boolean,
            whatEver:number,
            currentSong?:{}
        };
        // 使用
        let allstatus:Istatus=reactive({
                play:false,
                whatEver:1,
                currentSong:{}
        })
        const audioDom=ref();
        let timer:any=null;
        //  一开始就获取dom
         audioDom.value=document.getElementById('myAudio');
        onMounted(()=>{
            allstatus.currentSong=tableData[0];
           
        })
        // methods
        // 加载完毕
        const loadDone=(val: any)=>{
              songsize.value=0;
          console.log(audioDom.value.duration)
          let onescond=Math.ceil( (audioDom.value.duration/100)*1000);  
           audioDom.value.play();
          console.log(onescond)
            timer=setInterval(()=>{
                    songsize.value++;
                    console.log(songsize.value)
                    if(songsize.value==100 ){
                        clearInterval(timer)
                        audioDom.value.load()
                    }
            },onescond)
        }

        const  handleow=((val:Object,cloum:Number)=>{
            console.log(val)
                allstatus.currentSong=val;
        });
        const handleChange=((row:number)=>{
            console.log(row)  
        })
        const playOrstop=(()=>{
            if(allstatus.play){
                    audioDom.value.play();
            }else{
                 audioDom.value.pause();
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
        const upup=(()=>{
        })
        const next=(()=>{
        })
   
</script>
<style lang="less" scoped>
 .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
.music{ padding: 10px 20px;
    .palyBox{
        .opertion{ display: flex; align-items: center; justify-content: space-around;
            .first{font-size: 20px;cursor: pointer;}
            .up,.next{font-size: 30px;cursor: pointer;}
            .third{font-size: 40px;cursor: pointer;}
        }
    }
}


</style>