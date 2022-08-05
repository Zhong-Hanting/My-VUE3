// import Vue from "vue"
import axios from "axios";
//import Qs from 'qs'
//import store from '../vuex/store';
//import { config } from '../common/env';
axios.defaults.timeout = 100000;
axios.defaults.withCredentials = true; // 允许携带cookie

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL; 
// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = process.env.API_BASE_URL; 
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = config.serviceUrlProd;
// }
//请求拦截
let token  = 1234;
axios.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json'
        //排除站外链接
        // if(config.url.indexOf('http://')==-1){
        //     store.commit('saveAjaxQueen', {
        //         act: config.method,
        //         url: config.url,
        //         type: 'add',
        //     })
        // }
        // 每次发送请求之前判断vuex中是否存在token
        //let token = store.state.userInfo ? store.state.userInfo.token : null;
        if (token) {
            config.headers.Authorization = token
        }
        // else {
        //     Vue.prototype.$froceLogout()
        // }
        //console.log(`请求：${config.url}`, config)
        return config;
    },
    // error => {
    //     return Promise.error(error);
    // }
);
// // 响应拦截
// axios.interceptors.response.use(
//     config => {
//         //console.log(`响应:${config.config.url}`,config)
//         return config;
//     },
//     error => {
//         //console.log('响应-error', error.response)
//         return Promise.reject(error);
//     }
// );

//------------------------------------------------------------------------------------------------------------------------------------------

//get封装(customUrl是为获取服务器信息单独添加的参数，原因：服务器IP不确定)
export function Get(url, params, customUrl) {
    return new Promise((resolve, reject) => {
        url = customUrl ? customUrl+url : url;
        axios.get(url, { params: params }).then(res => {
            handleAjaxSuccess('get', url, res).then(() => {
                resolve(res.data)
            })
        }).catch(err => {
            handleAjaxFailed('get', url, err).then(() => {
                reject(err)
                // alert(JSON.stringify(err))
            });
        })
    })
  }
//post封装
export function Post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            handleAjaxSuccess('post', url, res).then(() => {
                resolve(res.data)
            })
        }).catch(err => {
            handleAjaxFailed('post', url, err).then(() => {
                reject(err)
            });
        })
    })
}

//delete封装
export function Delete(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, { params }).then(res => {
            handleAjaxSuccess('delete', url, res).then(() => {
                resolve(res.data)
            })
        }).catch(err => {
            handleAjaxFailed('delete', url, err).then(() => {
                reject(err)
            });
        })
    })
}

//------------------------------------------------------------------------------------------------------------------------------------------

//统一处理数据业务:通信成功
async function handleAjaxSuccess(act, url, res) {
    if (res.status == 200) {
        // store.commit('saveAjaxQueen', {
        //     act,
        //     url,
        //     type: 'done',
        // })
        //附加处理：通信成功但接口返回错误
        if(res.data.success===false){
            // 错误信息提示(根据接口返回数据的errorCode)
            let errorCode = res.data.errorCode;
            switch (errorCode) {
            case '1000004':
                Vue.prototype.$message({
                    message: `${res.data.errorMsg}`,
                    type: 'warning'
                });
            break;
            case '1000001':
                Vue.prototype.$froceLogout()
                break;
            default:
                Vue.prototype.$message({
                    message: `服务器：${res.data.errorMsg}`,
                    type: 'error'
                });
                break;
            }
        }
    }
    else {
        // store.commit('saveAjaxQueen', {
        //     act,
        //     url,
        //     type: 'error',
        // })
    }
    return true;
}
//统一处理数据业务:通信失败
async function handleAjaxFailed(act, url, err) {
    // store.commit('saveAjaxQueen', {
    //     act,
    //     url,
    //     type: 'error',
    // })
    return true;
}