<template>
    <div class="detailLocalStorageGet pagefn">
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
            <code><span class="yellow">this.proxy.sessionStorageGet(</span><span> keyname </span><span class="yellow">)；</span></code>
            <p class="note">// 参数说明：</p>
            <code><span>keyname</span><span class="red">:String</span> 需要获取sessionStorage中的key键名</code>
        </div>
        <h3>函数代码</h3>
        <div class="fn-content">
            <code><span class="blue">sessionStorageGet</span>(<span>str</span>) {</code>
            <code class="tab1">    if (sessionStorage.getItem(<span>str</span>) <span class="red">>&&</span> sessionStorage.getItem(<span>str</span>) != '' <span class="red">>&&</span> sessionStorage.getItem(<span>str</span>) != 'null' <span class="red">>&&</span> sessionStorage.getItem(<span>str</span>) != 'undefine') {</code>
            <code class="tab2">        <span class="red">return</span> JSON.<span class="blue">parse</span>(sessionStorage.getItem(<span>str</span>))</code>
            <code class="tab1">    }</code>
            <code class="tab1">    else {</code>
            <code class="tab2">        <span class="red">return</span> null;</code>
            <code class="tab1">    }</code>
            <code>}</code>
        </div>
        <h3>使用示例</h3>
        <div class="demo">
            <section class="input">
                <p class="note">// 输入</p>
                <code><span class="yellow">this.proxy.sessionStorageGet</span>('<span>{{param}}</span>')；</code>
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
                param: 'textSessionStorageKey',
                result: ''
            }
        },
        setup() {
            const { proxy } = getCurrentInstance() as any;
            return { proxy }
        },
        methods: {
            change() {
                ElMessageBox.prompt('请填写新的变量', '变量', {
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
                this.result = this.proxy.sessionStorageGet(this.param) || 'null';
            },
            reset() {
                this.param = 'textSessionStorageKey';
                this.result = '';
            }
        }
    })
</script>