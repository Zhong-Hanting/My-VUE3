<template>
    <div class="detailSessionStorageSet pagefn">
        <h2>{{name}}</h2>
        <h4>{{desc}}</h4>
        <h3>使用说明</h3>
        <div class="fn-use">
            <p class="note">// 前置引入：</p>
            <code>import { <span>getCurrentInstance</span> } from 'vue';</code>
            <code><span class="blue">setup()</span> {</code>
            <code class="tab1"> const { <span>proxy</span> } = <span class="yellow">getCurrentInstance()</span> <span class="red">as</span> any;</code>
            <code class="tab1"> return { <span>proxy</span> }</code>
            <code>}</code>
            <p class="note">// 调用方法：</p>
            <code><span class="yellow">this.proxy.sessionStorageSet(</span><span> keyname,object </span><span class="yellow">)；</span></code>
            <p class="note">// 参数说明：</p>
            <code><span>keyname</span><span class="red">:String</span> 需要存储sessionStorage中的key键名</code>
            <code><span>object</span><span class="red">:Object</span> 需要存储的对象</code>
        </div>
        <h3>函数代码</h3>
        <div class="fn-content">
            <code><span class="blue">sessionStorageSet</span>(<span>str, obj</span>) {</code>
            <code class="tab1">    if(str <span class="red">&&</span> obj){</code>
            <code class="tab2">        var cache = [];</code>
            <code class="tab2">        var stringify = JSON.<span class="blue">stringify</span>(<span>obj</span>, (key, value)=> {</code>
            <code class="tab3">            if (typeof value === 'object' <span class="red">&&</span> value !== null) {</code>
            <code class="tab4">                if (cache.indexOf(value) !== -1) {</code>
            <code class="tab5">                    <span class="red">return</span>;</code>
            <code class="tab4">                }</code>
            <code class="tab4">                cache.<span class="blue">push</span>(value);</code>
            <code class="tab3">            }</code>
            <code class="tab3">            <span class="red">return</span> value;</code>
            <code class="tab2">        });</code>
            <code class="tab2">        cache = null;</code>
            <code class="tab2">        sessionStorage.<span class="blue">setItem</span>(<span>str,stringify</span>)</code>
            <code class="tab2">        <span class="red">return</span> true;</code>
            <code class="tab1">    }</code>
            <code class="tab1">    else{</code>
            <code class="tab2">        console.error('$sessionStorageSet：参数错误')</code>
            <code class="tab2">        <span class="red">return</span> false;</code>
            <code class="tab1">    }</code>
            <code>}</code>
        </div>
        <h3>使用示例</h3>
        <div class="demo">
            <section class="input">
                <p class="note">// 输入</p>
                <code><span class="yellow">this.proxy.sessionStorageSet</span>('<span>{{param}}</span>')；</code>
            </section>
            <section class="operate">
                <el-button type="primary" @click="change()">变量</el-button>
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
        name: 'detailCopyText',
        props: {
            name: { type: String, default: '--' },
            desc: { type: String, default: '--' },
        },
        data() {
            return {
                param: 'textSessionStorageKey,{"name":"legolas"}',
                result: ''
            }
        },
        setup() {
            const { proxy } = getCurrentInstance() as any;
            return { proxy }
        },
        methods: {
            change() {
                ElMessageBox.prompt('请填写新的变量(如：)', '变量', {
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
            run() {
                let arr =  this.param.split(',')
                let param={
                    k:arr[0],
                    v:JSON.parse(arr[1]),
                }
                this.result = this.proxy.sessionStorageSet(param.k,param.v) || 'null';
            },
            reset() {
                this.param = 'textSessionStorageKey';
                this.result = '';
            }
        }
    })
</script>