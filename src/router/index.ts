import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main.vue'),
    redirect:'/Pageindex',
    children:[
      {
        title:'不能看',
        show:true,
        role:'nobody',
        path: '/no',
        name: 'no',
      },
      {
        name:'index',
        title:'首页',
        show:true,
        path:'/Pageindex',
        component: () => import('../views/index/index.vue'),
      },
      { 
        title:'echarts图表',
        role:'superManger',
        show:true,
        path: '/echarts',
        name: 'echarts',
        component: () => import('../views/echarts/index.vue'),
      },
      { 
        title:'地图定位',
        role:'superManger',
        show:true,
        path: '/map',
        name: 'map',
        component: () => import('../views/map/index.vue'),
      },
      { 
        title:'svg绘图',
        role:'superManger',
        show:true,
        path: '/svg',
        name: 'svg',
        component: () => import('../views/svg/index.vue'),
      },
      { 
        title:'表格列表',
        role:'superManger',
        show:true,
        path: '/table-frame',
        redirect:'/tablelist/index',
        name: 'tablelist',
        component: () => import('../views/table/frame.vue'),
        children:[
          {
            title:'第一页',
            role:'superManger',
            show:true,
            path: '/tablelist/index',
            name: 'first',
            component: () => import('../views/table/index.vue'),
          },
          {
            title:'第二页',
            role:'superManger',
            show:true,
            path: '/tablelist/second',
            name: 'second',
            component: () => import('../views/table/second.vue'),
          },
        ]
      },
      {
        title:'播放器',
        role:'superManger',
        show:true,
        path: '/playMusic',
        name: 'playMusic',
        component: () => import('../views/music/music.vue'),
      },
      {
        title:'无权限设置',
        show:true,
        path: '/all',
        name: 'all',
        redirect:'/all/info',
        component: () => import('../views/allMenu/frame.vue'),
        children:[
          {
            title:'个人简历',
            show:true,
            path: '/all/info',
            name: 'info',
            component: () => import('../views/allMenu/info/info.vue'),
          },
        ]
      },
    
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
