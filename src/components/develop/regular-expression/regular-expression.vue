<template>
    <div class="page-regular-expression">
        <ul class="menu">
            <li v-for="item of typeList" :key="item.name" :class="{current:item.name==currentType.name}" @click="changeCurrentType(item)">
                <span class="name">{{item.name}}</span>
                <span class="desc">{{item.desc}}</span>
            </li>
        </ul>
         <section class="contain">
             <section class="item" v-for="(item,index) in listData" :key="index">
                <h2>{{index+1}} {{item.name}}</h2>
                <div class="box">
                    <p class="note" v-if="item.subname">// {{item.subname}}</p>
                    <div v-if="item.regType=='special'">
                        <code  v-for="reg of item.regs">let {{reg.k}} = <span class="blue">{{reg.v}}</span>;</code>
                        <code v-if="item.extracode" v-html="item.extracode"></code>
                        <code><span class="red">return</span> <strong v-html="item.returnText"></strong></code>
                    </div>
                    <div v-else>
                        <code>let reg = <span class="blue">{{item.reg}}</span>;</code>
                        <code><span class="red">return</span> reg.<span class="yellow">test</span>('<span>{{item.input}}</span>')</code>
                    </div>
                    <div class="result">
                        <section class="input">
                        <p class="note">// 输入：</p>
                        <el-input @input="init()" v-model="item.input"></el-input>
                    </section>
                    <section  class="output">
                        <p class="note">// 输出：</p>
                        <code><span :class="item.output?'green':'red'">{{item.output}}</span></code>
                    </section>
                    </div>
                </div>
            </section>
         </section>
        
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'customComponent',
        props: {},
        data() {
            return {
                currentType:{
                    name:String,
                    desc:String
                },
                typeList:[{
                    name:"表单验证",
                    desc:"适用于常用的表单填写项验证"
                },{
                    name:"字符校验",
                    desc:"对字符的基础校验"
                }],
                listData:Array
            }
        },
        created(){
            this.changeCurrentType(this.typeList[0])
        },
        methods: {
            changeCurrentType(type:Object){
                this.currentType = type;
                this.listData = [];
                if(this.currentType.name=='表单验证'){
                    this.listData = [{
                        name:'验证用户名',
                        subname:'字母开头，允许 5-16 字节，允许字母数字下划线',
                        reg:/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
                        input:'LeGolas',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'验证密码（弱）',
                        subname:'允许 6-12 位字母数字或下划线',
                        reg:/^\w{6,12}$/,
                        input:'legolas',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'验证密码（中）',
                        subname:'密码中允许出现数字、大写字母、小写字母、特殊字符（!#$%^&*），但至少包含其中2种且长度在6-12之间',
                        reg:/^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![~!@#$%^&*,._-]+$)[\da-zA-z!~#$%^&*,._-]{6,12}$/,
                        input:'legolas!',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'验证密码（强）',
                        subname:'至少1个大写字母(?=.*?[A-Z]) / 至少1个小写英文字母(?=.*?[a-z]) / 至少1位数字(?=.*?[0-9]) / 至少有1个特殊字符(?=.*?[#?!@$%^&*-]) / 允许 6-12 位任意字符 根据实际需求增减',
                        reg:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~!@#$%^&*,._-]).{6,12}$/,
                        input:'LeGolas2022!',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'验证真实姓名',
                        subname:'2-6个中文汉字',
                        reg:/^[\u4e00-\u9fa5]{2,6}$/,
                        input:'王德发',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'验证手机号码',
                        reg:/^[1][3,4,5,7,8,9][0-9]{9}$/,
                        input:18012344321,
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'验证日期格式(简单)',
                        subname:'允许格式为YYYY-MM-DD格式的日期',
                        reg:/^\d{4}-\d{1,2}-\d{1,2}/,
                        input:'2000-01-01',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'验证日期格式(严格))',
                        subname:'允许格式为YYYY-MM-DD格式的日期严格校验，已考虑平闰年',
                        reg:/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,
                        input:'2000-01-01',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'验证电子邮箱',
                        reg:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                        input:'administrator@163.com',
                        output:null,
                        outputType:'boolean',
                    },{
                        regType:'special',
                        name:'验证身份证号码',
                        regs:[
                            {
                                k:'reg15',
                                v:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/,
                            },{
                                k:'reg18',
                                v:/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/
                            }
                        ],
                        input:'510610200010104000',
                        returnText:`(re15.<span class="yellow">test</span>(value) || re18.<span class="yellow">test</span>(value))`,
                        output:null,
                        outputType:'boolean',
                    }];
                }
                else if(this.currentType.name=='字符校验'){
                    this.listData = [{
                        name:'汉字',
                        reg:/^[\u4e00-\u9fa5]{1,}$/,
                        input:'李扬',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'数字',
                        reg:/^[0-9]*$/,
                        input:'1234567890',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'数字(非零的正整数)',
                        reg:/^[1-9]\d*$/,
                        input:'1234567890',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'数字(非零的负整数)',
                        reg:/^\-[1-9][0-9]*$/,
                        input:'-2022',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'数字(非负整数)',
                        reg:/^\d+$/,
                        input:'0',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'数字(非正整数)',
                        reg:/^-[1-9]\d*|0$/,
                        input:'0',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'数字(非负浮点数)',
                        reg:/^\d+(\.\d+)?$/,
                        input:'-3.141592653',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'数字(非正浮点数)',
                        reg:/^((-\d+(\.\d+)?)|(0+(\.0+)?))$/,
                        input:'-3.141592653',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'数字(正浮点数)',
                        reg:/^[1-9]d.d|0.d[1-9]d$/,
                        input:'-3.141592653',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'数字(负浮点数)',
                        reg:/^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/,
                        input:'-3.141592653',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'数字(浮点数)',
                        reg:/^(-?\d+)(\.\d+)?$/,
                        input:'-3.141592653',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'数字（指定长度）',
                        reg:/^\d{1,10}$/,
                        input:'2022',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'英文和数字',
                        reg:/^[A-Za-z0-9]+$/,
                        input:'LeGolas2022',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'英文、数字、下划线',
                        reg:/^\w+$/,
                        input:'LeGolas_2022',
                        output:null,
                        outputType:'boolean',
                    },{
                        name:'特殊符号',
                        subname:"匹配所有键盘上可见的非字母和数字的符号",
                        reg:/^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/,
                        input:'!@#$%^&*()',
                        output:null,
                        outputType:'boolean',
                    },
]
                }
                this.init();
            },
            init(){
                for(let item of this.listData){
                    //特殊处理
                    if(item.regType == 'special'){
                        switch(item.name){
                            case '验证身份证号码':
                                item.extracode = `let value = <span>${item.input}</span>`
                                item.output = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(item.input)  || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(item.input)
                                break;
                        }
                    }
                    //常规处理
                    else{
                        item.output = item.reg.test(item.input)
                    }
                }
            }
        }
    })
</script>
<style lang="less" scoped>
.page-regular-expression{ padding: 15px; height: 100%; display: flex; justify-content: space-between;
    .menu{ width: 200px; height: 100%; background: rgba(0, 0, 0, 0.1);
        li{ padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); cursor: pointer;
            .name{color: #8ebeeb;font-size: 14px; font-weight: 600;}
            .desc{display: block; color: #5D7AA4; padding-top: 5px;}
            &:hover,&.current{ border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                .name{color: white;}
                .desc{color: #8ebeeb;}
            }
        }
    }
    .contain{ flex: 1; height: 100%; padding: 0 10px;
        .item{
            *{user-select:text;}
            .box{background: rgba(0, 0, 0, 0.1); padding: 10px;  width: 100%; border: 3px solid rgba(255, 255, 255, 0.1);  margin: 10px 0;
                .result{display: flex; justify-content: space-between; padding-top: 15px;
                    section{ width: 49%;}
                    /deep/.el-input{ 
                        .el-input__inner{background: none; border: none; border-bottom: 1px  solid rgba(255, 255, 255, 0.1); color: white; padding-left: 0; box-shadow: none;}
                    }
                }
            }
        }
    }
}
</style>