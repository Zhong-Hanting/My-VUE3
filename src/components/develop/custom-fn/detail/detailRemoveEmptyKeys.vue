<template>
    <div class="detailRemoveEmptyKeys pagefn">
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
            <code><span class="yellow">this.proxy.removeEmptyKeys(</span><span> object </span><span class="yellow">)；</span></code>
            <p class="note">// 参数说明：</p>
            <code><span>object</span><span class="red">:Object</span> 需要清洗的对象数据</code>
        </div>
        <h3>函数代码</h3>
        <div class="fn-content">
            <code><span class="blue">removeEmptyKeys</span>(<span>obj</span>) {</code>
            <code class="tab1">    let data = JSON.<span class="yellow">parse</span>(JSON.<span class="yellow">stringify</span>(<span>obj</span>))</code>
            <code class="tab1">    for ( var key in data ){</code>
            <code class="tab2">        if ( data[key] === '' <span class="red">||</span> data[key] === null <span class="red">||</span> data[key] === undefined){</code>
            <code class="tab3">            <span class="red">delete</span> data[key]</code>
            <code class="tab2">         }</code>
            <code class="tab1">     }</code>
            <code class="tab1">     <span class="red">return</span> data;</code>
            <code>}</code>
        </div>
        <h3>使用示例</h3>
        <div class="demo">
            <section class="input">
                <p class="note">// 输入</p>
                <code><span class="yellow">this.proxy.removeEmptyKeys</span>(<span><pre>{{param}}</pre></span>)；</code>
            </section>
            <section class="operate">
                <el-button type="primary" @click="change()">变量</el-button>
                <el-button type="success" @click="run()">执行</el-button>
                <el-button @click="reset()">重置</el-button>
            </section>
            <section class="output">
                <p class="note">// 输出</p>
                <code><span><pre>{{result}}</pre></span></code>
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
                param: `    {
        "username":"legolas",
        "realname":"",
        "age":null,
        "birthplace":"china",
        "mobile":"180****5500"
    }`,
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
                let param = JSON.parse(this.param)
                this.result = this.proxy.removeEmptyKeys(param) || 'null';
            },
            reset() {
                this.param = 'textLocalstorageKey';
                this.result = '';
            }
        }
    })
</script>