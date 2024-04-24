import { createApp } from 'vue'

// 引入router

import router from '@/router/index'

//引入element-plus
import ElementPlus from 'element-plus'


import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//引入pinia store

import store from '@/store/index.ts'

//引入全局组件
import HospitalTop from '@/components/hospital-top/index.vue'
import HospitalBottom from '@/components/hospital-bottom/index.vue'
import Login from '@/components/login/index.vue'



//引入css,需要安装npm install scss
import 'element-plus/dist/index.css'
import '@/style/reset.scss'


import App from '@/App.vue'
const app = createApp(App)

//注册路由器
app.use(router)

//第三方组件
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  
//注册全局组件
app.component('HospitalTop',HospitalTop)
app.component('HospitalBottom',HospitalBottom)
app.component('Login',Login)

app.use(store)

app.mount('#app')
