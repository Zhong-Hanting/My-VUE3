<template>
    <div class="dev-frame">
        <main>
           <div class="header">
                <h2>开发者工具<span>Develop Tools By LeGolas</span></h2>
                <a class="close" @click="updateShowDevToolDialog(false)"><el-icon :size="20" color="#fff"><close /></el-icon></a>
           </div>
           <div class="container">
               <aside class="aside">
                   <ul>
                       <li v-for="item of pageList" :key="item.component" @click="switchPage(item)" :class="{current:item.component == currentPage}"><span>{{item.name}}</span></li>
                   </ul>
               </aside>
               <section class="contain-right">
                   <customFn v-if="currentPage=='customFn'"></customFn>
                   <customComponent v-if="currentPage=='customComponent'"></customComponent>
                   <regularExpression v-if="currentPage=='regularExpression'"></regularExpression>
                   <iconsElement v-if="currentPage=='iconsElement'"></iconsElement>
                   <iconsSvg v-if="currentPage=='iconsSvg'"></iconsSvg>
               </section>
           </div>
        </main>
    </div>
</template>

<script lang="ts">
    import { defineComponent, } from 'vue'
    import { useStore } from 'vuex';

    import customFn from './custom-fn/custom-fn.vue'
    import customComponent from './custom-component/custom-component.vue'
    import regularExpression from './regular-expression/regular-expression.vue'
    import iconsElement from './icons-element/icons-element.vue'
    import iconsSvg from './icons-svg/icons-svg.vue'

    export default defineComponent({
        name: 'devFrame',
        components: {
            iconsElement,
            iconsSvg,
            customFn,
            customComponent,
            regularExpression
        },
        data(){
            return{
                currentPage:'customFn',
                pageList:[
                    {
                        name:'自定义函数库',
                        component:'customFn'
                    },
                    {
                        name:'自定义组件库',
                        component:'customComponent'
                    },
                    {
                        name:'正则表达式',
                        component:'regularExpression'
                    },
                    {
                        name:'原生SVG图标库',
                        component:'iconsElement'
                    },
                    {
                        name:'自定义SVG图标',
                        component:'iconsSvg'
                    }
                ]
            }
        },
        setup(){
            const store = useStore();
            return{
                updateShowDevToolDialog:(value: boolean) => store.commit('updateShowDevToolDialog', value)
            }

        },
        methods:{
            switchPage(item:any){
                this.currentPage = item.component
            }
        }
    })
</script>
<style lang="less">
.dev-frame{ width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: rgba(0, 0, 0, 0.8); padding: 20px;  text-align: left;
    main{ width: 100%; height: 100%; box-sizing: border-box; background: #213f5c; color: white; padding:10px 20px; border: 1px solid rgba(255,255,255,0.1); 
        .header{display: flex; width: 100%; height: 40px; line-height: 40px; justify-content: space-between; align-items: center;
            h2{padding-left: 120px;
                span{font-size: 14px;  text-transform: uppercase; color: #3c6e9e; padding-left: 15px; transform: translateY(-2px);}
            }
        }
        .container{ display: flex;  height: calc(100% - 40px);
            .aside{width: 120px; height: 100%;.scrollbar();
                ul{ text-align: right;
                    li{ padding-right: 20px; line-height: 30px;color: #8ebeeb;
                        span{border-bottom: 1px solid rgba(255,255,255,0.1); display: inline-block; padding: 5px 0; }
                        &:hover,&.current{color: white; 
                            span{border-bottom: 1px solid rgba(255,255,255,0.3);}
                        }
                    }
                }
            }
            .contain-right{ background: #0d2b47; flex:1;  border-radius: 10px; height: 100%; 
                .contain{.scrollbar();
                    p.note{color:#6a9bc9;}
                    code{ display: block; line-height: 24px; font-size: 14px; color: #b7d1e9;
                        span{color: yellowgreen;
                            &.red{color: #f76464;}
                            &.yellow{color: #E6A23C;}
                            &.blue{color: #81bef7;}
                            &.green{color: yellowgreen!important;}
                        }
                        &.tab1{text-indent: 20px;}
                        &.tab2{text-indent: 40px;}
                        &.tab3{text-indent: 60px;}
                        &.tab4{text-indent: 80px;}
                        &.tab5{text-indent: 100px;}
                    }
                    .pagefn{
                        h2{}
                        h3{color: #5D7AA4; padding-bottom: 10px;}
                        h4{padding: 10px  0; color: #8ebeeb;}
                        .fn-use,.fn-content{background: rgba(0, 0, 0, 0.1); padding: 10px; margin-bottom: 20px; border: 3px solid rgba(255, 255, 255, 0.1);user-select:text;
                        }
                        .demo{ display: flex; justify-content: space-between; align-items: flex-start;
                            .input,.output{background: rgba(0, 0, 0, 0.1); padding: 10px;  width: 46%; min-height:140px; border: 3px solid rgba(255, 255, 255, 0.1);user-select:text;}
                            .operate{
                                .el-button{ display: block; width: 70px; margin: 10px auto;}
                            }
                        }
                    }
                }
            }
            
        }
    }
}
</style>