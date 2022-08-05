<template>
    <div class="home">
        <div class="header">
            <div class="name">
                 <h2>HanTing</h2>
            </div>
            <div class="logo">
               <div id="img"   @mouseenter="enter" @mouseleave="leave" :class="changechange == 1 ? 'enter' : 'out'" ></div>
            </div> 
            <el-menu :default-active="activeIndex"  class="el-menu-demo"  router  mode="horizontal"   @select="handleSelect"  >
                <template   v-for="(v,i) in menuData" :key="i">
                    <el-sub-menu :index="v.path"  v-if="v.children">
                        <template #title >
                            <span>{{v.title}}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item :index="item.path" v-for="(item,index) in v.children" :key="index">
                                <template #title>
                                    <span>{{item.title}}</span>
                                </template>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-menu-item :index="v.path" v-else>
                        <template #title>
                            <span>{{v.title}}</span>
                        </template>
                    </el-menu-item>
                </template>
            </el-menu>
            <div class="logout">
                <el-button round @click="logout()">退出</el-button>
            </div>
        </div>
      
        <main class="main">
             <router-view/>
        </main>
    </div>

</template>

<script lang="ts">
    import {apiLogin} from '../../service/utils/api'
    import { defineComponent, getCurrentInstance, onMounted,reactive, toRefs,watch } from 'vue'
    import { useStore } from 'vuex';
    import {useRouter} from 'vue-router'
    export default defineComponent({
        name: 'HomePage',
        setup(){
            let state=reactive({
                menuData:[],
                activeIndex:'/',
                changechange:2,
            })
            const route=useRouter();
            //调用自定义函数示例
            const {proxy} = getCurrentInstance() as any;
            watch(()=>route.currentRoute.value.path,(newVla,oldVal)=>{
                state.activeIndex=newVla;
            }, {immediate:true});
            onMounted(()=>{
                methods.getNav();
            });
            let methods={
                getNav(){
                    // 获取main以下的要展示的路由
                    let data=proxy.$router.options.routes.find((main:any)=>main.name=='main');
                        let digui=(dataArr:any)=>{
                            let data=dataArr.filter((item:object)=>{
                                // 先判断是否有权限等级设置，没有直接返回
                                    if(item.role){  
                                        // 判断权限是否满足，
                                        if(item.role=='superManger'){
                                            // 判断是否有子级有就继续调用
                                            if(item.children){
                                                item.children=digui(item.children)
                                                return true
                                            }
                                            // 只要权限满足就返回值
                                            return true
                                        }else{
                                            // 不满足就false
                                            return false
                                        }
                                    }else{
                                        return true
                                    }
                            })
                            return data;
                        }
                     state.menuData=digui(data.children);
                },
                handleSelect(val:any){
                    console.log(val)
                },
                enter(){
                    state.changechange = 1;
                },
                leave(){
                     state.changechange = 2;
                },
                logout(){
                    route.push('/')
                }
            };
            // torefs 解构不会失去响应式
            return {...methods,...toRefs(state)}
        },
    })
</script>
<style lang="less" scoped>
.home{
    .header{ height: 60px;display: flex;justify-content: center;
        .name{
            h2{
                height: 100%; line-height: 4rem;   
                background-image: linear-gradient(to right, orange, purple);
                -webkit-background-clip: text;
                color: transparent;
                font-size: 30px;
                cursor: pointer;
                &:hover{ background-image: linear-gradient(to right, #a9f99e, #46add5);}
            }
        }
        .logout{ line-height: 4rem;
            .el-button{padding: 0 40px;background: #EEE; color: #000;}
        }
        .main(){
            height: calc(100% - 60px);
        }
        .logo{display: flex; position: relative; width: 104px; margin: 0 20px;
            #img {
                cursor: pointer; position: absolute; z-index: 999;  width: 104px;height: 104px;
                background-image: url("../../public/static/ani-industry.png");
                background-repeat: no-repeat;
                background-position: center center;
            }
            h2{position: absolute;}
        }
    }
    .el-menu-demo{height: 60px; width: 700px;
        .is-active{
            span{  background-image: linear-gradient(to right, #a9f99e, #46add5) !important;  -webkit-background-clip: text;  color: transparent !important;  }
        }
    }
}
  .enter { -webkit-animation: mydemo 1s steps(24) forwards; animation: mydemo 1s steps(24) forwards;}
    @keyframes mydemo {
        0% {  background-position: 0px 0px;  }
        100% {  background-position: 0px -2890px;}
    }
  .out { -webkit-animation: leave 1s steps(24) forwards;  animation: leave 1s steps(24) forwards;}
    @keyframes leave {
        0% { background-position: 0px -2890px;}
        100% { background-position: 0px 0px; }
    }
</style>