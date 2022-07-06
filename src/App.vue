<template>
    <div class="page-index">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <router-view />
        <a class="dev-btn" @click="updateShowDevToolDialog(true)">
            <el-icon :size="30"><platform /></el-icon>
            <span>开发者工具</span>
        </a>
        <devFrame v-if="showDevToolDialog"></devFrame>
    </div>
</template>
<script lang="ts">
    import { defineComponent, computed } from 'vue'
    import { useStore } from 'vuex';
    import devFrame from '@/components/develop/dev-frame.vue'
    

    export default defineComponent({
        name: 'HomePage',
        components: { devFrame },
        data(){
            return{
            }
        }, 
        setup(){
            //store
            const store = useStore();
            store.commit('updateShowDevToolDialog', true)
            return{
                showDevToolDialog:computed(()=>store.state.showDevToolDialog),
                updateShowDevToolDialog:(value: boolean) => store.commit('updateShowDevToolDialog', value)
            }
        }
    })
</script>
<style lang="less">
.page-index{  text-align: center;
    #nav { padding: 30px;
        a { font-weight: bold; color: #2c3e50;
            &.router-link-exact-active { color: #42b983; }
        }
    }
}
.dev-btn{ display: block; width: 70px; height: 70px; padding-top: 10px; background: rgba(0, 0, 0, 0.5); color: white; position: fixed; top: 20px; right: 20px; border-radius: 10px;
    svg{}
    span{display: block;}
    &:hover{background: rgba(0, 0, 0, 0.9);}
}
</style>