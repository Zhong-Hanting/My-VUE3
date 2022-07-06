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
            <code><span class="yellow">this.proxy.formatZero(</span><span> number,length </span><span class="yellow">)；</span></code>
            <p class="note">// 参数说明：</p>
            <code><span>number</span><span class="red">:Number</span> 需格式化的数字</code>
            <code><span>length</span><span class="red">:Number</span> 格式化后的字符串长度（可不传，默认补齐长度为2位)</code>
        </div>
        <h3>函数代码</h3>
        <div class="fn-content">
            <code><span class="blue">formatZero</span>(<span>num, len</span>) {</code>
            <code class="tab1">   let length = len <span class="red">||</span> 2; </code>
            <code class="tab1">   if (<span class="blue">String</span>(<span>num</span>).length > length) <span class="red">return</span> num;</code>
            <code class="tab1">   <span class="red">return</span> (<span class="blue">Array</span>(length).join(0) + <span>num</span>).slice(-length);</code>
            <code>}</code>
        </div>
        <h3>使用示例</h3>
        <div class="demo">
            <section class="input">
                <p class="note">// 输入</p>
                <code><span class="yellow">this.proxy.formatZero</span>(<span>{{param}}</span>)；</code>
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
                param: '88,3',
                result: ''
            }
        },
        setup() {
            const { proxy } = getCurrentInstance() as any;
            return { proxy }
        },
        methods: {
            change() {
                ElMessageBox.prompt('请填写新的变量(如:88,3)', '变量', {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                    })
                    .then(({ value }) => {
                        if(value.indexOf('，')>-1){
                            this.$message({
                                message: '请注意逗号使用半角符号（在英文输入法下输入）',
                                type: 'error',
                            })
                            setTimeout(()=>{
                                this.change();
                            },1000)
                            return;
                        }
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
                    num:parseInt(arr[0]),
                    len:parseInt(arr[1]),
                }
                this.result = this.proxy.formatZero(param.num,param.len);
            },
            reset() {
                this.param = '88,3';
                this.result = '';
            }
        }
    })
</script>