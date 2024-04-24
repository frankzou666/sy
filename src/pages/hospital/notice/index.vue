<!-- 预约通知 -->
<template>
  <div class="P-notice">
    <h1 class="title">{{ hospitalStore.hospitalInfo?.hospital?.hosname }}挂号须知</h1>
    <div class="content">
      <div class="top">为了方便你早日康复:</div>
      <div class="selectionOne">一,预约实名制</div>
      <p class="selectionOneText">&nbsp;&nbsp;&nbsp;&nbsp;预约实名制预约实名制预约实名制预约实名制预约实名制预约实名制预约实名制预约实名制</p>

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
.P-notice {
  .title {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
  }

  .content {
    margin-left: 16px;

    .top {
      margin-bottom: 10px;

    }

    .selectionOneText {
      line-height: 30px;
      color: #7f7f7f;
      font-size: 14px;
    }
  }

}
</style>