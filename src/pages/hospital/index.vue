<template>
   <div class="P-hospital">
      <!-- 左侧导般 -->
      <div class="menu">
         <div class="top">
            <el-icon> <HomeFilled /></el-icon>
            <span>/ 医院详情</span>

         </div>
         <el-menu :default-active="$route.path" class="menu-left">
            <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
               <el-icon> <Check /></el-icon>
               <span>预约挂号</span>
            </el-menu-item>
            <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
               <el-icon> <document /></el-icon>
               <span>医院详情</span>
            </el-menu-item>
            <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
               <el-icon><ChatRound /></el-icon>
               <span>预约通知</span>
            </el-menu-item>
            <el-menu-item index="/hospital/stop" @click="changeActive('/hospital/stop')">
               <el-icon>
                  <setting />
               </el-icon>
               <span>停诊信息</span>
            </el-menu-item>
            <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
               <el-icon>
                  <search />
               </el-icon>
               <span>查询 / 取消</span>
            </el-menu-item>
         </el-menu>
      </div>

      <!-- 右侧展示 -->
      <div class="content">
         <router-view></router-view>

      </div>

   </div>
</template>
<script setup lang='ts'>
  import { onMounted } from 'vue';
  import { HomeFilled } from '@element-plus/icons-vue';
  
  import { useRouter,useRoute } from 'vue-router';
  
  //引入请求api
  import {reqHospitalInfoByHosCode} from '@/api/hospital/index.ts'

  //引入一个小store
  import useDetailStore from '@/store/modules/hospitalDetail'

  //定义一个路由器
  let $router = useRouter();
  //获取当前路由信息
  let $route = useRoute();

  let detailStore = useDetailStore();

   //组件挂载完毕时，需要发请求，获取医院数据
   onMounted(()=>{
      //onsole.log($route.query.hoscode)
      detailStore.getHospital($route.query.hoscode)
      
   })

   //点菜单
   const changeActive=(path:string)=>{
      
      $router.push({path:path})

   }
</script>


<style scoped>
.P-hospital {
   display: flex;

   .menu {
      margin-top: 10px;
      flex: 0.2;
      display: flex;
      flex-direction: column;
      .top{
         color: #7f7f7f;
      }
      
   }

   .content {
      flex: 0.8;
   }
}
</style>