<template>
    <div class="detailSecondsFormat pagefn">
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
            <code><span class="yellow">this.proxy.secondsFormat(</span><span> seconds </span><span class="yellow">)；</span></code>
            <p class="note">// 参数说明：</p>
            <code><span>seconds</span><span class="red">:Number</span> 需要转换的秒数</code>
        </div>
        <h3>函数代码</h3>
        <div class="fn-content">
            <code><span class="blue">secondsFormat</span>(<span>s</span>) {</code>
             <code class="tab1">if (!(/(^[1-9]\d*$)/.test(s))){</code>
             <code class="tab2"><span class="red">return</span> '参数格式错误'</code>
             <code class="tab1">}</code>
            <code class="tab1"> else{</code>
            <code class="tab2"> var day = <span class="red">Math</span>.floor(<span> s </span> / (24 * 3600)); </code>
            <code class="tab2"> var hour = <span class="red">Math</span>.floor((<span> s </span> - day * 24 * 3600) / 3600);</code>
            <code class="tab2"> var minute = <span class="red">Math</span>.floor((<span> s </span> - day * 24 * 3600 - hour * 3600) / 60);</code>
            <code class="tab2"> var second = <span>s</span> - day * 24 * 3600 - hour * 3600 - minute * 60;</code>
            <code class="tab2"> let <span>str</span> = '';</code>
            <code class="tab2"> if (<span> day </span>) str += day + "天";</code>
            <code class="tab2"> if (<span> hour </span>) str += hour + "小时";</code>
            <code class="tab2"> <span>str</span> += (minute > 10 <span class="red">?</span> minute <span class="red">:</span> "0"+minute) + "分";</code>
            <code class="tab2"> <span>str</span> += (second > 10 <span class="red">?</span> second <span class="red">:</span> "0"+second) + "秒";</code>
            <code class="tab2"> <span class="red">return</span> <span>str</span>;</code>
            <code class="tab1">}</code>
            <code> }</code>
        </div>
        <h3>使用示例</h3>
        <div class="demo">
            <section class="input">
                <p class="note">// 输入</p>
                <code><span class="yellow">this.proxy.secondsFormat</span>(<span>{{param}}</span>)；</code>
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
        name: 'detailSecondsFormat',
        props: {
            name: { type: String, default: '--' },
            desc: { type: String, default: '--' },
        },
        data() {
            return {
                param: 30000,
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
                this.result = this.proxy.secondsFormat(this.param);
            },
            reset() {
                this.param = 30000;
                this.result = '';
            }
        }
    })
</script>