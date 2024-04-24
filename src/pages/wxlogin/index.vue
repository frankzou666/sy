 <template>
   <div>
 
 
 
 
 
   </div>
 </template>
 <script setup lang='ts'>
    import {useRoute} from 'vue-router'
    import useUserStore from '@/store/modules/user.ts'

    let $route = useRoute()

    //let userStore = useUserStore()

    //拿到用户token
    localStorage.setItem("userInfo",JSON.stringify($route.query))

    //关闭登录对话框
    //userStore.showLoginDiag(false)

    //存到pinia
 
 
 
 
 </script>
 <style scoped>
 
 
 
 
 
 </style>