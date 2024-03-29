<template>
  <div class="container">
    <!-- 顶部组件 -->
    <HospitalTop />

    <!-- 帐由组件展示区域 -->
    <div class="main">
      <RouterView ></RouterView>
    </div>


    <!-- 底部组件 -->

    <HospitalBottom />

   
  </div>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue'
  import request from '@/api/axios.ts'


  

</script>

<style scoped>
.container{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  
  .main{
    flex: 1;
    padding-top: 70px;
    padding-bottom: 70px;
    width: 1200px;
    margin:  0  auto;
  }
  


}

</style>