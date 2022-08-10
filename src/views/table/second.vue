<template>
    <div class="page">
        <h2>表格页2静态页面</h2>
        <div class="contain">
            <div class="top">
                <div class="left">
                    <div id="map" style="width:100%;height:100%;">

                    </div>
                </div>
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
                            <!-- <div>
                                
                            </div> -->
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
                <div class="bottom-Left">
                    <h4>人员结构</h4>
                    <div class="bottom-Left-contain">
                        <ul>
                            <li>
                                <p>总数</p>
                                <div>1234</div>
                            </li>
                             <li>
                                <p>男</p>
                                <div>123</div>
                            </li>
                             <li>
                                <p>女</p>
                                <div>123</div>
                            </li>
                        </ul>
                        <div class="t3" id="t3"></div>
                    </div>
                </div>
                <div class="bottom-right">
                    <div class="bottom-right-box">
                        <h4>部门职员变化</h4>
                        <div class="t4" id="t4">

                        </div>
                    </div>
                    <div class="bottom-right-box">
                        <h4>满意度统计</h4>
                        <div class="t5" id="t5">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
var elementResizeDetectorMaker=require('element-resize-detector')
import countTo from 'vue-count-to';
import * as echarts from 'echarts'
import  'echarts-liquidfill'
// import '../../../public/static/js/china.js'
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
                t3:{
                    title:'南丁格尔图',
                    dom:{},
                    dataorigin:[],
                    option:{},
                    completed:false
                },
                t4:{
                    title:'柱状折线图',
                    dom:{},
                    dataorigin:[],
                    option:{},
                    completed:false
                },
                t5:{
                    title:'矩形树图',
                    dom:{},
                    dataorigin:[],
                    option:{},
                    completed:false
                },
                map:{
                    title:'矩形树图',
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
            });
            gett3().then((res)=>{
                echartsList.t3.option=res;
                drawCharts('t3')
            });
            gett4().then((res)=>{
                echartsList.t4.option=res;
                drawCharts('t4')
            });
            gett5().then((res)=>{
                echartsList.t5.option=res;
                drawCharts('t5')
            });
            getMap().then((res)=>{
                echartsList.map.option=res;
                drawCharts('map')
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
                    // splitLine:{
                    //     show:false
                    // },
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
                        show:false   //隐藏y轴线
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
        });
        const gett3=(async()=>{
           let option = {
                title: {
                    // text: 'Nightingale Chart',
                    // subtext: 'Fake Data',
                    // left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    top: 'bottom',
                    data: [
                    'rose1',
                    'rose2',
                    'rose3',
                    'rose4',
                    ]
                },
                toolbox: {
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
                    name: '年龄区间',
                    type: 'pie',
                    radius: ['30%', '50%'],
                    center: ['25%', '50%'],
                    // roseType: 'radius',
                     avoidLabelOverlap: false,
                    // itemStyle: {
                    //     borderRadius: 5
                    // },
                    label: {
                        show: true,
                        // normal:{
                        //     formatter: '{a} <br/>{b} : {c} ({d}%)',
                        // },
                        emphasis: {//中间文字显示
                            show: true,
                        }
                         
                    },
                    emphasis: {
                        label: {
                        show: true
                        }
                    },
                    data: [
                        { value: 100, name: '36-45岁' },
                        { value: 300, name: '46-55岁' },
                        { value: 100, name: '55岁以上' },
                        { value: 1086, name: '35岁以下' },
                      
                    ]
                    },
                    {
                    name: '学历结构',
                    type: 'pie',
                    radius: ['30%', '50%'],
                    center: ['75%', '50%'],
                    // roseType: 'area',
                    // itemStyle: {
                    //     borderRadius: 5
                    // },
                    label: {
                        show: true
                    },
                    emphasis: {
                        label: {
                        show: true
                        }
                    },
                    data: [
                        { value: 50, name: '硕士' },
                        { value: 30, name: '博士' },
                        { value: 17, name: '本科' },
                        { value: 30, name: '专科' },
                      
                    ]
                    }
                ]
                };
            return option
        });
        const gett4=(async()=>{
            let option = {
                 grid:{
                    bottom:'20%',
                },
                tooltip: {
                    trigger: 'axis',
                        axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
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
                    data: ['男员工', '女员工',],
                    textStyle: {
                        color: "#fff"
                    }
                },
                xAxis: [
                    
                    {
                        splitLine:{   
                            // show:false   //隐藏y轴线
                        },
                        type: 'category',
                        data: ['部门一', '部门二', '部门三', '部门四', '部门五'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        splitLine:{   
                            show:false   //隐藏y轴线
                        },
                        type: 'value',
                        // name: 'Precipitation',
                        // min: 0,
                        // max: 250,
                        // interval: 50,
                        axisLabel: {
                            // formatter: '{value} ml'
                        },
                        // axisLine: {//这是y轴文字颜色
                        //     lineStyle: {
                        //         color: "#fff",
                        //     }
                        // }
                    
                    },
                    //     {
                    //     type: 'value',
                    //     name: 'Temperature',
                    //     min: 0,
                    //     max: 25,
                    //     interval: 5,
                    //     axisLabel: {
                    //         formatter: '{value} °C'
                    //     }
                    // }
                ],
                series: [
                    {
                    name: '男员工',
                    type: 'bar',
                    barWidth: 20,
                    stack:'ad',
                    tooltip: {
                        valueFormatter: function (value) {
                        return value + ' ml';
                        }
                    },
                    data: [
                        2.0, 4.9, 7.0, 23.2, 25.6
                    ]
                    },
                    {
                    name: '女员工',
                    type: 'bar',
                    barWidth: 20,
                    stack:'ad',
                    tooltip: {
                        valueFormatter: function (value) {
                        return value + ' ml';
                        }
                    },
                    data: [
                        2.6, 5.9, 9.0, 26.4, 28.7
                    ]
                    },
                    // {
                    // name: 'Temperature',
                    // type: 'line',
                    // yAxisIndex: 1,
                    // tooltip: {
                    //     valueFormatter: function (value) {
                    //     return value + ' °C';
                    //     }
                    // },
                    // data: [2.0, 2.2, 3.3, 4.5, 6.3,]
                    // }
                ]
            };
            return option;
        });
        const gett5=(async()=>{
            let option = {
                series: [
                    {
                    type: 'treemap',
                    data: [
                        {
                        // name: 'nodeA',
                        value: 10,
                        children: [
                            {
                            name: '一星',
                            value: 2
                            },
                            {
                            name: '二星',
                            value: 3
                            },
                            {
                            name: '三星',
                            value: 5
                            }
                        ]
                        },
                        {
                        // name: 'nodeB',
                        value: 20,
                            children: [
                                {
                                    name: '四星',
                                    value: 8
                                },
                                 {
                                    name: '五星',
                                    value: 12
                                }
                            ]
                        }
                    ]
                    }
                ]
            };
            return option;
        });
        const getMap=(async()=>{
            let option = {
                backgroundColor: '#FFFFFF',
                title: {
                    text: '全国地图',
                    subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item'
                },
                visualMap: {
                    show : false,
                    x: 'left',
                    y: 'bottom',
                    splitList: [ 
                        {start: 500, end:600},{start: 400, end: 500},
                        {start: 300, end: 400},{start: 200, end: 300},
                        {start: 100, end: 200},{start: 0, end: 100},
                    ],
                    color: ['#66CC33', '#00FF00', '#66FF33','#339900', '#33CC00', '#00CC00']
                },
                series: [{
                    name: '随机数据',
                    type: 'map',
                    mapType: 'china', 
                    roam: true,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data:mydata
                }]
            };
            return option;
	
        })
        const randomData=(()=>{
            return Math.round(Math.random()*500);
        })

        const drawCharts=((name:string)=>{
            nextTick(()=>{
                let mychart=echartsList[name].dom=echarts.init(document.getElementById(name))
                mychart.setOption(echartsList[name].option)
            })
        });
        var mydata = [
            {name: '北京',value: randomData() },{name: '天津',value: randomData() },
            {name: '上海',value: randomData() },{name: '重庆',value: randomData() },
            {name: '河北',value: randomData() },{name: '河南',value: randomData() },
            {name: '云南',value: randomData() },{name: '辽宁',value: randomData() },
            {name: '黑龙江',value: randomData() },{name: '湖南',value: randomData() },
            {name: '安徽',value: randomData() },{name: '山东',value: randomData() },
            {name: '新疆',value: randomData() },{name: '江苏',value: randomData() },
            {name: '浙江',value: randomData() },{name: '江西',value: randomData() },
            {name: '湖北',value: randomData() },{name: '广西',value: randomData() },
            {name: '甘肃',value: randomData() },{name: '山西',value: randomData() },
            {name: '内蒙古',value: randomData() },{name: '陕西',value: randomData() },
            {name: '吉林',value: randomData() },{name: '福建',value: randomData() },
            {name: '贵州',value: randomData() },{name: '广东',value: randomData() },
            {name: '青海',value: randomData() },{name: '西藏',value: randomData() },
            {name: '四川',value: randomData() },{name: '宁夏',value: randomData() },
            {name: '海南',value: randomData() },{name: '台湾',value: randomData() },
            {name: '香港',value: randomData() },{name: '澳门',value: randomData() }
        ];

</script>

<style lang='less' scoped>
.page{
    .contain{ height: calc(100% - 24px);width: 100%; box-sizing: border-box;background: #144258; box-sizing: border-box; padding: 10px 0;display:flex; flex-direction: column; justify-content: space-between;
        .top{height: 69%;width: 100%; display: flex; justify-content: space-between;
            .left{ width: 490px;height: 100%; }
            .right{ width: calc(100% - 500px);height: 100%; display: flex; flex-direction: column; flex-wrap :wrap;justify-content: space-between;
                .right-box{ box-sizing: border-box;   width: 49%;height: 49%; background: rgba(#105869, 0.4);padding:5px 30px;
                    h4{ padding: 3px 0; color: #fff; text-align: center;font-size: 16px; background: linear-gradient(to right, rgba(#09464e,0.1) 0%, rgba(#057d7e,0.8) 50%, rgba(#09464e,0.1) 100%);}
                    .box-contain{width: 100%;height: calc(100% - 27px);display: flex;flex-wrap :wrap; align-content:center; 
                        .first-box-contain{ width: 50%;  margin: 20px 0;
                            p{color: #fff;}
                            div{ font-size: 18px; font-weight: bold; color: yellow; }
                        }
                        .echarts{ width: 100%;height: 100%; }
                        .waterBall{ height: 100%;width: 49%;
                            p{color: #fff; font-size: 12px; span{color: #b1651d;font-size: 18px;font-weight: bold;} }
                            div{ width: 100%; height: calc(100% - 40px);}
                        }
                    }
                }
            }
        }
        .bottom{ height: 30%;width: 100%; display: flex; justify-content: space-between;
            .bottom-Left{ width: 490px;height: 100%;box-sizing:border-box; background: rgba(#105869, 0.4);padding:5px 30px;
                h4{
                    padding: 3px 0; color: #fff; text-align: center;font-size: 16px; background: linear-gradient(to right, rgba(#09464e,0.1) 0%, rgba(#057d7e,0.8) 50%, rgba(#09464e,0.1) 100%);
                }
                .bottom-Left-contain{ height: calc(100% - 27px); display: flex;
                    ul{height: 100%;  width: 80px; display: flex; flex-direction: column;justify-content:space-around;
                        li{height: 40px;border:1px solid #076d73;
                            p{background: #095661; font-size: 12px;text-align: left;color: #fff;}
                            div{
                                background: #0b4150; color: #c39217;font-size: 18px;
                            }
                        }
                    }
                    .t3{
                        height: 100%;width: calc(100% - 80px);
                    }
                }
            }
            .bottom-right{width: calc(100% - 500px);height: 100%;  display: flex;
                .bottom-right-box{box-sizing: border-box;   width: 49%;background: rgba(#105869, 0.4);padding:5px 30px;
                     h4{ padding: 3px 0; color: #fff; text-align: center;font-size: 16px; background: linear-gradient(to right, rgba(#09464e,0.1) 0%, rgba(#057d7e,0.8) 50%, rgba(#09464e,0.1) 100%);}
                    .t5,.t4{
                        height: calc(100% - 27px);width: 100%;
                    }
                    &:first-child{margin-right: 1%;}
                }
               
            }
        }
    }
}
</style>