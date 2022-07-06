<template>
    <div class="detailMakeRandom pagefn">
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
            <code><span class="yellow">this.proxy.makeRandom(</span><span> start,end,length </span><span class="yellow">)；</span></code>
            <p class="note">// 参数说明：</p>
            <code><span>start</span><span class="red">:Number</span> 最小值</code>
            <code><span>end</span><span class="red">:Number</span> 最大值</code>
            <code><span>length</span><span class="red">:Number</span> 长度（可不传，如果传长度则返回一个随机数组）</code>
            <p class="note">//注，方法中end-start >= length-1用于判断起始数区间是否大于等于数组长度-1（因为包含start本身），如果不大于等于，即不满足创建不重复数组的条件，则有可能会返回一个包含重复数值的数组</p>
        </div>
        <h3>函数代码</h3>
        <div class="fn-content">
            <code><span class="blue">makeRandom</span>(<span>s, e, l</span>) {</code>
            <code class="tab1"><span class="blue">function</span> createRandom(ss, ee) {</code>
            <code class="tab2">    <span class="red">return</span> Math.round(Math.random() * (ee - ss) + ss)</code>
            <code class="tab1">}</code>
            <code class="tab1"><span class="blue">function</span> createArr(arr) {</code>
            <code class="tab2">    let arrs = arr || [];</code>
            <code class="tab2">    let random = createRandom(s, e)</code>
            <code class="tab2">    arrs.includes(random) && e - s >= l-1 ? createArr(arrs) : arrs.push(random)</code>

            <code class="tab2">    if (arrs.length &lt; l) {</code>
            <code class="tab3">        <span class="yellow">createArr(arrs)</span></code>
            <code class="tab2">    }</code>
            <code class="tab2">    <span class="red">return</span> arrs;</code>
            <code class="tab1">}</code>
            <code class="tab1"><span class="red">return</span> l ? <span class="yellow">createArr()</span> : <span class="yellow"></span>(<span>s, e</span>)</code>
            <code>}</code>
        </div>
        <h3>使用示例</h3>
        <div class="demo">
            <section class="input">
                <p class="note">// 输入</p>
                <code><span class="yellow">this.proxy.makeRandom</span>(<span>{{param}}</span>)；</code>
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
        name: 'detailMakeRandom',
        props: {
            name: { type: String, default: '--' },
            desc: { type: String, default: '--' },
        },
        data() {
            return {
                param: '0,9,10',
                result: ''
            }
        },
        setup() {
            const { proxy } = getCurrentInstance() as any;
            return { proxy }
        },
        methods: {
            change() {
                ElMessageBox.prompt('请填写新的变量(如:0,9,10)', '变量', {
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
                    s:arr[0],
                    e:arr[1],
                    l:arr[2]||null,
                }
                this.result = this.proxy.makeRandom(param.s,param.e,param.l);
            },
            reset() {
                this.param = '0,9,10';
                this.result = '';
            }
        }
    })
</script>