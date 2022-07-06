<template>
    <div class="page-icons-svg">
        <ul>
            <li @click="copy(item.filename)" v-for="item of iconList" :key="item.filename">
                <img :src="'./svg/'+item.filename">
                <span>{{item.filename}}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { defineComponent, getCurrentInstance } from 'vue'

    export default defineComponent({
        name: 'iconsSvg',
        props: {},
        data() {
            return {
                iconList: [{
                    filename: 'audio.svg'
                }, {
                    filename: 'audio-line.svg'
                }, {
                    filename: 'ball-triangle.svg'
                }, {
                    filename: 'bars.svg'
                }, {
                    filename: 'circles.svg'
                }, {
                    filename: 'grid.svg'
                }, {
                    filename: 'hearts.svg'
                }, {
                    filename: 'oval.svg'
                }, {
                    filename: 'puff.svg'
                }, {
                    filename: 'rings.svg'
                }, {
                    filename: 'spinning-circles.svg'
                }, {
                    filename: 'spinning-circles-mini.svg'
                }, {
                    filename: 'spin.svg'
                }, {
                    filename: 'tail-spin.svg'
                }, {
                    filename: 'three-dots-1.svg'
                }, {
                    filename: 'three-dots-2.svg'
                }, {
                    filename: 'three-dots-3.svg'
                }, {
                    filename: 'clock-1.svg'
                }, {
                    filename: 'clock-2.svg'
                }, {
                    filename: 'clock-3.svg'
                }, {
                    filename: 'clock-4.svg'
                }, {
                    filename: 'revolution.svg'
                }, {
                    filename: 'alert-1.svg'
                }, {
                    filename: 'alert-2.svg'
                }, {
                    filename: 'alert-3.svg'
                }, {
                    filename: 'alert-4.svg'
                }, {
                    filename: 'alert-5.svg'
                }, {
                    filename: 'question-circle.svg'
                }, {
                    filename: 'safe-check.svg'
                }, {
                    filename: 'check-1.svg'
                }, {
                    filename: 'check-2.svg'
                }, {
                    filename: 'check-3.svg'
                }, {
                    filename: 'compass.svg'
                }, {
                    filename: 'delete.svg'
                }, {
                    filename: 'circle-dote.svg'
                }, {
                    filename: 'lock.svg'
                }, {
                    filename: 'no-baterry.svg'
                }, {
                    filename: 'offline-1.svg'
                }, {
                    filename: 'offline-2.svg'
                }],
            }
        },
        setup() {
            const { proxy } = getCurrentInstance() as any;
            return {
                proxy
            }
        },
        methods: {
            copy(text: String) {
                let str = `<img src="./svg/${text}"/>`
                if (this.proxy.copyText(str)) {
                    this.$message({
                        message: '复制成功:' + str,
                        type: 'success',
                    })
                }
            }
        }
    })
</script>
<style lang="less" scoped>
.page-icons-svg{ padding: 15px; height: 100%; .scrollbar();
    ul{display: grid; grid-template-columns: repeat(10,1fr); 
        li{min-height: 50px; padding: 15px 0; text-align: center; border: 1px solid rgba(255, 255, 255, 0.1);
            img{width: 40px; height: 40px;}
            span{display: block; color: white; padding-top: 10px;}
        }
    }
}
</style>