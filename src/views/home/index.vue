<template>
    <div class="home">
        <img alt="Vue logo" src="./images/logo.png" />
        <HelloWorld msg="origin-vue@3-typescript@4-webpack@5" />
    </div>
</template>

<script lang="ts">
    import {apiLogin} from '../../../service/utils/api'
    import { defineComponent, getCurrentInstance, onMounted } from 'vue'
    import { useStore } from 'vuex';
    import HelloWorld from './components/hello-world.vue'
    

    export default defineComponent({
        name: 'HomePage',
        components: { HelloWorld },
        data(){
            return{
            }
        },
        setup(){
            //调用自定义函数示例
            const {proxy} = getCurrentInstance() as any;
            onMounted(()=>{
                // proxy.api.apiLogin({ username:'admin', password:'axgt2019'}).then(res=>{
                //     console.log(res)
                // })
                //console.log(proxy.getDate())
            })
        },
    })
</script>
<style lang="less">
.home{
    
}
</style>