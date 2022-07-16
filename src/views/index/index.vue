<template>
    <div class="home">
        <div class="top">
            <el-carousel height="200px" :autoplay='false'>
                <el-carousel-item v-for="item in list.urlList" :key="item.id">
                      <el-image :src="item.src" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <h1>首页</h1>
    </div>

</template>

<script lang="ts" setup>
import {ref,reactive,onMounted,toRefs,nextTick} from 'vue'
        // let state=reactive({
        //         srclist:number[]=[1,2,3],
            
        //     })
        
interface onepice{
        urlList:Array<object>, 
        name?:string,
        
}   
const list=reactive<onepice>({
        urlList:[
            {id:1,src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'},
            {id:2,src:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'}
        ]
})
</script>
<style lang="less" scoped>
.home{ 
    .top{  
        .el-carousel{
            .el-carousel__container{ background: #fff;
                    .el-image{ height: 100%;width:500px;
                        img{  width: 100%;height: 100%;}
                    }
                
            }
            
        }
    }
}
</style>