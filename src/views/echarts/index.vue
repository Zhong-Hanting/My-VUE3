<template>
        <div class="page echarts"  id="echarts">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid">
                        <div class="title">
                            <strong>柱状图</strong>
                        </div>
                        <div class="chart-contain">
                            <div id="zhuzuangtu"></div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid">
                        <div class="title">
                            <strong>折线图</strong>
                        </div>
                        <div class="chart-contain">
                            <div id="zhexiantu"></div>
                        </div>
                    </div>
                </el-col>
            </el-row>
             <el-row :gutter="20">
               <el-col :span="12">
                    <div class="grid">
                        <div class="title">
                            <strong>饼图</strong>
                        </div>
                        <div class="chart-contain">
                            <div id="bingtu"></div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid">
                        <div class="title">
                            <strong>雷达图</strong>
                        </div>
                        <div class="chart-contain">
                            <div id="leidatu"></div>
                        </div>
                    </div>
                </el-col>
            </el-row>
             <el-row :gutter="20">
                <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
                <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
            </el-row>
        </div>
</template>

<script setup lang='ts'>
var elementResizeDetectorMaker=require('element-resize-detector')
import * as echarts from 'echarts'
import {ref,reactive,onMounted,toRefs,nextTick} from 'vue'
        let state=reactive({
            obj:'测试',
            chartColors:['#6988fe','#b6d6db','#8796e1','#97c9f4','#97aaf3'],
            echartsList:{
                zhuzuangtu:{
                    title:'柱状图',
                    dom:{},
                    dataorigin:[],
                    option:{},
                    completed:false
                },
                zhexiantu:{
                    title:'折线图',
                    dom:{},
                    dataorigin:[],
                    option:{},
                    completed:false
                },
                bingtu:{
                    title:'饼图',
                    dom:{},
                    dataorigin:[],
                    option:{},
                    completed:false
                },
                leidatu:{
                    title:'雷达图',
                    dom:{},
                    dataorigin:[],
                    option:{},
                    completed:false
                },

            }
        });
        onMounted(()=>{
            elementResizeDetectorMaker().listenTo(document.getElementById('echarts'),(el:any)=>{
                nextTick(()=>{
                     methods.allEcharts();
                     for(let i in state.echartsList){
                        state.echartsList[i].dom.resize();
                     }
                })
            })
            methods.allEcharts();
            // window.onresize=()=>{
            //       methods.allEcharts();
            // }
        });
       let  methods={
            allEcharts(){
                methods.getzhuzuangtu().then((res:any)=>{
                    state.echartsList.zhuzuangtu.option=res;
                    methods.drawCharts('zhuzuangtu')
                });
                methods.getzhexiantu().then((res:any)=>{
                    state.echartsList.zhexiantu.option=res;
                    methods.drawCharts('zhexiantu')
                });
                methods.getbingtu().then((res:any)=>{
                    state.echartsList.bingtu.option=res;
                    methods.drawCharts('bingtu')
                });
                 methods.getleidatu().then((res:any)=>{
                    state.echartsList.leidatu.option=res;
                    methods.drawCharts('leidatu')
                });
            },
            async getzhuzuangtu(){
                let option = {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                            data: [120, 200, 150, 80, 70, 110, 130],
                            type: 'bar'
                            }
                        ]
                    };
                    return option
            },
            async getzhexiantu(){
                let option = {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                            data: [150, 230, 224, 218, 135, 147, 260],
                            type: 'line'
                            }
                        ]
                    };
                    return option
            },
            async getbingtu(){
                let option = {
                        legend: {
                            top: 'bottom'
                        },
                        color:state.chartColors,
                        toolbox: {
                            // 下载 什么什么的 
                            // show: true,
                            // feature: {
                            // mark: { show: true },
                            // dataView: { show: true, readOnly: false },
                            // restore: { show: true },
                            // saveAsImage: { show: true }
                            // }
                        },
                        series: [
                            {
                            name: 'Nightingale Chart',
                            type: 'pie',
                            radius: [10, 50],
                            center: ['50%', '50%'],
                            roseType: 'area',
                            itemStyle: {
                                borderRadius: 2
                            },
                            data: [
                                { value: 40, name: 'rose 1' },
                                { value: 38, name: 'rose 2' },
                                { value: 32, name: 'rose 3' },
                                { value: 30, name: 'rose 4' },
                                { value: 30, name: 'rose 5' },
                            ]
                            }
                        ]
                    };
                    return option
            },
            async getleidatu(){
                let option = {
                    title: {
                        // text: 'Basic Radar Chart'
                    },
                    legend: {
                        data: ['Allocated Budget', 'Actual Spending']
                    },
                    radar: {
                        // shape: 'circle',
                        indicator: [
                        { name: '攻击力', max: 800 },
                        { name: '法强', max: 6000 },
                        { name: '法术值', max: 1000 },
                        { name: '生命值', max: 8000 },
                        { name: '防御力', max: 500 },
                        { name: '速度', max: 200 }
                        ]
                    },
                    series: [
                        {
                        name: 'Budget vs spending',
                        type: 'radar',
                        data: [
                            {
                                value: [799, 6000, 1000, 8000, 499, 200],
                                name: '李云龙',
                                areaStyle: {
                                    color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                                    {
                                        color: 'rgba(255, 145, 124, 0.1)',
                                        offset: 0
                                    },
                                    {
                                        color: 'rgba(255, 145, 124, 0.9)',
                                        offset: 1
                                    }
                                    ])
                                }
                            },
                            {
                            value: [350, 4000, 699, 5000, 300, 200],
                            name: '...',
                            // areaStyle: {
                            //         color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                            //         {
                            //             color: 'rgba(255, 145, 124, 0.1)',
                            //             offset: 0
                            //         },
                            //         {
                            //             color: 'rgba(255, 145, 124, 0.9)',
                            //             offset: 1
                            //         }
                            //         ])
                            //     }
                            }
                        ]
                        }
                    ]
                };
                return option
            },
            drawCharts(name:string){
                nextTick(()=>{
                    let mychart=state.echartsList[name].dom=echarts.init(document.getElementById(name))
                    mychart.setOption(state.echartsList[name].option)
                })
            }
        }
</script>

<style lang='less' scoped>
.echarts{ 
   .grid{
        .title{padding:  0 20px; height: 30px; background: skyblue;width: 100%; line-height: 2rem;}
        .chart-contain{height: 400px; width: 100%;
            div{width: 100%;height: 100%;}
        }
   }
}
</style>