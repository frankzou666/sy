<!-- 停诊信息 -->
<template>
  <div class="P-stop">
    <h1 class="title">{{ hospitalStore.hospitalInfo?.hospital?.hosname }}停诊信息</h1>
    <el-empty description="暂无信息" />
    <div class="content">

    </div>

  </div>
</template>
<script setup lang='ts'>


import { onMounted, onBeforeMount, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useDetailStore from '@/store/modules/hospitalDetail.ts'
let hospitalStore = useDetailStore()


//获取当前路由信息
let $route = useRoute();

let hoscode: string = $route.query.hoscode as string

onBeforeMount(() => {
  hospitalStore.getHospital(hoscode)
})
</script>
<style scoped lang="scss">
.P-stop {
  .title {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
  }
}
</style>