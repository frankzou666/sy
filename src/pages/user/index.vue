 <template>
   <div class="P-user">
    <!-- 左侧菜单 -->
    <div class="menu">
        <div class="top">
            <el-icon> <HomeFilled /></el-icon>
            <span>/&nbsp;&nbsp;&nbsp;{{ menuItemZhName }}</span>

         </div>
         <el-menu :default-active="$route.path" class="menu-left">
            <!-- 到二级路由时也需要带查询参数，否则到其他二级路由时刷新显示undefined -->
            <el-menu-item index="/user/certification" @click="changeActive('/user/certification','实名认证')">
               <el-icon> <Check /></el-icon>
               <span>实名认证</span>
            </el-menu-item>
            <el-menu-item index="/user/order" @click="changeActive('/user/order','挂号订单')">
               <el-icon> <document /></el-icon>
               <span>挂号订单</span>
            </el-menu-item>
            <el-menu-item index="/user/patient" @click="changeActive('/user/patient','就诊人管理')">
               <el-icon><ChatRound /></el-icon>
               <span>就诊人管理</span>
            </el-menu-item>
            <el-menu-item index="/user/profile" @click="changeActive('/user/profile','帐号信息')">
               <el-icon>
                  <setting />
               </el-icon>
               <span>帐号信息</span>
            </el-menu-item>
            <el-menu-item index="/user/feedback" @click="changeActive('/user/feedback','意见反馈')">
               <el-icon>
                  <search />
               </el-icon>
               <span>意见反馈</span>
            </el-menu-item>
         </el-menu>
    </div>
    


    <!-- 右侧内容 -->
    <div class="content">
         <router-view></router-view>

    </div>
 
   </div>
 </template>
 <script lang='ts' setup>
   import { onMounted,ref } from 'vue';
   import { useRouter } from 'vue-router';
   import { HomeFilled } from '@element-plus/icons-vue';
   import {reqSubmitOrder} from '@/api/user/index.ts'

   let menuItemZhName = ref<string>('用户中心')

   const $router = useRouter()

   //菜单跳转
   let changeActive=(path:string,menuName:string)=>{
     
     $router.push(path)
   }
 
 
 
 
 
 </script>
 <style scoped lang="scss">
   .P-user{
    display: flex;
    .menu{
        flex: 0.2;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .content{
        flex: 0.8;
    }

   }
 
 
 
 
 
 </style>