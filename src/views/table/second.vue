<template>
    <div class="page">
        <h2>表格页2静态页面</h2>
        <div class="contain">
            <div class="top">
                <div class="left"></div>
                <div class="right" id="right">
                    <div class="right-box">
                        <h4>数据汇总</h4>
                          <!-- <countTo :startVal='123' :endVal='9' :duration='3000' ref='count1'></countTo> -->
                        <div class="box-contain">
                                <div class="first-box-contain">
                                    <p>业务情况</p>
                                        <div>
                                            123
                                        </div>
                                </div>
                                <div class="first-box-contain">
                                    <p>本月增长指数</p>
                                        <div>
                                            2.9
                                        </div>
                                </div>
                                <div class="first-box-contain">
                                    <p>人员分布</p>
                                        <div>
                                            199                                           
                                        </div>
                                </div>
                                <div class="first-box-contain">
                                    <p>当月办理次数</p>
                                        <div>
                                            123  
                                        </div>
                                </div>
                            <div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="right-box">
                        <h4>业务办理进度</h4>
                        <div class="box-contain">
                            <div class="waterBall">
                                <p>已办理完成数<span>1234</span></p>
                                <div id="waterBallLeft"></div>
                            </div>
                             <div class="waterBall">
                                 <p>未办理数<span>1234</span></p>
                                 <div id="waterBallRight"></div>
                            </div>
                        </div>
                    </div>
                    <div class="right-box">
                        <h4>项目分析数据</h4>
                        <div class="box-contain">
                            <div  class="echarts" id="t1"> </div>
                        </div>
                    </div>
                    <div class="right-box">
                        <h4>业务数据分析</h4>
                        <div class="box-contain">
                            <div class="echarts" id="t2">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">

            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
var elementResizeDetectorMaker=require('element-resize-detector')
import countTo from 'vue-count-to';
import * as echarts from 'echarts'
import  'echarts-liquidfill'
import {ref,reactive,onMounted,toRefs,nextTick} from 'vue'

        let data=reactive({
                allData:{
                    work:123,
                    month:2.9,
                    person:199,
                    dayWork:123,
                }     
        })
        const  echartsList=reactive({
                t1:{
                    title:'雷达图',
                    dom:{},
                    dataorigin:[],
                    option:{},
                    completed:false
                },
                waterBallLeft:{
                    title:'水球图',
                    dom:{},
                    dataorigin:[],
                    option:{},
                    completed:false
                },
                waterBallRight:{
                    title:'水球图',
                    dom:{},
                    dataorigin:[],
                    option:{},
                    completed:false
                },
                t2:{
                    title:'柱状图',
                    dom:{},
                    dataorigin:[],
                    option:{},
                    completed:false
                },
            });
        onMounted(()=>{
            init();
            elementResizeDetectorMaker().listenTo(document.getElementById('right'),(el:any)=>{
                nextTick(()=>{
                    init();
                    for(let i in echartsList){
                        echartsList[i].dom.resize();
                    }
                })
            })
        })
        // methods
        const init=(()=>{
            gett1().then((res: {})=>{
                echartsList.t1.option=res;
                drawCharts('t1')
            })
            getWaterLeft().then((res)=>{
                echartsList.waterBallLeft.option=res;
                drawCharts('waterBallLeft')
            })
            getWaterRight().then((res)=>{
                echartsList.waterBallRight.option=res;
                drawCharts('waterBallRight')
            })
            gett2().then((res)=>{
                echartsList.t2.option=res;
                drawCharts('t2')
            })
        });
        const  gett1=(async()=>{
            let option = {
                color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
                title: {},
                legend: {},
                radar: [
                    {
                    indicator: [
                        { text: '项目一' },
                        { text: '项目二' },
                        { text: '项目三' },
                        { text: '项目四' },
                        { text: '项目五' }
                    ],
                    center: ['50%', '50%'],
                    radius: 50,
                    startAngle: 90,
                    splitNumber: 4,
                    shape: 'circle',
                    axisName: {
                        formatter: '【{value}】',
                        color: '#428BD4'
                    },
                    splitArea: {
                        areaStyle: {
                        color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                        shadowBlur: 10
                        }
                    },
                    axisLine: {
                        lineStyle: {
                        color: 'rgba(211, 253, 250, 0.8)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                        color: 'rgba(211, 253, 250, 0.8)'
                        }
                    }
                    },
                ],
                series: [
                    {
                    type: 'radar',
                    emphasis: {
                        lineStyle: {
                        width: 4
                        }
                    },
                    data: [
                        {
                        value: [100, 8, 0.4, -80, 2000],
                        // name: 'Data A'
                        },
                        {
                        value: [60, 5, 0.3, -100, 1500],
                        // name: 'Data B',
                        // areaStyle: {
                        //     color: 'rgba(255, 228, 52, 0.6)'
                        // }
                        }
                    ]
                    },
                ]
                };
                return option;
        });
        const getWaterLeft=(async()=>{
            let option = {
                series: [{
                    type: 'liquidFill',
            name: 'series name', //series name
            radius: '90%',
            center: ['50%', '50%'],
            backgroundStyle: {
                // borderWidth: 1, //内边框宽度
                // borderColor: '#2cd6d6', //背景内边框
                color: '#0c4250', //背景颜色
                // shadowColor: 'red', //阴影
                // shadowBlur: 10, //阴影模糊
            },
            outline: {
                borderDistance: 5, //边框距离
                itemStyle: {
                    borderWidth: 1,
                    borderColor: '#2cd6d6',
                    // shadowBlur: 10,
                    // shadowColor: 'red'
                }
            },
            data: [
                0.6
                // {
                // name: 'data name', //data name
                // value: 0.6 //By default, the text label of liquid fill chart displays percentage of the first data. For example, for a chart with data [0.6, 0.5, 0.4, 0.3], default text is 60%.
                // }, 0.5, 0.4, 0.3
            
            ],
            label: { //To change the text, you may use label.formatter, which can be set to a string or function.
                normal: {
                    // formatter: '{a}\n{b}\nValue: {c}', //If it is a string, {a} series name, {b} data name,{c} data value.
                    textStyle: {
                        color: '#2cd6d6', //波浪上文本颜色
                        insideColor: '#2cd6d6', //波浪内部字体颜色
                        fontSize: 20
                    },
                    position: ['50%', '50%'], //Text position is at the center by default. label.position can be set to be 'inside', 'left', 'right', 'top', 'bottom', or horizontal and vertical positions like ['10%', '20%'], which means '10%' to the left (controlled by label.align, which can be 'left', 'center', or 'right') and '20%' to the top (controlled by label.baseline, which can be 'top', 'middle', or 'bottom').
                    // position:'top'
                    // align: 'center',
                    // baseline: 'center'
 
                }
            }
                }]
            };
            return option
        });
        const getWaterRight=(async()=>{
            let option = {
                series: [{
                    type: 'liquidFill',
            name: 'series name', //series name
            radius: '90%',
            center: ['50%', '50%'],
            backgroundStyle: {
                // borderWidth: 1, //内边框宽度
                // borderColor: '#2cd6d6', //背景内边框
                color: '#0c4250', //背景颜色
                // shadowColor: 'red', //阴影
                // shadowBlur: 10, //阴影模糊
            },
            outline: {
                borderDistance: 5, //边框距离
                itemStyle: {
                    borderWidth: 1,
                    borderColor: '#2cd6d6',
                    // shadowBlur: 10,
                    // shadowColor: 'red'
                }
            },
            data: [
                0.6
                // {
                // name: 'data name', //data name
                // value: 0.6 //By default, the text label of liquid fill chart displays percentage of the first data. For example, for a chart with data [0.6, 0.5, 0.4, 0.3], default text is 60%.
                // }, 0.5, 0.4, 0.3
            
            ],
            label: { //To change the text, you may use label.formatter, which can be set to a string or function.
                normal: {
                    // formatter: '{a}\n{b}\nValue: {c}', //If it is a string, {a} series name, {b} data name,{c} data value.
                    textStyle: {
                        color: '#2cd6d6', //波浪上文本颜色
                        insideColor: '#2cd6d6', //波浪内部字体颜色
                        fontSize: 20
                    },
                    position: ['50%', '50%'], //Text position is at the center by default. label.position can be set to be 'inside', 'left', 'right', 'top', 'bottom', or horizontal and vertical positions like ['10%', '20%'], which means '10%' to the left (controlled by label.align, which can be 'left', 'center', or 'right') and '20%' to the top (controlled by label.baseline, which can be 'top', 'middle', or 'bottom').
                    // position:'top'
                    // align: 'center',
                    // baseline: 'center'
 
                }
            }
                }]
            };
            return option
        });
        const gett2=(async()=>{
            let option = {
                grid:{
                    bottom:'20%',

                },
                tooltip: {
                    // trigger: 'axis',
                    // axisPointer: {
                    // type: 'cross',
                    // crossStyle: {
                    //     color: '#999'
                    // }
                    // }
                },
                toolbox: {
                    // feature: {
                    // dataView: { show: true, readOnly: false },
                    // magicType: { show: true, type: ['line', 'bar'] },
                    // restore: { show: true },
                    // saveAsImage: { show: true }
                    // }
                },
                legend: {
                    data: ['业务一', '业务二'],
                    textStyle: {
                        color: "#fff"
                    }
                },
                xAxis: [
                   
                    {
                    splitLine:{
                        show:false
                    },
                    type: 'category',
                    data: ['区域一', '区域二', '区域三', '区域四', '区域五'],
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLine: {  //这是x轴文字颜色
                        lineStyle: {
                            color: "#fff",
                        }
                    }

                    }
                ],
                yAxis: [
                    {
                    splitLine:{
                        show:false
                    },
                    type: 'value',
                    // name: '业务一',
                        axisLabel: {
                            formatter: '{value} '
                        },
                        axisLine: {//这是y轴文字颜色
                            lineStyle: {
                                color: "#fff",
                            }
                        }
                    },
                    // {
                    // type: 'value',
                    // name: '业务二',
                    // min: 0,
                    // max: 25,
                    // interval: 5,
                    // axisLabel: {
                    //     formatter: '{value} °C'
                    // }
                    // }
                ],
                series: [
                    {
                    name: '业务一',
                    type: 'bar',
                    barWidth: '20%',
                    itemStyle:{
                        normal:{
                            barBorderRadius: [30, 30, 0, 0], 
                               color: new echarts.graphic.LinearGradient( 0, 0, 0, 1,  //渐变色
                                    [
                                        { offset: 1, color: '#0e4e5b' },
                                        { offset: 0.5, color: '#197f86' },
                                        { offset: 0, color: '#23acae' }
                                    ]
                                ),
                            }
                    },
                    tooltip: {
                        valueFormatter: function (value) {
                        return value ;
                        }
                    },
                    data: [
                        7000, 6000, 3000, 6500, 9000
                    ]
                    },
                    {
                    name: '业务二',
                    type: 'bar',
                    barWidth: '20%',
                    itemStyle:{
                        normal:{
                            barBorderRadius: [30, 30, 0, 0],
                            color: new echarts.graphic.LinearGradient( 0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#eeb706' },
                                        { offset: 0.5, color: '#a7921d' },
                                        { offset: 1, color: '#204c49' }
                                    ]
                                ),
                            }
                        
                    },
                    tooltip: {
                        valueFormatter: function (value) {
                        return value;
                        }
                    },
                    data: [
                        6000, 9000, 7000, 5000, 8500
                    ]
                    },
                ]
            };
            return option
        })
        const drawCharts=((name:string)=>{
                nextTick(()=>{
                    let mychart=echartsList[name].dom=echarts.init(document.getElementById(name))
                    mychart.setOption(echartsList[name].option)
                })
            })

</script>

<style lang='less' scoped>
.page{
    .contain{
        height: calc(100% - 24px);width: 100%; box-sizing: border-box;background: #144258; box-sizing: border-box; padding: 10px 0;
        .top{height: 70%;width: 100%; display: flex; 
            .left{
                width: 500px;height: 100%;
            }
            .right{
                width: calc(100% - 500px);height: 100%; display: flex; flex-direction: column; flex-wrap :wrap;justify-content: space-between;
                .right-box{
                    box-sizing: border-box;   width: 49%;height: 49%; background: rgba(#105869, 0.4);padding:5px 30px;
                    h4{
                      padding: 3px 0; color: #fff; text-align: center;font-size: 16px; background: linear-gradient(to right, rgba(#09464e,0.1) 0%, rgba(#057d7e,0.8) 50%, rgba(#09464e,0.1) 100%);
                    }
                    .box-contain{width: 100%;height: calc(100% - 27px);display: flex;flex-wrap :wrap; align-content:center; 
                            .first-box-contain{ width: 50%;  margin: 20px 0;
                                p{color: #fff;}
                                div{ font-size: 18px; font-weight: bold; color: yellow; }
                            }
                            .echarts{
                                width: 100%;height: 100%;
                            }
                            .waterBall{ height: 100%;width: 49%;
                                p{color: #fff; font-size: 12px; span{color: #b1651d;font-size: 18px;font-weight: bold;} }
                                div{ width: 100%; height: calc(100% - 40px);}
                            }
                    }
                }
            }

        }
        .bottom{
            height: 30%;width: 100%;
        }
    }
}
</style>