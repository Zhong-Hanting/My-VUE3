<template>
    <div class="detailGetDate pagefn">
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
            <code><span class="yellow">this.proxy.getDate()；</span></code>
        </div>
        <h3>函数代码</h3>
        <div class="fn-content">
            <code><span class="blue">getDate()</span> {</code>
            <code class="tab1">    var date = new <span class="yellow">Date();</span></code>
            <code class="tab1">    var year = <span class="yellow">date.getFullYear();</span></code>
            <code class="tab1">    var month = <span class="yellow">date.getMonth() + 1;</span></code>
            <code class="tab1">    var day = <span class="yellow">date.getDate();</span></code>
            <code class="tab1">    <span class="red">return</span> `${year}-${month&lt;10?'0'+month:month}-${day&lt;10?'0'+day:day}`</code>
            <code>}</code>
        </div>
         <h3>使用示例</h3>
         <div class="demo">
             <section class="input">
                 <p class="note">// 输入</p>
                 <code><span class="yellow">this.proxy.getDate()；</span></code>
             </section>
             <section class="operate">
                 <el-button type="info" disabled>变量</el-button>
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

    export default defineComponent({
        name: 'detailGetDate',
        props: {
             name: { type: String, default: '--' },
             desc: { type: String, default: '--' },
        },
        data() {
            return {
                result:''
            }
        },
        setup() {
            const { proxy } = getCurrentInstance() as any;
            return { proxy }
        },
        methods: {
            run(){
                this.result = this.proxy.getDate();
            },
            reset(){
                this.result = '';
            }
        }
    })
</script>