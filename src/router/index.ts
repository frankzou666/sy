
import { createRouter,createWebHistory} from "vue-router";


import Home from '@/pages/home/index.vue'
import Hospital from '@/pages/hospital/index.vue'
import Detail from '@/pages/hospital/detail/index.vue'


//定义路由
const routes = [
    {
        path:'/home',
        //路由懒加载模式
        component:()=>import('@/pages/home/index.vue')
    },
    {
        //正常加载
        path:'/hospital',
        component:Hospital,
        children:[
            {
                path:'detail',
                component:()=>import('@/pages/hospital/detail/index.vue')
            },
            {
                path:'notice',
                component:()=>import('@/pages/hospital/notice/index.vue')
            },
            {
                path:'register',
                component:()=>import('@/pages/hospital/register/index.vue')
            },
            {
                path:'search',
                component:()=>import('@/pages/hospital/search/index.vue')
            },

            {
                path:'stop',
                component:()=>import('@/pages/hospital/stop/index.vue')
            },
        ]
    },

    {
        //重定向
        path:'/',
        redirect:'/home'
    },
]


//创建路由数组
const  router = createRouter({
    history:createWebHistory(),
    routes:routes,
    //增加滚动行为，为什么要增加，有什么效果？
    scrollBehavior(){
        return{
            left:0,
            top:0
        }
    }

})

export default router