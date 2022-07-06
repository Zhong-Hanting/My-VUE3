<template>
    <div class="page-icons-element">
        <ul>
            <li @click="copy(item.componentName)" v-for="item of iconList" :key="item.componentName">
                <el-icon :size="40">
                    <component :is="item.componentName"></component>
                </el-icon>
                <span>{{item.componentName}}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { defineComponent,getCurrentInstance } from 'vue'

    export default defineComponent({
        name: 'iconsElement',
        props: {},
        data() {
            return {
                iconList: [],
            }
        },
        setup(){
            const {proxy} = getCurrentInstance() as any;
            return{
                proxy
            }
        },
        created() {
            let iconarr = ['add-location',
                'aim',
                'alarm-clock',
                'apple',
                'arrow-down-bold',
                'arrow-left',
                'arrow-right-bold',
                'arrow-right',
                'arrow-up-bold',
                'arrow-up',
                'baseball',
                'basketball',
                'bell-filled',
                'bell',
                'bicycle',
                'bottom',
                'bowl',
                'box',
                'briefcase',
                'brush-filled',
                'calendar',
                'camera-filled',
                'camera',
                'caret-bottom',
                'caret-left',
                'cellphone',
                'chat-dot-round',
                'chat-dot-square',
                'chat-line-round',
                'chat-line-square',
                'check',
                'checked',
                'cherry',
                'chicken',
                'circle-check-filled',
                'circle-close',
                'circle-plus-filled',
                'circle-plus',
                'clock',
                'close-bold',
                'coffee-cup',
                'coffee',
                'coin',
                'cold-drink',
                'collection-tag',
                'compass',
                'connection',
                'coordinate',
                'copy-document',
                'cpu',
                'd-arrow-left',
                'd-arrow-right',
                'd-caret',
                'data-analysis',
                'data-board',
                'delete-location',
                'delete',
                'dessert',
                'discount',
                'dish-dot',
                'document-checked',
                'document-copy',
                'document-delete',
                'document-remove',
                'document',
                'edit-pen',
                'edit',
                'eleme-filled',
                'eleme',
                'expand',
                'files',
                'film',
                'filter',
                'finished',
                'first-aid-kit',
                'folder-add',
                'folder-checked',
                'folder-delete',
                'folder-opened',
                'folder-remove',
                'football',
                'fork-spoon',
                'fries',
                'full-screen',
                'goblet-full',
                'goblet',
                'goods-filled',
                'goods',
                'grape',
                'grid',
                'help-filled',
                'help',
                'histogram',
                'home-filled',
                'hot-water',
                'ice-cream-square',
                'ice-cream',
                'ice-drink',
                'ice-tea',
                'info-filled',
                'knife-fork',
                'lightning',
                'link',
                'list',
                'loading',
                'location',
                'lock',
                'lollipop',
                'magic-stick',
                'magnet',
                'map-location',
                'medal',
                'menu',
                'message-box',
                'message',
                'milk-tea',
                'minus',
                'money',
                'monitor',
                'moon-night',
                'more',
                'mostly-cloudy',
                'mouse',
                'mug',
                'mute-notification',
                'notebook',
                'notification',
                'odometer',
                'office-building',
                'open',
                'orange',
                'paperclip',
                'partly-cloudy',
                'pear',
                'phone-filled',
                'picture-rounded',
                'picture',
                'pie-chart',
                'place',
                'platform',
                'position',
                'postcard',
                'pouring',
                'present',
                'price-tag',
                'question-filled',
                'rank',
                'reading-lamp',
                'reading',
                'refresh-left',
                'refrigerator',
                'remove-filled',
                'remove',
                'right',
                'scale-to-original',
                'search',
                'select',
                'sell',
                'semi-select',
                'service',
                'share',
                'ship',
                'shop',
                'shopping-bag',
                'shopping-cart-full',
                'soccer',
                'sold-out',
                'sort-down',
                'sort-up',
                'sort',
                'star',
                'stopwatch',
                'success-filled',
                'sugar',
                'suitcase',
                'sunset',
                'switch-button',
                'switch',
                'takeaway-box',
                'ticket',
                'toilet-paper',
                'tools',
                'top-left',
                'top-right',
                'top',
                'turn-off',
                'umbrella',
                'unlock',
                'upload-filled',
                'upload',
                'van',
                'video-camera-filled',
                'video-camera',
                'video-pause',
                'video-play',
                'wallet',
                'warning-filled',
                'warning',
                'watch',
                'watermelon',
                'zoom-out',
            ]
            this.iconList = iconarr.map(str=>{
                return{
                    componentName:str
                }
            })
        },
        methods:{
            copy(text:String){
                let str = `<el-icon><${text} /></el-icon>`
                if(this.proxy.copyText(str)){
                    this.$message({
                        message: '复制成功:'+str,
                        type: 'success',
                    })
                }
            }
        }
    })
</script>
<style lang="less" scoped>
.page-icons-element{ padding: 15px; height: 100%; .scrollbar();
    ul{display: grid; grid-template-columns: repeat(10,1fr); 
        li{min-height: 50px; padding: 15px 0; text-align: center; border: 1px solid rgba(255, 255, 255, 0.1);
            img{width: 40px; height: 40px;}
            span{display: block; color: white; padding-top: 10px;}
            &:hover{background: rgba(0, 0, 0, 0.1);}
        }
    }
}
</style>