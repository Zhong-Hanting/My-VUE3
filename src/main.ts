import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
import router from './router'
import store from './store'

app.use(router)
app.use(store)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIconModules from '@element-plus/icons-vue'
import '../public/static/font/font_3508298_k7h9agjqi0r/iconfont.js'
// import 'font-awesome/css/font-awesome.css'
app.use(ElementPlus)
// 统一注册Icon图标
for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
        const item = ElIconModules[iconName]
        app.component(iconName, item)
    }
}
// 引入公共样式
import './assets/styles/common.less' 
// 挂载全局API
import * as api from '../service/utils/api.js';
app.config.globalProperties.api=api;

import {getDate}  from '../service/utils/customFn/getDate.js';
import {secondsFormat}  from '../service/utils/customFn/secondsFormat.js';
import {copyText}  from '../service/utils/customFn/copyText.js';
import {makeRandom}  from '../service/utils/customFn/makeRandom.js';
import {formatZero}  from '../service/utils/customFn/formatZero.js';
import {localStorageGet}  from '../service/utils/customFn/localStorageGet.js';
import {localStorageSet}  from '../service/utils/customFn/localStorageSet.js';
import {sessionStorageGet}  from '../service/utils/customFn/sessionStorageGet.js';
import {sessionStorageSet}  from '../service/utils/customFn/sessionStorageSet.js';
import {removeEmptyKeys}  from '../service/utils/customFn/removeEmptyKeys.js';
import {getMonthDays}  from '../service/utils/customFn/getMonthDays.js';


app.config.globalProperties.getDate=getDate;
app.config.globalProperties.secondsFormat=secondsFormat;
app.config.globalProperties.copyText=copyText;
app.config.globalProperties.makeRandom=makeRandom;
app.config.globalProperties.formatZero=formatZero;
app.config.globalProperties.localStorageGet=localStorageGet;
app.config.globalProperties.localStorageSet=localStorageSet;
app.config.globalProperties.sessionStorageGet=sessionStorageGet;
app.config.globalProperties.sessionStorageSet=sessionStorageSet;
app.config.globalProperties.removeEmptyKeys=removeEmptyKeys;
app.config.globalProperties.getMonthDays=getMonthDays;

app.mount('#app')