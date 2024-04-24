<template>
   <div class="P-hospital">
      <!-- 左侧导般 -->
      <div class="menu">
         <div class="top">
            <el-icon> <HomeFilled /></el-icon>
            <span>/&nbsp;&nbsp;&nbsp;{{ menuItemZhName }}</span>

         </div>
         <el-menu :default-active="$route.path" class="menu-left">
            <!-- 到二级路由时也需要带查询参数，否则到其他二级路由时刷新显示undefined -->
            <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register','预约挂号')">
               <el-icon> <Check /></el-icon>
               <span>预约挂号</span>
            </el-menu-item>
            <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail','医院详情')">
               <el-icon> <document /></el-icon>
               <span>医院详情</span>
            </el-menu-item>
            <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice','预约通知')">
               <el-icon><ChatRound /></el-icon>
               <span>预约通知</span>
            </el-menu-item>
            <el-menu-item index="/hospital/stop" @click="changeActive('/hospital/stop','停诊信息')">
               <el-icon>
                  <setting />
               </el-icon>
               <span>停诊信息</span>
            </el-menu-item>
            <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search','查询&取消')">
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
  import { onMounted,ref } from 'vue';
  import { HomeFilled } from '@element-plus/icons-vue';
  
  import { useRouter,useRoute } from 'vue-router';
  
  //引入请求api
  //import {reqHospitalInfoByHosCode} from '@/api/hospital/index.ts'

  //引入一个小store
  import useDetailStore from '@/store/modules/hospitalDetail'

  //定义一个路由器
  let $router = useRouter();
  //获取当前路由信息
  let $route = useRoute();

  let detailStore = useDetailStore();

  let hoscode:string =$route.query.hoscode as string

   //
   let menuItemZhName:string=ref<string>('预约挂号')

   //组件挂载完毕时，需要发请求，获取医院数据
   onMounted(()=>{
      //获取医院详情
      detailStore.getHospital(hoscode)
      
      //获取医院科室
      detailStore.getHospitalDepartment(hoscode)
      
   })

   //点菜单
   const changeActive=(path:string,menuItemZhNameStr:string)=>{
      menuItemZhName= menuItemZhNameStr
      $router.push({path:path,query:{hoscode:hoscode}})
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
      border-right: 1px solid #ccc;
      .top{
         color: #7f7f7f;
      }
      
   }

   .content {
      flex: 0.8;
   }
}
</style>