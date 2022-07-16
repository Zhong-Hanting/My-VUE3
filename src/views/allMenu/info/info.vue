<template>
    <div class="home">
        <h1>个人简历</h1>
        <div class="info">
            <h4 class="title">个人信息介绍</h4>
               <div class="info-box">
                    <form>
                        <div>
                            <label for="姓名"> 姓名:</label>
                            <span>钟骏强</span>
                        </div>
                       <div>
                              <label for="年龄"> 年龄:</label>
                            <span>23</span>
                       </div>
                       <div>
                                <label for="联系电话"> 联系电话:</label>
                            <span>18381079946</span>
                       </div>
                       <div>
                            <label for="工作时长"> 工作时长:</label>
                            <span>2年</span>
                       </div>
                       <div>
                             <label for="状态"> 状态:</label>
                            <span>在职</span>
                       </div>
                       <div>
                             <label for="求职意向"> 求职意向:</label>
                            <span>web前端开发</span>
                       </div>
                       <div>
                             <label for="邮箱"> 邮箱:</label>
                            <span>1924330143@qq.com</span>
                       </div>
                    </form>
               </div>     
        </div>
        <div class="shooll">
             <h4 class="title">教育背景</h4>
                <div class="shooll-box">
                    <div>
                        <span>时间:</span><span>2015-2018</span>
                    </div> 
                     <div>
                        <span>学校:</span><span>成都机电工程学校</span>
                    </div>           
                </div>
        </div>
        <div class="skill">
             <h4 class="title">技能</h4>
             <div class="skill-box">
                    <p><span>1</span>熟练使用Vue2以及熟悉Vue3和Element、Elementplus,了解TypeScript。</p>  
                    <p><span>2</span>熟练使用html+css,熟悉css预编译语言Sass、Less。</p>
                    <p><span>3</span>熟悉node.js，能使用express搭建项目。</p>  
                    <p><span>4</span>熟悉APP和小程序开发。</p>  
                    <p><span>5</span>熟悉socket,echarts。</p>  
                    <p><span>6</span>了解React。</p>    
             </div>
        </div>
        <div class="experienced">
            <h4 class="title"> 工作经历</h4>
            <div class="experienced-box">
                <div class="experienced-box-contain">
                    <p>2020.8-至今&nbsp;&nbsp;&nbsp;&nbsp;北京安信信通科技有限公司</p>
                    <p>工作职位：前端开发工程师</p>
                    <p>工作职务：负责项目前端页面的构建和前端交互实现，前端样式和脚本的模块设计及优化；配合后台开发人员完成项目以及项目周期性的单元测试和交付上线前期的集成测试，老项目的更新迭代。</p>
                </div>
                <div class="experienced-box-contain">
                    <p>2020.3-2020.7&nbsp;&nbsp;&nbsp;&nbsp;成都金石软件有限公司</p>
                    <p>工作职位：前端开发工程师</p>
                    <p>工作职务：负责移动端页面的构建和各类前端交互实现，前端样式和脚本的模块设计及优化；协同后台开发人员完成项目，使用js、Vue，以及老项目的维护和更新 。</p>
                </div>
            </div>
        </div>
        <div class="work">
            <h4 class="title"> 项目经验</h4>
            <div class="work-box">
                <div class="ele">
                    <ul>
                        <li class="name" @click="selected(1)" :class="{current:current==1}">安信智能平台</li>
                        <li class="name" @click="selected(2)"  :class="{current:current==2}">山东智能矿灯系统</li>
                        <li class="name" @click="selected(3)" :class="{current:current==3}">山西煤矿视频视频分析</li>
                        <li class="name" @click="selected(4)"  :class="{current:current==4}">贵州省山地紧急医学救援指挥调度</li>
                        <li class="name" @click="selected(5)" :class="{current:current==5}">金石卫康App</li>
                    </ul>
                </div>
                <div class="elec" v-if='current==1' >
                    <p>项目周期：2022.5-未开发完成</p>
                    <p>技术栈:vue3+VueRouter+vuex+ts  Element-plus  Less  Axios  Echarts socket.IO </p>
                    <p>项目职责:前端页面开发和后端接口对接以及功能完成后的功能单元测试和项目集成测试。</p>
                    <p>项目描述:属于公司自研产品，包含边缘端感知端中心端三个平台去执行训练算法的操作以及绑定算法模型和设备，并对其进行管理操作。</p>
                </div>
                <div class="elec" v-if='current==2'>
                    <p>项目周期：2022.2-2022.7</p>
                    <p>技术栈:vue+VueRouter+vuex  Element  Less  Axios  Echarts socket.IO  webrtc </p>
                    <p>项目职责:前端页面开发和后端接口对接以及功能完成后的功能单元测试和项目集成测试。</p>
                    <p>项目描述:主要是给山东煤监局 和辖区的煤矿企业进行使用，用于政府领导到矿场上去检查时可直接通过矿灯实现和监察室直接视频通话，并且监察室的人可以通过矿灯看到实时视频，
                        以及创建报警任务再把任务分配下属部门去到煤矿企业进行专项检查，在就是一些人员、部门、硬件服务器的数据管理和综合数据的展示。
                    </p>
                </div>
                <div class="elec" v-if='current==3' >
                   <p>项目周期：2020.12-2021.4</p>
                    <p>技术栈:vue+VueRouter+vuex  Element  Less   Axios  Echarts socket.IO </p>
                    <p>项目职责:前端页面开发和后端接口对接以及功能完成后的功能单元测试和项目集成测试。</p>
                    <p>项目描述:针对应用场景 和报警类型做的一个视频分析系统，实时分析可以及时查看此时的报警数据统计,异常设备等，
                        实时视频可以查看当前的多路实时视频.历史分析主要查看 日 周 月的 报警和异常的数据统计  
                         报警管理就是对一些报警数据的操作，场景定义主要是根据一个场景平面图进行选择监控区域，在再监控区域下面进行细分的添加检测点和配置算法以及检测设备等。最后在实时设备页面设置当前的一个算法的监控范围和算法类型及其启用和停用时间.
                    </p>
                </div>
                <div class="elec" v-if='current==4'>
                    <p>项目周期：2020.8-2020.12</p>
                    <p>技术栈:vue+VueRouter+vuex  Element Scss Gis地图  Axios Echarts </p>
                    <p>项目职责:前端页面开发和后端接口对接以及功能完成后的功能单元测试和项目集成测试。</p>
                    <p>项目描述:到我们这已经是属于二包了，然后主要是对贵州省的 医院，救援物资，救援队伍，应急专家，应急车辆，和高危地区，高危因素的登记管理，
                        实时查看各资源的位置，能够在危险情况发出的第一时间安排组织人手物资队伍去到发生危险情况的地区。
                    </p>
                </div>
                <div class="elec" v-if='current==5' >
                    <p>项目周期：2020,4-2020,7</p>
                    <p>技术栈:HTML  JS   CSS  Mui  H5+  VUE+Vue-Router  Echarts   Ajax  jQuery </p>
                    <p>项目职责:前端页面开发和后端接口对接以及功能完成后的功能单元测试和项目集成测试。</p>
                    <p>项目描述:这是一个不止面向c端还要面向b端使用的软件，是给家里有孩子的家庭以及孕产妇使用的，
                        同时也给医院方使用，方便医护人员对孕产妇的管理及儿童健康状态了解，
                        也有类似微信的功能 比如说成长日志 帮助父母记录孩子的成长时刻，
                        聊天方便医护人员和准妈妈及医护人员和家长的及时沟通，
                    </p>
                    <p>功能描述：
                        （1）主要负责功能模块有 儿童及操作员绑定和切换、发育自测、成长日志、气质测评、公告通知，学习障碍筛查，以及ipad端首页，气质测评，学习障碍筛查。
                        （2）成长日志:使用h5plus API调用本地相机,录音,获取相册等功能并使用h5plus的API进行拍照 录视频 录音并上传。
                        （3）气质测评和学习障碍筛查：获取题目让用户进行答题，一个月只能答题一次，未答完则保留 下次继续 不能重新答题，答完返回测评详情，未登录用户需要手动输入一些基本信息且一共只能使用3次。
                        （4）公告通知:医生发布通知或公告给各辖区，各单位，及需要通知的用户。
                        （5）发育自测：根据当前用户输入的身高和体重来进行计算，未登陆用户则需要输入年龄性别等且每月只有3次。
                        （6）通过使用echarts的柱状图展示学习障碍测试后的详细数据 帮助用户便于看出与标准水平的区别。
                        （7）在列表页面使用vue的this.$router.push（）去给详细页面传入需要提交给后台的数据。
                        （8）使用vue-router 进行路由跳转，使用生命周期befordestory()进行定延时时器的清除。
                        在获取后台参数的时候,需要我们自己添加一个字段用作判断时就用到了 vue.set()动态添加字段

                    </p>
                </div>
            </div>
        </div>

    </div>

</template>

<script lang="ts" setup>
import {ref,reactive,onMounted,toRefs,nextTick,getCurrentInstance} from 'vue'
const {proxy}=getCurrentInstance()
const current=ref(1)

const selected=(val:number)=>{
        current.value=val;
}
onMounted(()=>{
        let obtn:any=[];
        let oElec:any=[];
        obtn = document.getElementsByClassName("name");
	    oElec = document.getElementsByClassName("elec");
        let current:any=0;

    //  这里没有this所以这个方法暂时解不了 
    //  for(var i =0; i<obtn.length;i++){
    //         obtn[i].index=i;   //记录每个dom的下标
          
    //     obtn[i].onclick=()=>{
    //            console.log( this)
    //          for(var j = 0;j < obtn.length;j++){
    //                console.log(proxy.index)
	// 			oElec[ this.index].style.display = 'none';
	// 		}  
    //          oElec[ this.index].style.display = "block";
    //     }
    //  }
})
</script>
<style lang="less" scoped>
@pd10:10px 0 ;
.home{ width: 1000px; margin: 0 auto; padding:0 50px 50px 50px; background: #fff; font-size: 14px; .scrollbar();
  .title{ text-align: left; color: skyblue;}
    .info{ width: 100%;
        .info-box{width: 100%; padding:@pd10 ;
            form{width: 100%; display: flex;justify-content: space-between; flex-wrap: wrap; 
                div{ height: 35px; line-height: 2em;  float: left; display: inline-block; width:300px; margin: 5px 0; padding: 5px; cursor: pointer; transition: all 0.3s;
                    &:hover{ border: 1px dashed skyblue;  transform: scale(1.05); z-index: 2;   }
                }
            }   
            
        }
    }
    .shooll{
        .shooll-box{ display: flex;justify-content: space-around;padding:@pd10 ;
        }
    }
    .skill{
        .skill-box{ width: 800px;margin:0 auto;text-align: left;padding:@pd10 ;
        span{margin: 0 10px;}
        }    
    }
    .experienced{
        .experienced-box{
            .experienced-box-contain{ margin:15px 0 ;
                p{text-align: left;padding-left:80px ;margin:10px 0 ;}
        }
           
        }
    }
    .work{
        .work-box{
            ul{ list-style: none; height: 40px;
                li{ height: 30px; cursor: pointer;padding-right: 10px;padding-left: 10px;float: left; line-height: 2em;}
                .current{
                    border: 1px solid skyblue; 
                }
                .name{text-align: center;}
            }
            .elec{
                height: 300px;   width: 100%;text-align: left;
                p{margin: 5px 0;}
            }
        }
    }
}

</style>