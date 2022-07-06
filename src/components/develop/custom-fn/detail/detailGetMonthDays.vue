<template>
    <div class="detailGetMonthDays pagefn">
        <h2>{{name}}</h2>
        <h4>{{desc}}</h4>
        <h3>使用说明</h3>
        <div class="fn-use">
            <p class="note">// 前置引入：</p>
            <code>import { <span>getCurrentInstance</span> } from 'vue';</code>
            <code><span class="blue">setup()</span> {</code>
            <code class="tab1">    const { <span>proxy</span> } = <span class="yellow">getCurrentInstance()</span> <span class="red">as</span> any;</code>
            <code class="tab1">    return { <span>proxy</span> }</code>
            <code>}</code>
            <p class="note">// 调用方法：</p>
            <code><span class="yellow">this.proxy.getMonthDays(year,month)；</span></code>
            <p class="note">// 参数说明：</p>
            <code><span>year</span><span class="red">:Number</span> 查询年份（传null则默认获取今年）</code>
            <code><span>month</span><span class="red">:Number</span> 查询月份（传null则默认获取本月）</code>
        </div>
        <h3>函数代码</h3>
        <div class="fn-content">
            <code><span class="blue">getMonthDays (<span>year,month</span>)</span> {</code>
            <code class="tab1">    var date = <span class="red">new</span> <span class="yellow">Date()</span>;</code>
            <code class="tab1">    var y = year ||  <span class="yellow">date.getFullYear()</span>;</code>
            <code class="tab1">    var m = month || <span class="yellow"> date.getMonth()</span> + 1;</code>
            <code class="tab1">    var d = <span class="red">new</span> <span class="yellow">Date</span>(<span>y</span>, <span>m</span>, <span>0</span>);</code>
            <code class="tab1">    let length = <span class="yellow">d.getDate()</span>;</code>
            <code class="tab1">    let arr = Array.from({ <span>length: length</span> }, (<span>v</span>, <span>k</span>) => (m &lt;  10 ? '0' + m : m) + '/' + (k + 1 &lt; 10 ? '0' + (k + 1) : k + 1));</code>
            <code class="tab1">    <span class="red">return</span> arr;</code>
            <code>}</code>
        </div>
         <h3>使用示例</h3>
         <div class="demo">
             <section class="input">
                 <p class="note">// 输入</p>
                 <code><span class="yellow">this.proxy.getMonthDays</span>(<span>{{param}}</span>)；</code>
             </section>
             <section class="operate">
                 <el-button @click="change()" type="primary">变量</el-button>
                 <el-button type="success" @click="run()">执行</el-button>
                 <el-button @click="reset()">重置</el-button>
             </section>
             <section class="output">
                 <p class="note">// 输出</p>
                 <code><span>{{result}}</span></code>
             </section>
         </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, getCurrentInstance } from 'vue'
    import { ElMessageBox } from 'element-plus'

    export default defineComponent({
        name: 'detailGetMonthDays',
        props: {
             name: { type: String, default: '--' },
             desc: { type: String, default: '--' },
        },
        data() {
            return {
                param:'2022,1',
                result:''
            }
        },
        setup() {
            const { proxy } = getCurrentInstance() as any;
            return { proxy }
        },
        methods: {
            change() {
                ElMessageBox.prompt('请填写新的变量(如:2022,1)', '变量', {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                    })
                    .then(({ value }) => {
                        this.param = value;
                        this.result  = '';
                        this.$message({
                            message: '变量已更新为:' + value + '，请重新点击运行',
                            type: 'success',
                        })
                    })
                    .catch(() => {})
            },
            run(){
                if(this.param){
                    let arr =  this.param.split(',')
                    let param={
                        y:arr[0] || null,
                        m:arr[1] || null,
                    }
                    this.result = this.proxy.getMonthDays(param.y,param.m);
                }
                else{
                    this.result = this.proxy.getMonthDays();
                }
            },
            reset(){
                this.result = '';
            }
        }
    })
</script>