<template>
    <div>
      <el-carousel height="350px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img class="carouselImg" src='@/assets/images/web-banner-1.png'>
        </el-carousel-item>
      </el-carousel>
    </div>
   </template>
   <script setup lang='ts'> 

   </script>
    <style scoped lang="scss">
     .carouselImg{
      width: 100%;
      height: 100%;
     }
     
   </style>