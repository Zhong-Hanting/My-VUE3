<template>
    <div class="page-custom-fn">
        <ul class="menu">
            <li v-for="item of fnList" :key="item.name" :class="{current:item.name==currentFn.name}" @click="switchCurrentFn(item)">
                <span class="name">{{item.name}}</span>
                <span class="desc">{{item.desc}}</span>
            </li>
        </ul>
        <section class="contain">
            <detailGetDate v-if="currentFn.name=='getDate()'" :name="currentFn.name" :desc="currentFn.desc"></detailGetDate>
            <detailGetMonthDays v-if="currentFn.name=='getMonthDays()'" :name="currentFn.name" :desc="currentFn.desc"></detailGetMonthDays>
            <detailSecondsFormat v-if="currentFn.name=='secondsFormat()'" :name="currentFn.name" :desc="currentFn.desc"></detailSecondsFormat>
            <detailCopyText v-if="currentFn.name=='copyText()'" :name="currentFn.name" :desc="currentFn.desc"></detailCopyText>
            <detailMakeRandom v-if="currentFn.name=='makeRandom()'" :name="currentFn.name" :desc="currentFn.desc"></detailMakeRandom>
            <detailFormatZero v-if="currentFn.name=='formatZero()'" :name="currentFn.name" :desc="currentFn.desc"></detailFormatZero>
            <detailLocalStorageGet v-if="currentFn.name=='localStorageGet()'" :name="currentFn.name" :desc="currentFn.desc"></detailLocalStorageGet>
            <detailLocalStorageSet v-if="currentFn.name=='localStorageSet()'" :name="currentFn.name" :desc="currentFn.desc"></detailLocalStorageSet>
            <detailSessionStorageGet v-if="currentFn.name=='sessionStorageGet()'" :name="currentFn.name" :desc="currentFn.desc"></detailSessionStorageGet>
            <detailSessionStorageSet v-if="currentFn.name=='sessionStorageSet()'" :name="currentFn.name" :desc="currentFn.desc"></detailSessionStorageSet>
            <detailRemoveEmptyKeys v-if="currentFn.name=='removeEmptyKeys()'" :name="currentFn.name" :desc="currentFn.desc"></detailRemoveEmptyKeys>
        </section>
    </div>
</template>

<script lang="ts">
    import { defineComponent, getCurrentInstance } from 'vue'
    import detailGetDate from './detail/detailGetDate.vue'
    import detailGetMonthDays from './detail/detailGetMonthDays.vue'
    import detailSecondsFormat from './detail/detailSecondsFormat.vue'
    import detailCopyText from './detail/detailCopyText.vue'
    import detailMakeRandom from './detail/detailMakeRandom.vue'
    import detailFormatZero from './detail/detailFormatZero.vue'
    import detailLocalStorageGet from './detail/detailLocalStorageGet.vue'
    import detailLocalStorageSet from './detail/detailLocalStorageSet.vue'
    import detailSessionStorageGet from './detail/detailSessionStorageGet.vue'
    import detailSessionStorageSet from './detail/detailSessionStorageSet.vue'
    import detailRemoveEmptyKeys from './detail/detailRemoveEmptyKeys.vue'
    
    export default defineComponent({
        name: 'customFn',
        components: {
            detailGetDate,
            detailGetMonthDays,
            detailSecondsFormat,
            detailCopyText,
            detailMakeRandom,
            detailFormatZero,
            detailLocalStorageGet,
            detailLocalStorageSet,
            detailSessionStorageGet,
            detailSessionStorageSet,
            detailRemoveEmptyKeys,
        },
        props: {},
        data() {
            return {
                fnList: [{
                    name:'getDate()',
                    desc:'获取当前日期(YYYY-MM-DD)'
                },{
                    name:'getMonthDays()',
                    desc:'生成本月天数数组',
                },{
                    name:'secondsFormat()',
                    desc:'将秒转换为日时分秒',
                },{
                    name:'copyText()',
                    desc:'拷备内容到剪切板',
                },{
                    name:'makeRandom()',
                    desc:'创建随机数',
                },{
                    name:'formatZero()',
                    desc:'不足指定位数的数字前面填充0',
                },{
                    name:'localStorageGet()',
                    desc:'获取localStorage对象',
                },{
                    name:'localStorageSet()',
                    desc:'存储localStorage对象',
                },{
                    name:'sessionStorageGet()',
                    desc:'获取sessionStorage对象',
                },{
                    name:'sessionStorageSet()',
                    desc:'存储sessionStorage对象',
                },{
                    name:'removeEmptyKeys()',
                    desc:'删除对象中的空键值对(不支持多级嵌套对象)',
                },],
                currentFn:{},
            }
        },
        setup() {
            const { proxy } = getCurrentInstance() as any;
            return {
                proxy
            }
        },
        created(){
            this.currentFn = this.fnList[0]
        },
        methods: {
            switchCurrentFn(item:Object){
                this.currentFn = item;
            }
        }
    })
</script>
<style lang="less" scoped>
.page-custom-fn{ padding: 15px; height: 100%; display: flex; justify-content: space-between;
    h4{color: #5D7AA4;}
    .menu{ width: 200px; height: 100%; background: rgba(0, 0, 0, 0.1);
        li{ padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); cursor: pointer;
            .name{color: #8ebeeb;font-size: 14px; font-weight: 600;}
            .desc{display: block; color: #5D7AA4; padding-top: 5px;}
            &:hover,&.current{ border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                .name{color: white;}
                .desc{color: #8ebeeb;}
            }
        }
    }
    .contain{ flex: 1; height: 100%; padding: 0 10px;
        
    }
}
</style>